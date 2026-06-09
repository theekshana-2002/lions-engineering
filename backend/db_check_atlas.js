const { MongoClient } = require('mongodb');

async function check() {
  const uri = "mongodb+srv://raxwotechnology_db_user:GKtKNcEUu62EJ5bw@cluster0.wknldyv.mongodb.net/raxwo_tool_rent?appName=Cluster0";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('raxwo_tool_rent');
    const latest = await db.collection('bookings').find().sort({ createdAt: -1 }).limit(5).toArray();
    
    console.log('--- LATEST 5 BOOKINGS ---');
    latest.forEach(b => {
      console.log(`ID: ${b.bookingId} | Client: ${b.clientName} | Items: ${b.items?.length || 0} | Status: ${b.status}`);
      if (b.items) {
        b.items.forEach(it => console.log(`  - Tool: ${it.toolNumber}`));
      }
    });
  } finally {
    await client.close();
  }
}

check();
