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
    id_type smallint references project_type(id) not null
);

create table library (
    id serial primary key
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
    id serial primary key,
    username varchar(50) not null,
    email varchar(100) not null,
    password varchar(60) not null,
    image_path varchar(255),
    id_library integer references library(id) not null,
    id_role smallint references role(id) not null,
    id_artist integer references artist(id)
);

create table conversation (
    id serial primary key,
    created_at timestamp not null,
    name varchar(50),
    image_path varchar(255),
    id_creator int references "user"(id) not null
);

create table message (
    id serial primary key,
    send_at timestamp not null,
    content text,
    id_conversation integer references conversation(id) not null,
    id_user integer references "user"(id) not null,
    id_music integer references music(id)
);

create table music_rating (
    id serial primary key,
    rating smallint not null,
    created_at timestamp not null,
    comment text,
    id_user integer references "user"(id) not null,
    id_music integer references music(id) not null
);

create table project_rating (
    id serial primary key,
    rating smallint not null,
    created_at timestamp not null,
    comment text,
    id_user integer references "user"(id) not null,
    id_project integer references project(id) not null
);

create table friendship (
    user1 integer references "user"(id) not null,
    user2 integer references "user"(id) not null,
    primary key (user1, user2)
);

create table featuring (
    id_artist integer references artist(id) not null,
    id_music integer references music(id) not null,
    primary key (id_artist, id_music)
);

create table artist_network (
    id_artist integer references artist(id) not null,
    id_network smallint references network(id) not null,
    link varchar(255) not null,
    primary key (id_artist, id_network)
);

create table project_music (
    id_project integer references project(id) not null,
    id_music integer references music(id) not null,
    primary key (id_project, id_music)
);

create table artist_project (
    id_artist integer references artist(id) not null,
    id_project integer references project(id) not null,
    primary key(id_artist, id_project)
);

create table library_artist (
    id_library integer references library(id) not null,
    id_artist integer references artist(id) not null,
    primary key(id_library, id_artist)
);

create table library_project (
    id_library integer references library(id) not null,
    id_project integer references project(id) not null,
    primary key(id_library, id_project)
);

create table library_playlist (
    id_library integer references library(id) not null,
    id_playlist integer references playlist(id) not null,
    primary key(id_library, id_playlist)
);

create table playlist_music (
    id_playlist integer references playlist(id) not null,
    id_music integer references music(id) not null,
    primary key(id_playlist, id_music)
);

create table user_conversation (
    id_user integer references "user"(id) not null,
    id_conversation integer references conversation(id) not null,
    primary key(id_user, id_conversation)
);

create table log_user_music (
    id_user integer references "user"(id) not null,
    id_music integer references music(id) not null,
    listened_at timestamp not null
);

create table music_genre (
    id_music integer references music(id) not null,
    id_genre integer references genre(id) not null,
    primary key (id_music, id_genre)
);

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
(1, 'Dance Floor', 312, '2022-05-15 12:00:00', 456123, '/music/1.mp3'),
(2, 'Indie Vibes', 287, '2021-11-22 12:00:00', 123456, '/music/2.mp3'),
(3, 'Jazz Night', 356, '2023-02-10 12:00:00', 789012, '/music/3.mp3'),
(4, 'Summer Vibes', 245, '2020-07-30 12:00:00', 321654, '/music/4.mp3'),
(5, 'Hip-Hop Beats', 298, '2024-01-18 12:00:00', 987654, '/music/5.mp3'),
(6, 'Classical Symphony', 420, '2023-08-14 12:00:00', 123456, '/music/6.mp3'),
(7, 'Electronic Pulse', 330, '2022-09-20 12:00:00', 456789, '/music/7.mp3'),
(8, 'Country Roads', 250, '2021-03-10 12:00:00', 234567, '/music/8.mp3'),
(9, 'R&B Groove', 300, '2023-05-05 12:00:00', 567890, '/music/9.mp3'),
(10, 'Reggae Rhythms', 280, '2022-12-12 12:00:00', 345678, '/music/10.mp3'),
(11, 'Metal Thunder', 400, '2023-07-22 12:00:00', 678901, '/music/11.mp3'),
(12, 'Pop Sensation', 220, '2021-06-18 12:00:00', 234567, '/music/12.mp3'),
(13, 'Chillout Lounge', 310, '2023-01-30 12:00:00', 456789, '/music/13.mp3'),
(14, 'Dance Floor Remix', 320, '2022-11-15 12:00:00', 567890, '/music/14.mp3'),
(15, 'Indie Vibes Remix', 290, '2023-09-05 12:00:00', 678901, '/music/15.mp3');

