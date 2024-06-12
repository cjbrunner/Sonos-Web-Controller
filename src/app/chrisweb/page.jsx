import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import test from "node:test";

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

await client.connect();

const db = drizzle(client);

export const testTable = pgTable('test', {
  title: text('title').notNull(),
  data: text('data'),
});

const result = await db.select().from(testTable)
export default function Page() {
  return (
    <div>
      <h1>Future home of the ChrisWeb archive</h1>
      { result.map((r) =>
        <div key={r.title}>
          <h2>{r.title}</h2>
          <h3>{r.data}</h3>
        </div>
      )}
    </div>
  )
}