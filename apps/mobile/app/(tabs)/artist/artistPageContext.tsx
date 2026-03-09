import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Artist, Music, Project } from '@/lib/types/types';
import { apiClient, ArtistService, ImageService, MusicService } from '@/lib/api';
import { ArtistAlbum } from '@/lib/api/types';
import { PlaylistCoverDefault } from '@/lib/constants/images';

type ArtistProjectCard = Project & {
    id?: number;
    color1?: string;
    color2?: string;
    year?: number | string;
    nbTitles?: number;
};

type ArtistPageContextValue = {
    artist: Artist;
    popularTracks: Music[];
    recentReleases: Music[];
    projects: ArtistProjectCard[];
    loading: boolean;
};

const placeholderImage = PlaylistCoverDefault;

const defaultArtist: Artist = {
    title: 'Artiste',
    cover: placeholderImage,
    popular_musics: [],
    last_releases: [],
};

const ArtistPageContext = createContext<ArtistPageContextValue>({
    artist: defaultArtist,
    popularTracks: [],
    recentReleases: [],
    projects: [],
    loading: true,
});

type ArtistPageProviderProps = {
    params: Record<string, any>;
    children: React.ReactNode;
};

export function ArtistPageProvider({ params, children }: ArtistPageProviderProps) {
    const [artist, setArtist] = useState<Artist>(defaultArtist);
    const [projects, setProjects] = useState<ArtistProjectCard[]>([]);
    const [loading, setLoading] = useState(true);

    const parseJsonSafely = (value: unknown) => {
        if (typeof value !== 'string') return value;
        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    };

    const normalizeList = useCallback((value: unknown): any[] => {
        const parsed = parseJsonSafely(value);
        if (!Array.isArray(parsed)) return [];

        return parsed.flatMap((item) => {
            if (Array.isArray(item)) return item;
            return item ? [item] : [];
        });
    }, []);

    const resolveCover = (coverValue: unknown) => {
        if (!coverValue) return placeholderImage;
        if (typeof coverValue === 'string') {
            return { uri: apiClient.getImageUrl(coverValue) };
        }
        return coverValue;
    };

    const mapMusicsWithCover = async (musics: any[], fallbackArtistName: string): Promise<Music[]> => {
        return await Promise.all(
            musics.map(async (music) => {
                let musicCover: any = placeholderImage;

                try {
                    if (music?.id) {
                        const coverData = await MusicService.getMusicCoverPath(Number(music.id));
                        const coverPath = coverData?.cover_path;

                        if (coverPath) {
                            try {
                                await ImageService.GetImage(coverPath);
                            } catch {
                            }
                            musicCover = { uri: apiClient.getImageUrl(coverPath) };
                        }
                    }
                } catch {
                }

                return {
                    id: Number(music?.id ?? 0),
                    title: String(music?.title ?? 'Titre inconnu'),
                    artist: music?.nameArtist || fallbackArtistName || 'Artiste inconnu',
                    cover: musicCover,
                    color1: '#04131D',
                    color2: '#082840',
                    duration: typeof music?.duration === 'number' ? music.duration : undefined,
                    nbStreams: typeof music?.nbStreams === 'number' ? music.nbStreams : undefined,
                    audioFile: music?.filePath || music?.fichierAudio || music?.audioFile || undefined,
                };
            })
        );
    };

    const normalizeProjects = useCallback((artistSource: any, fallbackArtistName: string): ArtistProjectCard[] => {
        const rawProjects =
            artistSource?.projects ??
            artistSource?.allProjects ??
            artistSource?.latestProjects ??
            artistSource?.albums ??
            parseJsonSafely(params.projects) ??
            [];

        return normalizeList(rawProjects).map((project: any) => {
            const releaseYear =
                project?.year ||
                (typeof project?.release === 'string' ? project.release.slice(0, 4) : undefined);

            return {
                id: project?.id,
                cover: resolveCover(project?.coverPath || project?.imagePath || project?.cover),
                type: (project?.projectType || project?.type || 'album').toString().toLowerCase(),
                title: project?.title || 'Projet',
                description: project?.description || '',
                artist: project?.artistName || project?.nameArtist || fallbackArtistName || 'Artiste inconnu',
                musics: project?.musics || [],
                color1: project?.color1 || '#1B2A4A',
                color2: project?.color2 || '#0C1320',
                year: releaseYear,
                nbTitles: project?.nbTitles || project?.nbMusics || project?.musics?.length || 0,
            };
        });
    }, [normalizeList, params.projects]);

    const mapAlbumsToProjects = useCallback((albums: ArtistAlbum[], fallbackArtistName: string): ArtistProjectCard[] => {
        const sortedAlbums = [...albums].sort((a, b) => {
            const getTimestamp = (album: ArtistAlbum) => {
                const dateValue = (album as any).dateRelease || album.release;
                if (!dateValue) return 0;

                const timestamp = new Date(dateValue).getTime();
                return Number.isNaN(timestamp) ? 0 : timestamp;
            };

            return getTimestamp(b) - getTimestamp(a);
        });

        return sortedAlbums.map((album) => {
            const releaseYear = typeof album.release === 'string' ? album.release.slice(0, 4) : undefined;

            return {
                id: album.id,
                cover: resolveCover(album.coverPath),
                type: (album.projectType || 'album').toLowerCase(),
                title: album.title || 'Projet',
                description: '',
                artist: album.artistName || fallbackArtistName || 'Artiste inconnu',
                musics: Array.isArray(album.musics) ? (album.musics as any[]) : [],
                color1: album.color1 || '#1B2A4A',
                color2: album.color2 || '#0C1320',
                year: releaseYear,
                nbTitles: Array.isArray(album.musics) ? album.musics.length : 0,
            };
        });
    }, []);

    useEffect(() => {
        let isMounted = true;

        const fetchArtistData = async () => {
            try {
                setLoading(true);
                const rawData = parseJsonSafely(params.data);
                const rawArtist = (rawData as any)?.artist ?? rawData ?? {};

                const fallbackArtistName =
                    (rawArtist as any)?.title ||
                    (rawArtist as any)?.name ||
                    (params.title as string) ||
                    'Artiste';

                const fallbackCover = resolveCover(
                    (rawArtist as any)?.cover ||
                    (rawArtist as any)?.imagePath ||
                    params.cover
                );

                const fallbackPopularRaw =
                    (rawArtist as any)?.popular_musics ??
                    (rawArtist as any)?.popularMusics ??
                    params.popular_musics ??
                    params.popularMusics ??
                    [];

                const fallbackReleasesRaw =
                    (rawArtist as any)?.last_releases ??
                    (rawArtist as any)?.lastReleases ??
                    params.last_releases ??
                    params.lastReleases ??
                    [];

                const [fallbackPopular, fallbackReleases] = await Promise.all([
                    mapMusicsWithCover(normalizeList(fallbackPopularRaw), fallbackArtistName),
                    mapMusicsWithCover(normalizeList(fallbackReleasesRaw), fallbackArtistName),
                ]);

                const fallbackArtist: Artist = {
                    id: Number((rawArtist as any)?.id ?? 0) || undefined,
                    title: fallbackArtistName,
                    cover: fallbackCover,
                    popular_musics: fallbackPopular,
                    last_releases: fallbackReleases,
                };

                const fallbackProjects = normalizeProjects(rawArtist, fallbackArtistName);

                const paramArtistId = Number((params.artistId as string) || (params.id as string) || 0);
                const dataArtistId = Number((rawArtist as any)?.id || 0);
                const artistId = paramArtistId || dataArtistId;

                if (!artistId) {
                    if (isMounted) {
                        setArtist(fallbackArtist);
                        setProjects(fallbackProjects);
                    }
                    return;
                }

                const pageResponse: any = await ArtistService.getArtistPage(artistId);
                const apiArtist = pageResponse?.artist;

                if (!apiArtist) {
                    if (isMounted) {
                        setArtist(fallbackArtist);
                        setProjects(fallbackProjects);
                    }
                    return;
                }

                const [popularMapped, releasesMapped] = await Promise.all([
                    mapMusicsWithCover(normalizeList(apiArtist.popularMusics), apiArtist.name || fallbackArtistName),
                    mapMusicsWithCover(normalizeList(apiArtist.lastReleases), apiArtist.name || fallbackArtistName),
                ]);

                const normalizedArtist: Artist = {
                    id: apiArtist.id,
                    title: apiArtist.name || fallbackArtistName,
                    cover: resolveCover(apiArtist.imagePath || fallbackCover),
                    isVerified: apiArtist.isVerified,
                    description: apiArtist.description,
                    popular_musics: popularMapped,
                    last_releases: releasesMapped,
                };

                const normalizedProjects = normalizeProjects(apiArtist, normalizedArtist.title);

                let albumsProjects: ArtistProjectCard[] = [];
                try {
                    const albumsResponse = await ArtistService.getArtistAlbums(artistId);
                    albumsProjects = mapAlbumsToProjects(albumsResponse?.albums || [], normalizedArtist.title);
                } catch {
                }

                if (isMounted) {
                    setArtist(normalizedArtist);
                    setProjects(albumsProjects.length ? albumsProjects : (normalizedProjects.length ? normalizedProjects : fallbackProjects));
                }
            } catch {
                const rawData = parseJsonSafely(params.data);
                const rawArtist = (rawData as any)?.artist ?? rawData ?? {};
                if (isMounted) {
                    setArtist({
                        id: Number((rawArtist as any)?.id ?? 0) || undefined,
                        title: (rawArtist as any)?.name || (rawArtist as any)?.title || (params.title as string) || 'Artiste',
                        cover: resolveCover((rawArtist as any)?.cover || (rawArtist as any)?.imagePath || params.cover),
                        popular_musics: [],
                        last_releases: [],
                    });
                    setProjects([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchArtistData();

        return () => {
            isMounted = false;
        };
    }, [params, mapAlbumsToProjects, normalizeList, normalizeProjects]);

    const value = useMemo<ArtistPageContextValue>(() => ({
        artist,
        popularTracks: (artist.popular_musics || []).slice(0, 5),
        recentReleases: (artist.last_releases || []).slice(0, 4),
        projects,
        loading,
    }), [artist, projects, loading]);

    return (
        <ArtistPageContext.Provider value={value}>
            {children}
        </ArtistPageContext.Provider>
    );
}

export function useArtistPage() {
    return useContext(ArtistPageContext);
}
