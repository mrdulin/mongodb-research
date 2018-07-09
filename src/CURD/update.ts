import { MongoClient, Db, Collection, InsertWriteOpResult } from 'mongodb';
import * as assert from 'assert';

import { connect, dbname } from '../connecting';

connect().then(async (mongoClient: MongoClient | null) => {
  if (mongoClient) {
    const db: Db = mongoClient.db(dbname);

    const updatesCol: Collection = db.collection('updates');

    const insertManyRes: InsertWriteOpResult = await updatesCol.insertMany([{ a: 1 }, { a: 2 }, { a: 2 }]);
    console.log('insertManyRes.insertedCount: ', insertManyRes.insertedCount);

    const updateOneRes = await updatesCol.updateOne({ a: 1 }, { $set: { b: 1 } });
    console.log('updateOneRes.matchedCount: ', updateOneRes.matchedCount);
    console.log('updateOneRes.modifiedCount: ', updateOneRes.modifiedCount);

    const updateManyRes = await updatesCol.updateMany({ a: 2 }, { $set: { b: 1 } });
    assert.equal(2, updateManyRes.matchedCount);
    assert.equal(2, updateManyRes.modifiedCount);

    // 使用upsert，可以避免竞态问题，更高效，并且是原子性的
    const upsertRes = await updatesCol.updateOne({ a: 3 }, { $set: { b: 1 } }, { upsert: true });
    assert.equal(0, upsertRes.matchedCount);
    assert.equal(1, upsertRes.upsertedCount);

    mongoClient.close();
  }
});
