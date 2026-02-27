-- Creation script
create table genre (
    id serial primary key,
    name varchar(50) not null
);

create table music (
    id serial primary key,
    title varchar(100) not null,
    duration integer not null,
    release timestamp not null,
    nb_streams numeric(11, 0) not null,
    file_path varchar(255) not null 
);

create table artist (
    id serial primary key,
    name varchar(100) not null,
    isVerified boolean not null,
    description text,
    image_path varchar(255)
);

create table network (
    id smallint primary key,
    name varchar(50) not null
);

create table project_type (
    id smallint primary key,
    name varchar(50) not null
);

create table project (
    id serial primary key,
    title varchar(100) not null,
    release timestamp not null,
    color1 varchar(7) not null,
    color2 varchar(7) not null,
    cover_path varchar(255),
    id_type smallint references project_type(id) on delete cascade not null
);

create table library (
    id text primary key
);

create table playlist (
    id serial primary key,
    title varchar(50) not null,
    isPublic boolean not null,
    description text,
    cover_path varchar(255)
);

create table role (
    id smallint primary key,
    name varchar(50) not null
);

create table "user" (
    id text primary key,
    username varchar(50) not null,
    email varchar(100) not null unique,
    image_path varchar(255),
    id_library text references library(id) on delete cascade not null,
    id_role smallint references role(id) on delete cascade not null,
    id_artist integer references artist(id) on delete cascade
);

create table conversation (
    id serial primary key,
    created_at timestamp not null,
    name varchar(50),
    image_path varchar(255),
    id_creator text references "user"(id) on delete cascade not null
);

create table message (
    id serial primary key,
    send_at timestamp not null,
    content text,
    id_conversation integer references conversation(id) on delete cascade not null,
    id_user text references "user"(id) on delete cascade not null,
    id_music integer references music(id) on delete cascade
);

create table music_rating (
    id serial primary key,
    rating smallint not null,
    created_at timestamp not null,
    comment text,
    id_user text references "user"(id) on delete cascade not null,
    id_music integer references music(id) on delete cascade not null
);

create table project_rating (
    id serial primary key,
    rating smallint not null,
    created_at timestamp not null,
    comment text,
    id_user text references "user"(id) on delete cascade not null,
    id_project integer references project(id) on delete cascade not null
);

create table friendship (
    user1 text references "user"(id) on delete cascade not null,
    user2 text references "user"(id) on delete cascade not null,
    primary key (user1, user2)
);

create table featuring (
    id_artist integer references artist(id) on delete cascade not null,
    id_music integer references music(id) on delete cascade not null,
    primary key (id_artist, id_music)
);

create table artist_network (
    id_artist integer references artist(id) on delete cascade not null,
    id_network smallint references network(id) on delete cascade not null,
    link varchar(255) not null,
    primary key (id_artist, id_network)
);

create table project_music (
    id_project integer references project(id) on delete cascade not null,
    id_music integer references music(id) on delete cascade not null,
    primary key (id_project, id_music)
);

create table artist_project (
    id_artist integer references artist(id) on delete cascade not null,
    id_project integer references project(id) on delete cascade not null,
    primary key(id_artist, id_project)
);

create table library_artist (
    id_library text references library(id) on delete cascade not null,
    id_artist integer references artist(id) on delete cascade not null,
    primary key(id_library, id_artist)
);

create table library_project (
    id_library text references library(id) on delete cascade not null,
    id_project integer references project(id) on delete cascade not null,
    primary key(id_library, id_project)
);

create table library_playlist (
    id_library text references library(id) on delete cascade not null,
    id_playlist integer references playlist(id) on delete cascade not null,
    primary key(id_library, id_playlist)
);

create table playlist_music (
    id_playlist integer references playlist(id) on delete cascade not null,
    id_music integer references music(id) on delete cascade not null,
    primary key(id_playlist, id_music)
);

create table user_conversation (
    id_user text references "user"(id) on delete cascade not null,
    id_conversation integer references conversation(id) on delete cascade not null,
    primary key(id_user, id_conversation)
);

create table log_user_music (
    id_user text references "user"(id) on delete cascade not null,
    id_music integer references music(id) on delete cascade not null,
    listened_at timestamp not null
);

