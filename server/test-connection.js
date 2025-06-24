const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://adminBolt:5lP0LkvqXmK6NJasIw87@postgresql-b9be9228-o763a27ec.database.cloud.ovh.net:20184/LoopImmo',
  ssl: {
    rejectUnauthorized: false
  }
});

async function testConnection() {
  try {
    await client.connect();
    console.log('✅ Connected!');
    
    const res = await client.query('SELECT version()');
    console.log('PostgreSQL version:', res.rows[0].version);
    
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

testConnection();