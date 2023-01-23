ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;

DROP TABLE IF EXISTS public.users;

CREATE TABLE users (
    id serial NOT NULL,
    username VARCHAR UNIQUE,
    password VARCHAR
);

ALTER TABLE only users
    ADD CONSTRAINT pk_id PRIMARY KEY (id);