create table music_genre (
    id_music integer references music(id) on delete cascade not null,
    id_genre integer references genre(id) on delete cascade not null,
    primary key (id_music, id_genre)
);

insert into role (id, name) values
(1, 'User'),
(2, 'Artist'),
(3, 'Moderator'),
(4, 'Admin');

-- Test data
insert into genre (id, name) values
(1, 'Pop'),
(2, 'Rock'),
(3, 'Jazz'),
(4, 'Hip-Hop'),
(5, 'Classical'),
(6, 'Electronic'),
(7, 'Country'),
(8, 'R&B'),
(9, 'Reggae'),
(10, 'Metal');

insert into music (id, title, duration, release, nb_streams, file_path) values
(1, 'LUNCH', 179, '2024-05-17 12:00:00', 456123, 'LUNCH.mp3'),
(2, 'CHIHIRO', 312, '2024-05-17 12:00:00', 789456, 'CHIHIRO.mp3'),
(3, 'Houdini', 189, '2024-05-03 12:00:00', 654321, 'Houdini.mp3'),
(4, 'Training Season', 212, '2024-05-03 12:00:00', 543210, 'TrainingSeason.mp3'),
(5, 'bellyache', 180, '2017-08-11 12:00:00', 321456, 'bellyache.mp3'),
(6, 'idontwannabeyouanymore', 204, '2017-08-11 12:00:00', 234567, 'idontwannabeyouanymore.mp3'),
(7, 'Levitating', 203, '2020-03-27 12:00:00', 987654, 'Levitating.mp3'),
(8, 'Don''t Start Now', 183, '2020-03-27 12:00:00', 876543, 'DontStartNow.mp3'),
(9, 'BIRDS OF A FEATHER', 210, '2024-05-17 12:00:00', 567890, 'BOAF.mp3'),
(10, 'Falling Forever', 280, '2024-05-03 12:00:00', 345678, 'FallingForever.mp3'),
(11, 'drivers license', 242, '2021-05-21 12:00:00', 765432, 'driverslicense.mp3'),
(12, 'good 4 u', 178, '2021-05-21 12:00:00', 654321, 'good4u.mp3'),
(13, 'vampire', 219, '2023-09-08 12:00:00', 543210, 'vampire.mp3'),
(14, 'get him back!', 191, '2023-09-08 12:00:00', 432109, 'gethimback.mp3'),
(15, 'Feather', 175, '2022-07-15 12:00:00', 321098, 'Feather.mp3'),
(16, 'Espresso', 175, '2024-08-23 12:00:00', 890123, 'Espresso.mp3'),
(17, 'Please Please Please', 186, '2024-08-23 12:00:00', 780123, 'PleasePleasePlease.mp3'),
(18, 'Kiss Me More', 208, '2021-06-25 12:00:00', 670123, 'KissMeMore.mp3'),
(19, 'Woman', 172, '2021-06-25 12:00:00', 560123, 'Woman.mp3'),
(20, 'Cards', 223, '2025-06-20 12:00:00', 450123, 'Cards.mp3'),
(21, 'Jealous Type', 163, '2025-06-20 12:00:00', 340123, 'JealousType.mp3'),
(22, 'Stupid Love', 193, '2020-05-29 12:00:00', 230123, 'StupidLove.mp3'),
(23, 'Rain On Me', 182, '2020-05-29 12:00:00', 120123, 'RainOnMe.mp3'),
(24, 'Selfish', 199, '2021-02-26 12:00:00', 890234, 'Selfish.mp3'),
(25, 'Baby', 176, '2021-02-26 12:00:00', 780234, 'Baby.mp3'),
(26, '360', 133, '2024-06-07 12:00:00', 670234, '360.mp3'),
(27, 'Apple', 151, '2024-06-07 12:00:00', 560234, 'Apple.mp3'),
(28, 'Midnight Stun', 189, '2025-03-07 12:00:00', 450234, 'MidnightSun.mp3'),
(29, 'Crush', 177, '2025-09-26 12:00:00', 340234, 'Crush.mp3'),
(30, 'Spicy', 186, '2023-05-08 12:00:00', 230234, 'Spicy.mp3'),
(31, 'Better Things', 193, '2023-11-10 12:00:00', 120234, 'BetterThings.mp3'),
(32, 'Supernova', 214, '2024-05-27 12:00:00', 890345, 'Supernova.mp3'),
(33, 'my future', 210, '2021-07-30 12:00:00', 780345, 'myfuture.mp3'),
(34, 'Oxytocin', 199, '2021-07-30 12:00:00', 670345, 'Oxytocin.mp3'),
(35, 'bad guy', 194, '2019-03-29 12:00:00', 560345, 'badguy.mp3'),
(36, 'bury a friend', 193, '2019-03-29 12:00:00', 450345, 'buryafriend.mp3'),
(37, 'bittersweet', 202, '2026-01-16 12:00:00', 340345, 'bittersweet.mp3'),
(38, 'Showed Me', 189, '2023-09-15 12:00:00', 230345, 'ShowedMe.mp3'),
(39, 'TV', 281, '2022-07-21 12:00:00', 410345, 'TV.mp3'),
(40, 'The 30th', 217, '2022-07-21 12:00:00', 395120, 'The30th.mp3');

