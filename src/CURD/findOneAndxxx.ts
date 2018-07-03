import { MongoClient, Db, Collection, InsertWriteOpResult, DeleteWriteOpResultObject } from 'mongodb';
import * as assert from 'assert';

import { connect, dbname } from '../connecting';

connect().then(async (mongoClient: MongoClient | null) => {
  if (mongoClient) {
    const db: Db = mongoClient.db(dbname);

    const col: Collection = db.collection('findAndModify');

    try {
      const insertResult = await col.insertMany([{ a: 1 }, { a: 2 }, { a: 2 }]);
      assert.equal(3, insertResult.result.n);

      const findOneAndUpdateResult = await col.findOneAndUpdate(
        { a: 1 },
        { $set: { b: 1 } },
        {
          returnOriginal: false,
          sort: [['a', 1]],
          upsert: true
        }
      );
      console.log('findOneAndUpdateResult.value: ', findOneAndUpdateResult.value);
      assert.equal(1, findOneAndUpdateResult.value.b);

      const findOneAndDeleteResult = await col.findOneAndDelete({ a: 2 });
      assert.ok(findOneAndDeleteResult.value.b == null);

      mongoClient.close();
    } catch (err) {
      console.log(err);
    }
  }
});
