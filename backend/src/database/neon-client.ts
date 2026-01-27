import { Client } from '@neondatabase/serverless';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export default client;