insert into artist (id, name, isVerified, description, image_path) values
(1, 'Billie Eilish', TRUE, 'American singer-songwriter', 'BillieEilish.jpg'),
(2, 'Dua Lipa', TRUE, 'English-Albanian singer', 'DuaLipa.jpg'),
(3, 'Olivia Rodrigo', TRUE, 'American singer-songwriter and actress', 'OliviaRodrigo.jpg'),
(4, 'Sabrina Carpenter', TRUE, 'American singer and actress', 'SabrinaCarpenter.jpg'),
(5, 'Doja Cat', TRUE, 'American rapper and singer', 'DojaCat.jpg'),
(6, 'Lady Gaga', TRUE, 'American singer, songwriter, and actress', 'LadyGaga.jpg'),
(7, 'Madison Beer', TRUE, 'American singer', 'MadisonBeer.jpg'),
(8, 'Charli XCX', TRUE, 'English singer and songwriter', 'CharliXCX.jpg'),
(9, 'Zara Larsson', TRUE, 'Swedish singer', 'ZaraLarsson.jpg'),
(10, 'aespa', TRUE, 'South Korean girl group', 'aespa.jpg'),
(11, 'Taylor Swift', TRUE, 'American singer-songwriter', 'TaylorSwift.jpg'),
(12, 'Ariana Grande', TRUE, 'American singer and actress', 'ArianaGrande.jpg'),
(13, 'The Weeknd', TRUE, 'Canadian singer and songwriter', 'TheWeeknd.jpg'),
(14, 'Miley Cyrus', TRUE, 'American singer and actress', 'MileyCyrus.jpg'),
(15, 'Rihanna', TRUE, 'Barbadian singer', 'Rihanna.jpg');

insert into network (id, name) values
(1, 'Spotify'),
(2, 'Apple Music'),
(3, 'YouTube'),
(4, 'SoundCloud'),
(5, 'Tidal'),
(6, 'Deezer');

insert into project_type (id, name) values
(1, 'Album'),
(2, 'Single'),
(3, 'EP'),
(4, 'Compilation');