insert into artist (id, name, isVerified, description, image_path) values
(1, 'Beyoncé', TRUE, 'Description for artist 1', '/images/artist_1.jpg'),
(2, 'Drake', TRUE, 'Description for artist 2', '/images/artist_2.jpg'),
(3, 'Taylor Swift', TRUE, 'Description for artist 3', '/images/artist_3.jpg'),
(4, 'Kendrick Lamar', TRUE, 'Description for artist 4', '/images/artist_4.jpg'),
(5, 'Billie Eilish', TRUE, 'Description for artist 5', '/images/artist_5.jpg'),
(6, 'Ed Sheeran', TRUE, 'Description for artist 6', '/images/artist_6.jpg'),
(7, 'Adele', TRUE, 'Description for artist 7', '/images/artist_7.jpg'),
(8, 'Lady Gaga', TRUE, 'Description for artist 8', '/images/artist_8.jpg'),
(9, 'Bruno Mars', TRUE, 'Description for artist 9', '/images/artist_9.jpg'),
(10, 'Rihanna', TRUE, 'Description for artist 10', '/images/artist_10.jpg'),
(11, 'Coldplay', TRUE, 'Description for artist 11', '/images/artist_11.jpg'),
(12, 'The Weeknd', TRUE, 'Description for artist 12', '/images/artist_12.jpg'),
(13, 'Ariana Grande', TRUE, 'Description for artist 13', '/images/artist_13.jpg'),
(14, 'Justin Bieber', TRUE, 'Description for artist 14', '/images/artist_14.jpg'),
(15, 'Post Malone', TRUE, 'Description for artist 15', '/images/artist_15.jpg');

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
(1, 'Project 1', '2022-05-15 12:00:00', '#FF5733', '#33FF57', '/covers/project_1.jpg', 1),
(2, 'Project 2', '2021-11-22 12:00:00', '#3357FF', '#F033FF', '/covers/project_2.jpg', 2),
(3, 'Project 3', '2023-02-10 12:00:00', '#57FF33', '#FF33F0', '/covers/project_3.jpg', 3),
(4, 'Project 4', '2020-07-30 12:00:00', '#33FFF0', '#F0FF33', '/covers/project_4.jpg', 1),
(5, 'Project 5', '2024-01-18 12:00:00', '#FF33A8', '#A833FF', '/covers/project_5.jpg', 2),
(6, 'Project 6', '2023-08-14 12:00:00', '#33A8FF', '#A8FF33', '/covers/project_6.jpg', 3),
(7, 'Project 7', '2022-09-20 12:00:00', '#A833FF', '#33FFA8', '/covers/project_7.jpg', 1),
(8, 'Project 8', '2021-03-10 12:00:00', '#FFA833', '#33A8FF', '/covers/project_8.jpg', 2),
(9, 'Project 9', '2023-05-05 12:00:00', '#33FFA8', '#A833FF', '/covers/project_9.jpg', 3),
(10, 'Project 10', '2022-12-12 12:00:00', '#A8FF33', '#FF33A8', '/covers/project_10.jpg', 1);

insert into library (id) values
(1), (2), (3), (4), (5);

insert into playlist (id, title, isPublic, description, cover_path) values
(1, 'Playlist 1', TRUE, 'Description for playlist 1', '/covers/playlist_1.jpg'),
(2, 'Playlist 2', FALSE, 'Description for playlist 2', '/covers/playlist_2.jpg'),
(3, 'Playlist 3', TRUE, 'Description for playlist 3', '/covers/playlist_3.jpg'),
(4, 'Playlist 4', FALSE, 'Description for playlist 4', '/covers/playlist_4.jpg'),
(5, 'Playlist 5', TRUE, 'Description for playlist 5', '/covers/playlist_5.jpg'),
(6, 'Playlist 6', FALSE, 'Description for playlist 6', '/covers/playlist_6.jpg'),
(7, 'Playlist 7', TRUE, 'Description for playlist 7', '/covers/playlist_7.jpg'),
(8, 'Playlist 8', FALSE, 'Description for playlist 8', '/covers/playlist_8.jpg'),
(9, 'Playlist 9', TRUE, 'Description for playlist 9', '/covers/playlist_9.jpg'),
(10, 'Playlist 10', FALSE, 'Description for playlist 10', '/covers/playlist_10.jpg');

