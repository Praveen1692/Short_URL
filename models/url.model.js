import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const urlsTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),
  shortCode: varchar("code", { length: 15 }),
});