insert into project (id, title, release, color1, color2, cover_path, id_type) values
(1, 'HIT ME HARD AND SOFT', '2024-05-17 12:00:00', '#0e131d', '#101b30', 'HMHAS.jpg', 1),
(2, 'Radical Optimism', '2024-05-03 12:00:00', '#346372', '#274c5e', 'RadicalOptimism.jpg', 1),
(3, 'don''t smile at me', '2017-08-11 12:00:00', '#e3d178', '#c0b167', 'DSAM.jpg', 3),
(4, 'Future Nostalgia', '2020-03-27 12:00:00', '#ff1493', '#8b008b', 'FutureNostalgia.jpg', 1),
(5, 'SOUR', '2021-05-21 12:00:00', '#a855f7', '#ec4899', 'SOUR.jpg', 1),
(6, 'GUTS', '2023-09-08 12:00:00', '#7c3aed', '#4c1d95', 'GUTS.jpg', 1),
(7, 'Emails I Can''t Send', '2022-07-15 12:00:00', '#60a5fa', '#3b82f6', 'EmailsICantSend.jpg', 1),
(8, 'Short n'' Sweet', '2024-08-23 12:00:00', '#fbbf24', '#f59e0b', 'ShortNSweet.jpg', 1),
(9, 'Planet Her', '2021-06-25 12:00:00', '#ec4899', '#be185d', 'PlanetHer.jpg', 1),
(10, 'Vie', '2025-06-20 12:00:00', '#a78bfa', '#8b5cf6', 'Vie.jpg', 1),
(11, 'Chromatica', '2020-05-29 12:00:00', '#f472b6', '#ec4899', 'Chromatica.jpg', 1),
(12, 'Life Support', '2021-02-26 12:00:00', '#fca5a5', '#f87171', 'LifeSupport.jpg', 1),
(13, 'BRAT', '2024-06-07 12:00:00', '#84cc16', '#65a30d', 'BRAT.jpg', 1),
(14, 'Mayhem', '2025-03-07 12:00:00', '#06b6d4', '#0891b2', 'Mayhem.jpg', 1),
(15, 'Midnight Sun', '2025-09-26 12:00:00', '#f97316', '#ea580c', 'MidnightSun.jpg', 1),
(16, 'MY WORLD', '2023-05-08 12:00:00', '#8b5cf6', '#7c3aed', 'MYWORLD.jpg', 3),
(17, 'Drama', '2023-11-10 12:00:00', '#ef4444', '#dc2626', 'Drama.jpg', 1),
(18, 'Armageddon', '2024-05-27 12:00:00', '#6366f1', '#4f46e5', 'Armageddon.jpg', 1),
(19, 'Happier Than Ever', '2021-07-30 12:00:00', '#fef3c7', '#fde68a', 'HappierThanEver.jpg', 1),
(20, 'When We All Fall Asleep, Where Do We Go?', '2019-03-29 12:00:00', '#d1fae5', '#a7f3d0', 'WWAFAWDWG.jpg', 1),
(21, 'locket', '2026-01-16 12:00:00', '#e8b4f0', '#d8a4e0', 'Locket.jpg', 1),
(22, 'Silence Between Songs', '2023-09-15 12:00:00', '#c9daf8', '#a4c2f4', 'SilenceBetweenSongs.jpg', 1),
(23, 'Guitar Songs', '2022-07-21 12:00:00', '#6f7b89', '#3f4f5f', 'GuitarSongs.jpg', 2);

insert into library (id) values
('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'), ('10'), ('322EZBMz9mlGPzuJM0UmhQv8BkBiO3EC');

insert into playlist (title, isPublic, description, cover_path) values
('Playlist 1', TRUE, 'Description for playlist 1', 'playlist_1.jpg'),
('Playlist 2', FALSE, 'Description for playlist 2', 'playlist_2.jpg'),
('Playlist 3', TRUE, 'Description for playlist 3', 'playlist_3.jpg'),
('Playlist 4', FALSE, 'Description for playlist 4', 'playlist_4.jpg'),
('Playlist 5', TRUE, 'Description for playlist 5', 'playlist_5.jpg'),
('ALL', FALSE, 'Toutes les musiques d''Echoo', 'playlist_6.jpg'),
('Playlist 7', TRUE, 'Description for playlist 7', 'playlist_7.jpg'),
('Playlist 8', FALSE, 'Description for playlist 8', 'playlist_8.jpg'),
('Playlist 9', TRUE, 'Description for playlist 9', 'playlist_9.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_10.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_11.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_12.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_13.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_14.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_15.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_16.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_17.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_18.jpg'),
('liked', FALSE, 'Description for playlist liked', 'playlist_19.jpg'),
('liked', FALSE, 'Playlist des titres likés', '/liked.png');

insert into "user" (id, username, email, image_path, id_library, id_role, id_artist) values
('1', 'user1', 'user1@example.com', 'user_1.jpg', '1', 2, 1),
('2', 'user2', 'user2@example.com', 'user_2.jpg', '2', 2, NULL),
('3', 'user3', 'user3@example.com', 'user_3.jpg', '3', 3, 3),
('4', 'user4', 'user4@example.com', 'user_4.jpg', '4', 2, NULL),
('5', 'user5', 'user5@example.com', 'user_5.jpg', '5', 1, NULL),
('6', 'user6', 'user6@example.com', 'user_6.jpg', '6', 2, 6),
('7', 'user7', 'user7@example.com', 'user_7.jpg', '7', 3, 7),
('8', 'user8', 'user8@example.com', 'user_8.jpg', '8', 2, NULL),
('9', 'user9', 'user9@example.com', 'user_9.jpg', '9', 2, 9),
('10', 'user10', 'user10@example.com', 'user_10.jpg', '10', 4, NULL),
('322EZBMz9mlGPzuJM0UmhQv8BkBiO3EC', 'Admin', 'admin@admin.com', '', '322EZBMz9mlGPzuJM0UmhQv8BkBiO3EC', 1, NULL);