insert into role (id, name) values
(1, 'Admin'),
(2, 'User'),
(3, 'Artist'),
(4, 'Moderator');

insert into "user" (id, username, email, password, image_path, id_library, id_role, id_artist) values
(1, 'user1', 'user1@example.com', 'hashed_password', '/images/user_1.jpg', 1, 2, 1),
(2, 'user2', 'user2@example.com', 'hashed_password', '/images/user_2.jpg', 2, 2, NULL),
(3, 'user3', 'user3@example.com', 'hashed_password', '/images/user_3.jpg', 3, 3, 3),
(4, 'user4', 'user4@example.com', 'hashed_password', '/images/user_4.jpg', 4, 2, NULL),
(5, 'user5', 'user5@example.com', 'hashed_password', '/images/user_5.jpg', 5, 1, NULL),
(6, 'user6', 'user6@example.com', 'hashed_password', '/images/user_6.jpg', 1, 2, 6),
(7, 'user7', 'user7@example.com', 'hashed_password', '/images/user_7.jpg', 2, 3, 7),
(8, 'user8', 'user8@example.com', 'hashed_password', '/images/user_8.jpg', 3, 2, NULL),
(9, 'user9', 'user9@example.com', 'hashed_password', '/images/user_9.jpg', 4, 2, 9),
(10, 'user10', 'user10@example.com', 'hashed_password', '/images/user_10.jpg', 5, 4, NULL);

insert into conversation (id, created_at, name, image_path, id_creator) values
(1, '2023-05-15 12:00:00', 'Conversation 1', '/images/conversation_1.jpg', 1),
(2, '2023-06-22 12:00:00', 'Conversation 2', '/images/conversation_2.jpg', 2),
(3, '2023-07-10 12:00:00', 'Conversation 3', '/images/conversation_3.jpg', 3),
(4, '2023-08-30 12:00:00', 'Conversation 4', '/images/conversation_4.jpg', 4),
(5, '2023-09-18 12:00:00', 'Conversation 5', '/images/conversation_5.jpg', 5);

insert into message (id, send_at, content, id_conversation, id_user, id_music) values
(1, '2023-05-15 12:05:00', 'Message content 1', 1, 1, 1),
(2, '2023-06-22 12:10:00', 'Message content 2', 2, 2, NULL),
(3, '2023-07-10 12:15:00', 'Message content 3', 3, 3, 3),
(4, '2023-08-30 12:20:00', 'Message content 4', 4, 4, NULL),
(5, '2023-09-18 12:25:00', 'Message content 5', 5, 5, 5),
(6, '2023-05-16 12:30:00', 'Message content 6', 1, 6, NULL),
(7, '2023-06-23 12:35:00', 'Message content 7', 2, 7, 7),
(8, '2023-07-11 12:40:00', 'Message content 8', 3, 8, NULL),
(9, '2023-08-31 12:45:00', 'Message content 9', 4, 9, 9),
(10, '2023-09-19 12:50:00', 'Message content 10', 5, 10, NULL),
(11, '2023-05-17 12:55:00', 'Message content 11', 1, 1, 11),
(12, '2023-06-24 13:00:00', 'Message content 12', 2, 2, NULL),
(13, '2023-07-12 13:05:00', 'Message content 13', 3, 3, 13),
(14, '2023-08-28 13:10:00', 'Message content 14', 4, 4, NULL),
(15, '2023-09-20 13:15:00', 'Message content 15', 5, 5, 15),
(16, '2023-05-18 13:20:00', 'Message content 16', 1, 6, NULL),
(17, '2023-06-25 13:25:00', 'Message content 17', 2, 7, 2),
(18, '2023-07-13 13:30:00', 'Message content 18', 3, 8, NULL),
(19, '2023-08-29 13:35:00', 'Message content 19', 4, 9, 4),
(20, '2023-09-21 13:40:00', 'Message content 20', 5, 10, NULL);

