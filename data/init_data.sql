DROP TABLE IF EXISTS public.users;

CREATE TABLE users (
    id serial NOT NULL,
    username VARCHAR UNIQUE,
    password VARCHAR
);

DROP TABLE IF EXISTS public.planet_votes;

CREATE TABLE planet_votes (
    id serial NOT NULL,
    planet_name varchar,
    submission_time timestamp without time zone
);

ALTER TABLE only users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY planet_votes
    ADD CONSTRAINT pk_planet_votes_id PRIMARY KEY (id);