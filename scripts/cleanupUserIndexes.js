import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: 'localhost',
  user: process.env.db_username,
  password: process.env.db_password,
  database: process.env.db_name,
};

async function cleanupIndexes() {
  const connection = await mysql.createConnection(dbConfig);
  const [indexes] = await connection.execute('SHOW INDEX FROM Users');

  // Find all indexes on the email column except the first one
  const emailIndexes = indexes.filter(idx => idx.Column_name === 'email');
  // Keep only the first index, drop the rest
  const indexesToDrop = emailIndexes.slice(1).map(idx => idx.Key_name);

  for (const indexName of indexesToDrop) {
    console.log(`Dropping index: ${indexName}`);
     await connection.execute(`DROP INDEX \`${indexName}\` ON Users`);
  }

  await connection.end();
  console.log('Cleanup complete.');
}

cleanupIndexes().catch(err => {
  console.error('Error cleaning up indexes:', err);
});
