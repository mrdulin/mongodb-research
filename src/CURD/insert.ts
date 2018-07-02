import { Db, MongoClient, InsertOneWriteOpResult, InsertWriteOpResult } from 'mongodb';

import { connect, dbname } from '../connecting';

connect().then(async (mongoClient: MongoClient | null) => {
  if (mongoClient) {
    const db: Db = mongoClient.db(dbname);
    // insert a single document
    const ro: InsertOneWriteOpResult = await db.collection('inserts').insertOne({ a: 1 });
    console.log('ro.insertedCount: ', ro.insertedCount);

    // insert multiple documents
    const rm: InsertWriteOpResult = await db.collection('inserts').insertMany([{ a: 2 }, { a: 3 }]);
    console.log('rm.insertedCount:', rm.insertedCount);

    try {
      await mongoClient.close();
      console.log('mongo client close successfully');
    } catch (err) {
      console.log('mongo client close failed');
    }
  }
});
