<?php 

namespace Api\Utils;

class RequestUtils {
    public static string $getAllMusics = "
    SELECT 
    m.id, m.title, m.duration, m.release, m.nb_streams, m.file_path,
    g.id, g.name,
    r.id, r.rate, r.comment

    FROM music m

    -- Jointure avec les genres
    LEFT JOIN music_genre mg
        ON m.id = mg.id_music
    LEFT JOIN genre g
        ON mg.id_genre = g.id

    -- Jointure avec les notes
    LEFT JOIN rating r
        ON m.id = r.id_music

    ORDER BY m.id;";
}