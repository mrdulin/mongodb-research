import { Db, Collection, MongoClient, DeleteWriteOpResultObject, InsertWriteOpResult } from 'mongodb';
import * as assert from 'assert';

import { connect, dbname } from '../connecting';
import { benchmark } from '../util';

async function insertData(col: Collection, total: number) {
  try {
    for (let i = 0; i < total; i++) {
      await col.insert({ foo: 'bar', baz: i, z: 10 - i });
    }
    const count = await col.count();
    console.log('count: ', count);
  } catch (err) {
    console.log('insertData: ', err);
  }
}

function main() {
  connect().then(async (mongoClient: MongoClient | null) => {
    if (mongoClient) {
      const db: Db = mongoClient.db(dbname);
      const col: Collection = db.collection('dropAndRemoveBenchmark');
      const total: number = 100 * 1000;
      try {
        await insertData(col, total);
        await benchmark(async () => {
          const filter = { foo: 'bar' };
          const r: DeleteWriteOpResultObject = await col.deleteMany(filter);
          assert.equal(total, r.deletedCount);
        }, 'deleteMany took');

        await insertData(col, total);
        await benchmark(async () => {
          await col.drop();
        }, 'drop took');

        await mongoClient.close();
        console.log('mongo client close successfully');
      } catch (err) {
        console.log('main: ', err);
      }
    }
  });
}

main();