insert into music_rating (id, rate, comment, id_user, id_music) values
(1, 5, 'Comment 1', 1, 1),
(2, 4, 'Comment 2', 2, 2),
(3, 3, 'Comment 3', 3, 3),
(4, 5, 'Comment 4', 4, 4),
(5, 2, 'Comment 5', 5, 5),
(6, 4, 'Comment 6', 6, 6),
(7, 5, 'Comment 7', 7, 7),
(8, 3, 'Comment 8', 8, 8),
(9, 4, 'Comment 9', 9, 9),
(10, 5, 'Comment 10', 10, 10),
(11, 2, 'Comment 11', 1, 11),
(12, 3, 'Comment 12', 2, 12),
(13, 4, 'Comment 13', 3, 13),
(14, 5, 'Comment 14', 4, 14),
(15, 1, 'Comment 15', 5, 15),
(16, 4, 'Comment 16', 6, 1),
(17, 5, 'Comment 17', 7, 2),
(18, 3, 'Comment 18', 8, 3),
(19, 2, 'Comment 19', 9, 4),
(20, 4, 'Comment 20', 10, 5),
(21, 5, 'Comment 21', 1, 6),
(22, 3, 'Comment 22', 2, 7),
(23, 4, 'Comment 23', 3, 8),
(24, 5, 'Comment 24', 4, 9),
(25, 2, 'Comment 25', 5, 10),
(26, 4, 'Comment 26', 6, 11),
(27, 5, 'Comment 27', 7, 12),
(28, 3, 'Comment 28', 8, 13),
(29, 4, 'Comment 29', 9, 14),
(30, 5, 'Comment 30', 10, 15);

insert into project_rating (id, rate, comment, id_user, id_project) values
(1, 5, 'Comment 1', 1, 1),
(2, 4, 'Comment 2', 2, 2),
(3, 3, 'Comment 3', 3, 3),
(4, 5, 'Comment 4', 4, 4),
(5, 2, 'Comment 5', 5, 5),
(6, 4, 'Comment 6', 6, 6),
(7, 5, 'Comment 7', 7, 7),
(8, 3, 'Comment 8', 8, 8),
(9, 4, 'Comment 9', 9, 9),
(10, 5, 'Comment 10', 10, 10),
(11, 2, 'Comment 11', 1, 1),
(12, 3, 'Comment 12', 2, 2),
(13, 4, 'Comment 13', 3, 3),
(14, 5, 'Comment 14', 4, 4),
(15, 1, 'Comment 15', 5, 5),
(16, 4, 'Comment 16', 6, 6),
(17, 5, 'Comment 17', 7, 7),
(18, 3, 'Comment 18', 8, 8),
(19, 2, 'Comment 19', 9, 9),
(20, 4, 'Comment 20', 10, 10),
(21, 5, 'Comment 21', 1, 1),
(22, 3, 'Comment 22', 2, 2),
(23, 4, 'Comment 23', 3, 3),
(24, 5, 'Comment 24', 4, 4),
(25, 2, 'Comment 25', 5, 5),
(26, 4, 'Comment 26', 6, 6),
(27, 5, 'Comment 27', 7, 7),
(28, 3, 'Comment 28', 8, 8),
(29, 4, 'Comment 29', 9, 9),
(30, 5, 'Comment 30', 10, 10);

insert into friendship (user1, user2) values
(1, 2), (1, 3), (1, 5), (2, 4), (2, 6), (3, 4), (3, 7), (4, 8), (5, 9), (6, 10);

insert into featuring (id_artist, id_music) values
(1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
(11, 11), (12, 12), (13, 13), (14, 14), (15, 15), (1, 6), (2, 7), (3, 8), (4, 9), (5, 10),
(6, 11), (7, 12), (8, 13), (9, 14), (10, 15), (11, 1), (12, 2), (13, 3), (14, 4), (15, 5);

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
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 11), (6, 12), (7, 13), (7, 14), (8, 15), (8, 1), (9, 2), (9, 3), (10, 4), (10, 5);

