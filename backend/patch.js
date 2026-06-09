const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://raxwotechnology_db_user:GKtKNcEUu62EJ5bw@cluster0.wknldyv.mongodb.net/raxwo_tool_rent?appName=Cluster0')
  .then(async () => {
    const db = mongoose.connection.db;
    const accs = await db.collection('accessories').find().toArray();
    let counter = 100;
    for (const acc of accs) {
      if (!acc.number) {
        const gen = 'ACC-' + counter++;
        await db.collection('accessories').updateOne({ _id: acc._id }, { $set: { number: gen } });
        console.log(`Patched ${acc.name} to ${gen}`);
      }
    }
    console.log('Done!');
    process.exit();
  });
