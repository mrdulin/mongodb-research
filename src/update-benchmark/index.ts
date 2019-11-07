import { Db, Collection, MongoClient } from 'mongodb';

import { connect, dbname } from '../connecting';
import { benchmark } from '../util';

async function inc(col: Collection, total: number) {
  try {
    for (let i: number = 0; i < total; i++) {
      await col.update({ type: 'inc' }, { $inc: { x: 1 } });
    }
  } catch (err) {
    console.log('inc: ', err);
  }
}

async function push(col: Collection, total: number) {
  try {
    for (let i: number = 0; i < total; i++) {
      await col.update({ type: 'push' }, { $push: { x: 1 } });
    }
  } catch (err) {
    console.log('push: ', err);
  }
}

function main() {
  connect().then(async (mongoClient: MongoClient | null) => {
    if (mongoClient) {
      const db: Db = mongoClient.db(dbname);
      const total: number = 10 * 1000;
      try {
        await db.dropCollection('updateBenchmark');
        const col: Collection = db.collection('updateBenchmark');
        await col.insert([{ type: 'inc', x: 1 }, { type: 'push', x: [] }]);

        await benchmark(async () => await inc(col, total), '$inc update tooks: ');
        await benchmark(async () => await push(col, total), '$push update tooks: ');

        await mongoClient.close();
        console.log('mongo client close successfully');
      } catch (err) {
        console.log('main: ', err);
      }
    }
  });
}

main();