insert into conversation (id, created_at, name, image_path, id_creator) values
(1, '2023-05-15 12:00:00', 'Conversation 1', 'conversation_1.jpg', '1'),
(2, '2023-06-22 12:00:00', 'Conversation 2', 'conversation_2.jpg', '2'),
(3, '2023-07-10 12:00:00', 'Conversation 3', 'conversation_3.jpg', '3'),
(4, '2023-08-30 12:00:00', 'Conversation 4', 'conversation_4.jpg', '4'),
(5, '2023-09-18 12:00:00', 'Conversation 5', 'conversation_5.jpg', '5');

insert into message (id, send_at, content, id_conversation, id_user, id_music) values
(1, '2023-05-15 12:05:00', 'Message content 1', 1, '1', 1),
(2, '2023-06-22 12:10:00', 'Message content 2', 2, '2', NULL),
(3, '2023-07-10 12:15:00', 'Message content 3', 3, '3', 3),
(4, '2023-08-30 12:20:00', 'Message content 4', 4, '4', NULL),
(5, '2023-09-18 12:25:00', 'Message content 5', 5, '5', 5),
(6, '2023-05-16 12:30:00', 'Message content 6', 1, '6', NULL),
(7, '2023-06-23 12:35:00', 'Message content 7', 2, '7', 7),
(8, '2023-07-11 12:40:00', 'Message content 8', 3, '8', NULL),
(9, '2023-08-31 12:45:00', 'Message content 9', 4, '9', 9),
(10, '2023-09-19 12:50:00', 'Message content 10', 5, '10', NULL),
(11, '2023-05-17 12:55:00', 'Message content 11', 1, '1', 11),
(12, '2023-06-24 13:00:00', 'Message content 12', 2, '2', NULL),
(13, '2023-07-12 13:05:00', 'Message content 13', 3, '3', 13),
(14, '2023-08-28 13:10:00', 'Message content 14', 4, '4', NULL),
(15, '2023-09-20 13:15:00', 'Message content 15', 5, '5', 15),
(16, '2023-05-18 13:20:00', 'Message content 16', 1, '6', NULL),
(17, '2023-06-25 13:25:00', 'Message content 17', 2, '7', 2),
(18, '2023-07-13 13:30:00', 'Message content 18', 3, '8', NULL),
(19, '2023-08-29 13:35:00', 'Message content 19', 4, '9', 4),
(20, '2023-09-21 13:40:00', 'Message content 20', 5, '10', NULL);

insert into music_rating (id, rating, created_at, comment, id_user, id_music) values
(1, 5, '2025-10-03', 'Comment 1', '1', 1),
(2, 4, '2025-10-04', 'Comment 2', '2', 2),
(3, 3, '2025-10-05', 'Comment 3', '3', 3),
(4, 5, '2025-10-06', 'Comment 4', '4', 4),
(5, 2, '2025-10-07', 'Comment 5', '5', 5),
(6, 4, '2025-10-08', 'Comment 6', '6', 6),
(7, 5, '2025-10-09', 'Comment 7', '7', 7),
(8, 3, '2025-10-10', 'Comment 8', '8', 8),
(9, 4, '2025-10-11', 'Comment 9', '9', 9),
(10, 5, '2025-10-12', 'Comment 10', '10', 10),
(11, 2, '2025-10-13', 'Comment 11', '1', 11),
(12, 3, '2025-10-14', 'Comment 12', '2', 12),
(13, 4, '2025-10-15', 'Comment 13', '3', 13),
(14, 5, '2025-10-16', 'Comment 14', '4', 14),
(15, 1, '2025-10-17', 'Comment 15', '5', 15),
(16, 4, '2025-10-18', 'Comment 16', '6', 1),
(17, 5, '2025-10-19', 'Comment 17', '7', 2),
(18, 3, '2025-10-20', 'Comment 18', '8', 3),
(19, 2, '2025-10-21', 'Comment 19', '9', 4),
(20, 4, '2025-10-22', 'Comment 20', '10', 5),
(21, 5, '2025-10-23', 'Comment 21', '1', 6),
(22, 3, '2025-10-24', 'Comment 22', '2', 7),
(23, 4, '2025-10-25', 'Comment 23', '3', 8),
(24, 5, '2025-10-26', 'Comment 24', '4', 9),
(25, 2, '2025-10-27', 'Comment 25', '5', 10),
(26, 4, '2025-10-28', 'Comment 26', '6', 11),
(27, 5, '2025-10-29', 'Comment 27', '7', 12),
(28, 3, '2025-10-30', 'Comment 28', '8', 13),
(29, 4, '2025-10-31', 'Comment 29', '9', 14),
(30, 5, '2025-11-01', 'Comment 30', '10', 15);

