import { Sql } from 'postgres';

export type University = {
  id: number;
  name: string;
  country_id: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE universities (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(255) NOT NULL,
abbreviation varchar (10),
      country_name varchar(255) NOT NULL REFERENCES countries(name) ON UPDATE CASCADE
    );
  `;
}

export async function down(sql: Sql) {
  await sql`
DROP TABLE universities
`;
}