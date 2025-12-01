DROP DATABASE test;
CREATE DATABASE test;
USE test;

CREATE TABLE role (
    id SMALLINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    image_path VARCHAR(255),
    id_role SMALLINT NOT NULL,

    CONSTRAINT fk_user_role
        FOREIGN KEY (id_role) REFERENCES role(id),

);

INSERT INTO role (id, name) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Artist'),
(4, 'Moderator');