insert into project_rating (id, rating, created_at, comment, id_user, id_project) values
(1, 5, '2025-10-03', 'Comment 1', '1', 1),
(2, 4, '2025-10-04', 'Comment 2', '2', 2),
(3, 3, '2025-10-05', 'Comment 3', '3', 3),
(4, 5, '2025-10-06', 'Comment 4', '4', 4),
(5, 2, '2025-10-07', 'Comment 5', '5', 5),
(6, 4, '2025-10-08', 'Comment 6', '6', 6),
(7, 5, '2025-10-09', 'Comment 7', '7', 7),
(8, 3, '2025-10-10', 'Comment 8', '8', 8),
(9, 4, '2025-10-11', 'Comment 9', '9', 9),
(10, 5, '2025-10-12', 'Comment 10', '10', 10),
(11, 2, '2025-10-13', 'Comment 11', '1', 1),
(12, 3, '2025-10-14', 'Comment 12', '2', 2),
(13, 4, '2025-10-15', 'Comment 13', '3', 3),
(14, 5, '2025-10-16', 'Comment 14', '4', 4),
(15, 1, '2025-10-17', 'Comment 15', '5', 5),
(16, 4, '2025-10-18', 'Comment 16', '6', 6),
(17, 5, '2025-10-19', 'Comment 17', '7', 7),
(18, 3, '2025-10-20', 'Comment 18', '8', 8),
(19, 2, '2025-10-21', 'Comment 19', '9', 9),
(20, 4, '2025-10-22', 'Comment 20', '10', 10),
(21, 5, '2025-10-23', 'Comment 21', '1', 1),
(22, 3, '2025-10-24', 'Comment 22', '2', 2),
(23, 4, '2025-10-25', 'Comment 23', '3', 3),
(24, 5, '2025-10-26', 'Comment 24', '4', 4),
(25, 2, '2025-10-27', 'Comment 25', '5', 5),
(26, 4, '2025-10-28', 'Comment 26', '6', 6),
(27, 5, '2025-10-29', 'Comment 27', '7', 7),
(28, 3, '2025-10-30', 'Comment 28', '8', 8),
(29, 4, '2025-10-31', 'Comment 29', '9', 9),
(30, 5, '2025-11-01', 'Comment 30', '10', 10);

insert into friendship (user1, user2) values
('1', '2'), ('1', '3'), ('1', '5'), ('2', '4'), ('2', '6'), ('3', '4'), ('3', '7'), ('4', '8'), ('5', '9'), ('6', '10');

insert into featuring (id_artist, id_music) values
(1, 1), (1, 2), (2, 3), (2, 4), (1, 5), (1, 6), (2, 7), (2, 8), (1, 9), (2, 10),
(3, 11), (3, 12), (3, 13), (3, 14), (4, 15), (4, 16), (4, 17), (5, 18), (5, 19), (5, 20), (5, 21),
(6, 22), (6, 23), (7, 24), (7, 25), (8, 26), (8, 27), (9, 28), (9, 29), (10, 30), (10, 31),
(10, 32), (1, 33), (1, 34), (1, 35), (1, 36), (7, 37), (7, 38), (1, 39), (1, 40);

