import { SQLDatabase } from "encore.dev/storage/sqldb";

// Initialize the database with correct configuration
export const doctorDB = new SQLDatabase("doctor", {
  migrations: "./migrations"
});
