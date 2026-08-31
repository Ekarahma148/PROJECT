-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.auth_users_id_seq;

CREATE SEQUENCE public.auth_users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.tbl_tasks_id_seq;

CREATE SEQUENCE public.tbl_tasks_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.tbl_users_id_seq;

CREATE SEQUENCE public.tbl_users_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- public.auth_users definition

-- Drop table

-- DROP TABLE public.auth_users;

CREATE TABLE public.auth_users (
	id bigserial NOT NULL,
	email varchar(100) NOT NULL,
	"password" varchar(255) NOT NULL,
	username varchar(255) NULL,
	CONSTRAINT auth_users_email_key UNIQUE (email),
	CONSTRAINT auth_users_pkey PRIMARY KEY (id)
);


-- public.tbl_tasks definition

-- Drop table

-- DROP TABLE public.tbl_tasks;

CREATE TABLE public.tbl_tasks (
	id bigserial NOT NULL,
	title varchar(200) NOT NULL,
	description text NULL,
	deadline timestamp NULL,
	priority varchar(20) NULL,
	status varchar(30) NULL,
	user_id int8 NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_tasks_pkey PRIMARY KEY (id)
);


-- public.tbl_users definition

-- Drop table

-- DROP TABLE public.tbl_users;

CREATE TABLE public.tbl_users (
	id bigserial NOT NULL,
	fullname varchar(100) NULL,
	email varchar(100) NULL,
	username varchar(100) NULL,
	"password" varchar(255) NULL,
	"role" varchar(50) NULL,
	created_at timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT tbl_users_email_key UNIQUE (email),
	CONSTRAINT tbl_users_pkey PRIMARY KEY (id),
	CONSTRAINT tbl_users_username_key UNIQUE (username)
);