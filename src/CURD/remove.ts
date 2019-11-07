import { MongoClient, Db, Collection, InsertWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';
import * as assert from 'assert';

import { connect, dbname } from '../connecting';

connect().then(async (mongoClient: MongoClient | null) => {
  if (mongoClient) {
    const db: Db = mongoClient.db(dbname);

    const col: Collection = db.collection('removes');

    try {
      const insertManyRes: InsertWriteOpResult<any> = await col.insertMany([{ a: 1 }, { a: 2 }, { a: 2 }]);
      assert.equal(3, insertManyRes.insertedCount);

      const deleteOneRes: DeleteWriteOpResultObject = await col.deleteOne({ a: 1 });
      assert.equal(1, deleteOneRes.deletedCount);

      const deleteManyRes: DeleteWriteOpResultObject = await col.deleteMany({ a: 2 });
      assert.equal(2, deleteManyRes.deletedCount);
    } catch (err) {
      console.log(err);
    }

    mongoClient.close();
  }
});