insert into artist_project (id_artist, id_project) values
(1, 1), (2, 1), (3, 2), (4, 2), (5, 3), (6, 3), (7, 4), (8, 4), (9, 5), (10, 5),
(11, 6), (12, 6), (13, 7), (14, 7), (15, 8), (1, 8), (2, 9), (3, 9), (4, 10), (5, 10);

insert into library_artist (id_library, id_artist) values
(1, 1), (1, 2), (1, 3), (2, 4), (2, 5), (3, 6), (3, 7), (4, 8), (4, 9), (5, 10),
(1, 11), (2, 12), (3, 13), (4, 14), (5, 15), (1, 6), (2, 7), (3, 8);

insert into library_project (id_library, id_project) values
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(1, 3), (2, 5), (3, 7), (4, 9), (5, 1);

insert into library_playlist (id_library, id_playlist) values
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(1, 3), (2, 5), (3, 7), (4, 9), (5, 1);

insert into playlist_music (id_playlist, id_music) values
(1, 1), (1, 2), (2, 3), (2, 4), (3, 5), (3, 6), (4, 7), (4, 8), (5, 9), (5, 10),
(6, 11), (6, 12), (7, 13), (7, 14), (8, 15), (8, 1), (9, 2), (9, 3), (10, 4), (10, 5),
(1, 6), (2, 7), (3, 8), (4, 9), (7, 12), (8, 13), (9, 14), (10, 15);

insert into user_conversation (id_user, id_conversation) values
(1, 1), (1, 2), (2, 1), (2, 3), (3, 2), (3, 4), (4, 3), (4, 5), (5, 4), (5, 1),
(6, 2), (6, 5), (7, 3), (7, 4), (8, 1), (8, 5), (9, 2), (9, 3), (10, 4), (10, 1);

insert into log_user_music (id_user, id_music, listened_at) values
(1, 1, '2023-05-15 12:00:00'),
(2, 2, '2023-06-22 12:00:00'),
(3, 3, '2023-07-10 12:00:00'),
(4, 4, '2023-08-30 12:00:00'),
(5, 5, '2023-09-18 12:00:00'),
(6, 6, '2023-05-16 12:00:00'),
(7, 7, '2023-06-23 12:00:00'),
(8, 8, '2023-07-11 12:00:00'),
(9, 9, '2023-08-31 12:00:00'),
(10, 10, '2023-09-19 12:00:00'),
(1, 11, '2023-05-17 12:00:00'),
(2, 12, '2023-06-24 12:00:00'),
(3, 13, '2023-07-12 12:00:00'),
(4, 14, '2023-08-28 12:00:00'),
(5, 15, '2023-09-20 12:00:00'),
(6, 1, '2023-05-18 12:00:00'),
(7, 2, '2023-06-25 12:00:00'),
(8, 3, '2023-07-13 12:00:00'),
(9, 4, '2023-08-29 12:00:00'),
(10, 5, '2023-09-21 12:00:00'),
(1, 6, '2023-05-19 12:00:00'),
(2, 7, '2023-06-26 12:00:00'),
(3, 8, '2023-07-14 12:00:00'),
(4, 9, '2023-08-30 12:00:00'),
(5, 10, '2023-09-22 12:00:00'),
(6, 11, '2023-05-20 12:00:00'),
(7, 12, '2023-06-27 12:00:00'),
(8, 13, '2023-07-15 12:00:00'),
(9, 14, '2023-08-31 12:00:00'),
(10, 15, '2023-09-23 12:00:00'),
(1, 1, '2023-05-21 12:00:00'),
(2, 2, '2023-06-28 12:00:00'),
(3, 3, '2023-07-16 12:00:00'),
(4, 4, '2023-09-01 12:00:00'),
(5, 5, '2023-09-24 12:00:00');

insert into music_genre (id_music, id_genre) values
(1, 6), (1, 1), (2, 7), (2, 4), (3, 3), (3, 1), (4, 1), (4, 8), (5, 4), (5, 9),
(6, 5), (6, 1), (7, 6), (7, 1), (8, 7), (8, 1), (9, 8), (9, 1), (10, 9), (10, 1),
(11, 10), (11, 1), (12, 1), (12, 2), (13, 6), (13, 1), (14, 6), (14, 4), (15, 2), (15, 1);
