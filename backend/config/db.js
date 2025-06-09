import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import React from "react";

dotenv.config();

const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

// Create a SQL connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

// this sql function is used as a tagged template literal which allows you to write SQL queries safely