insert into artist_network (id_artist, id_network, link) values
(1, 1, 'https://example.com/artist_1_network_1'),
(1, 2, 'https://example.com/artist_1_network_2'),
(1, 3, 'https://example.com/artist_1_network_3'),
(2, 1, 'https://example.com/artist_2_network_1'),
(2, 2, 'https://example.com/artist_2_network_2'),
(2, 4, 'https://example.com/artist_2_network_4'),
(3, 1, 'https://example.com/artist_3_network_1'),
(3, 3, 'https://example.com/artist_3_network_3'),
(3, 5, 'https://example.com/artist_3_network_5'),
(4, 2, 'https://example.com/artist_4_network_2'),
(4, 3, 'https://example.com/artist_4_network_3'),
(4, 6, 'https://example.com/artist_4_network_6'),
(5, 1, 'https://example.com/artist_5_network_1'),
(5, 4, 'https://example.com/artist_5_network_4'),
(5, 6, 'https://example.com/artist_5_network_6'),
(6, 2, 'https://example.com/artist_6_network_2'),
(6, 5, 'https://example.com/artist_6_network_5'),
(7, 1, 'https://example.com/artist_7_network_1'),
(7, 3, 'https://example.com/artist_7_network_3'),
(8, 2, 'https://example.com/artist_8_network_2'),
(8, 4, 'https://example.com/artist_8_network_4'),
(9, 1, 'https://example.com/artist_9_network_1'),
(9, 6, 'https://example.com/artist_9_network_6'),
(10, 3, 'https://example.com/artist_10_network_3'),
(10, 5, 'https://example.com/artist_10_network_5'),
(11, 1, 'https://example.com/artist_11_network_1'),
(11, 2, 'https://example.com/artist_11_network_2'),
(12, 3, 'https://example.com/artist_12_network_3'),
(12, 4, 'https://example.com/artist_12_network_4'),
(13, 1, 'https://example.com/artist_13_network_1'),
(13, 5, 'https://example.com/artist_13_network_5'),
(14, 2, 'https://example.com/artist_14_network_2'),
(14, 6, 'https://example.com/artist_14_network_6'),
(15, 1, 'https://example.com/artist_15_network_1'),
(15, 3, 'https://example.com/artist_15_network_3');

insert into project_music (id_project, id_music) values
(1, 1), (1, 2), (1, 9), (2, 3), (2, 4), (2, 10), (3, 5), (3, 6), (4, 7), (4, 8),
(5, 11), (5, 12), (6, 13), (6, 14), (7, 15), (8, 16), (8, 17), (9, 18), (9, 19), (10, 20), (10, 21),
(11, 22), (11, 23), (12, 24), (12, 25), (13, 26), (13, 27), (15, 28), (15, 29), (16, 30), (17, 31),
(18, 32), (19, 33), (19, 34), (20, 35), (20, 36), (21, 37), (22, 38), (23, 39), (23, 40);

insert into artist_project (id_artist, id_project) values
(1, 1), (2, 2), (1, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 11), (7, 12), (8, 13), (9, 14), (9, 15), (10, 16), (10, 17), (10, 18), (1, 19), (1, 20), (7, 21), (7, 22), (1, 23);

insert into library_artist (id_library, id_artist) values
('1', 1), ('1', 2), ('1', 3), ('2', 4), ('2', 5), ('3', 6), ('3', 7), ('4', 8), ('4', 9), ('5', 10),
('1', 11), ('2', 12), ('3', 13), ('4', 14), ('5', 15), ('1', 6), ('2', 7), ('3', 8), ('3', 1);

insert into library_project (id_library, id_project) values
('1', 1), ('1', 2), ('2', 3), ('2', 4), ('3', 5), ('3', 6), ('4', 7), ('4', 8), ('5', 9), ('5', 10),
('1', 3), ('2', 5), ('3', 7), ('4', 9), ('5', 1);

insert into library_playlist (id_library, id_playlist) values
('1', 1), ('1', 2), ('2', 3), ('2', 4), ('3', 5), ('3', 6), ('4', 7), ('4', 8), ('5', 9),
('1', 3), ('2', 5), ('3', 7), ('4', 9), ('5', 1),
('1', 10), ('2', 11), ('3', 12), ('4', 13), ('5', 14), ('6', 15), ('7', 16), ('8', 17), ('9', 18), ('10', 19),
('322EZBMz9mlGPzuJM0UmhQv8BkBiO3EC', 20);

