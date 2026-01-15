-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE "public.ai-sprint-workshop" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_number text,
  email text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "ai-sprint-workshop_pkey" PRIMARY KEY (id)
);
CREATE TABLE "public.business-pitching" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  college text,
  leader_name text,
  leader_phone text,
  email text,
  member2_name text,
  member3_name text,
  member4_name text,
  member2_phone text,
  member3_phone text,
  member4_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "business-pitching_pkey" PRIMARY KEY (id)
);
CREATE TABLE "public.circuit-debugging"(
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "circuit-debugging_pkey" PRIMARY KEY (id)
);
CREATE TABLE "public.design-for-civil"  (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member2_phone text,
  screenshot_url text,
  CONSTRAINT "design-for-civil_pkey" PRIMARY KEY (id)
);
CREATE TABLE "public.design-for-the-sky"  (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name  text,
  leader_phone text,
  member1_name text,
  member2_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "design-for-the-sky_pkey" PRIMARY KEY (id)
);
CREATE TABLE public."drone-making-workshop" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member1_phone text,
  member2_name text,
  member2_phone text,
  screenshot_url text,
  CONSTRAINT "drone-making-workshop_pkey" PRIMARY KEY (id)
);
CREATE TABLE "public.drone-race" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member2_name text,
  member3_name text,
  member1_phone text,
  member2_phone text,
  member3_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
   CONSTRAINT "drone-race_pkey" PRIMARY KEY (id)
);
CREATE TABLE "public.figma-sdp" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member1_phone text,
  member2_name text,
  member2_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
   CONSTRAINT "figma-sdp_pkey" PRIMARY KEY (id)

);
CREATE TABLE "public.rc-car" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member2_name text,
  member3_name text,
  member1_phone text,
  member2_phone text,
  member3_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
   CONSTRAINT "rc-car_pkey" PRIMARY KEY (id)

);
CREATE TABLE "public.robotics-workshop" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member1_phone text,
  member2_name text,
  member2_phone text,
  screenshot_url text
);
CREATE TABLE "public.web-development" (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  leader_name text,
  leader_phone text,
  member1_name text,
  member1_phone text,
  screenshot_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
   CONSTRAINT "web-development_pkey" PRIMARY KEY (id)

);