insert into playlist_music (id_playlist, id_music) values
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 1), (6, 2), (6, 3), (6, 4), (6, 5), (6, 6), (6, 7), (6, 8), (6, 9), (6, 10),
(6, 11), (6, 12), (6, 13), (6, 14), (6, 15), (6, 16), (6, 17), (6, 18), (6, 19), (6, 20),
(6, 21), (6, 22), (6, 23), (6, 24), (6, 25), (6, 26), (6, 27), (6, 28), (6, 29), (6, 30),
(6, 31), (6, 32), (6, 33), (6, 34), (6, 35), (6, 36), (6, 37), (6, 38), (6, 39), (6, 40),
(7, 13), (7, 14), (8, 15), (8, 1), (9, 2), (9, 3), (10, 4), (10, 5),
(1, 6), (2, 7), (3, 8), (4, 9), (7, 12), (8, 13), (9, 14),
(10, 15), (11, 6), (12, 6), (13, 6), (14, 6), (15, 6), (16, 6), (17, 6), (18, 6), (19, 6);

insert into user_conversation (id_user, id_conversation) values
('1', 1), ('1', 2), ('2', 1), ('2', 3), ('3', 2), ('3', 4), ('4', 3), ('4', 5), ('5', 4), ('5', 1),
('6', 2), ('6', 5), ('7', 3), ('7', 4), ('8', 1), ('8', 5), ('9', 2), ('9', 3), ('10', 4), ('10', 1);

insert into log_user_music (id_user, id_music, listened_at) values
('1', 1, '2026-01-15 12:00:00'),
('2', 2, '2023-06-22 12:00:00'),
('3', 3, '2023-07-10 12:00:00'),
('4', 4, '2023-08-30 12:00:00'),
('5', 5, '2023-09-18 12:00:00'),
('6', 6, '2023-05-16 12:00:00'),
('7', 7, '2023-06-23 12:00:00'),
('8', 8, '2023-07-11 12:00:00'),
('9', 9, '2023-08-31 12:00:00'),
('10', 10, '2023-09-19 12:00:00'),
('1', 11, '2026-02-17 12:00:00'),
('2', 12, '2023-06-24 12:00:00'),
('3', 13, '2023-07-12 12:00:00'),
('4', 14, '2023-08-28 12:00:00'),
('5', 15, '2023-09-20 12:00:00'),
('6', 1, '2023-05-18 12:00:00'),
('7', 2, '2023-06-25 12:00:00'),
('8', 3, '2023-07-13 12:00:00'),
('9', 4, '2023-08-29 12:00:00'),
('10', 5, '2023-09-21 12:00:00'),
('1', 6, '2026-01-19 12:00:00'),
('2', 7, '2023-06-26 12:00:00'),
('3', 8, '2023-07-14 12:00:00'),
('4', 9, '2023-08-30 12:00:00'),
('5', 10, '2023-09-22 12:00:00'),
('6', 11, '2023-05-20 12:00:00'),
('7', 12, '2023-06-27 12:00:00'),
('8', 13, '2023-07-15 12:00:00'),
('9', 14, '2023-08-31 12:00:00'),
('10', 15, '2023-09-23 12:00:00'),
('1', 1, '2026-01-21 12:00:00'),
('1', 1, '2026-02-21 12:00:00'),
('2', 2, '2023-06-28 12:00:00'),
('3', 3, '2023-07-16 12:00:00'),
('4', 4, '2023-09-01 12:00:00'),
('5', 5, '2023-09-24 12:00:00');

insert into music_genre (id_music, id_genre) values
(1, 6), (1, 1), (2, 7), (2, 4), (3, 3), (3, 1), (4, 1), (4, 8), (5, 4), (5, 9),
(6, 5), (6, 1), (7, 6), (7, 1), (8, 7), (8, 1), (9, 8), (9, 1), (10, 9), (10, 1),
(11, 10), (11, 1), (12, 1), (12, 2), (13, 6), (13, 1), (14, 6), (14, 4), (15, 2), (15, 1),
(39, 1), (39, 6), (40, 1), (40, 3);
