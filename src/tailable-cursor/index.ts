import {
  MongoClient,
  Db,
  Collection,
  InsertWriteOpResult,
  InsertOneWriteOpResult,
  DeleteWriteOpResultObject,
  Cursor
} from 'mongodb';
import * as assert from 'assert';

import { connect, dbname } from '../connecting';

interface IMainResult {
  col: Collection;
  mongoClient: MongoClient;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function main() {
  return connect().then(
    (mongoClient: MongoClient | null): Promise<IMainResult> => {
      if (!mongoClient) {
        return Promise.reject('mongoClient is not existed');
      }

      const db: Db = mongoClient.db(dbname);
      return db
        .createCollection('cappedCollection', {
          capped: true,
          size: 10 * 1000,
          max: 100
        })
        .then(
          (col: Collection): IMainResult => {
            console.log('create collection successfully');
            return { col, mongoClient };
          }
        );
    }
  );
}

function insertSchedule(col: Collection, ms: number = 2000, count: number = 10) {
  let insertedCount: number = 0;
  let insertCompleted: boolean = true;
  const intervalId = setInterval(() => {
    if (insertCompleted && insertedCount < count) {
      console.log('start insert document schedule');
      insertCompleted = false;
      col
        .insertOne({ random: Math.random() })
        .then((res: InsertOneWriteOpResult) => {
          insertCompleted = true;
          if (res.result.ok) {
            console.log('insert document successfully');
            insertedCount += 1;
          }
        })
        .catch(err => {
          console.log('insert document error: ', err);
          insertCompleted = true;
        });
    } else {
      console.log('stop insert document schedule');
      clearInterval(intervalId);
    }
  }, ms);
}

main()
  .then(async ({ col, mongoClient }: IMainResult) => {
    const cursor: Cursor = col.find({}, { tailable: true });

    insertSchedule(col);

    while (true) {
      if (!(await cursor.hasNext())) {
        console.log('cursor has no next');
        if (cursor.isClosed()) {
          console.log('cursor is closed');
          break;
        }
        await sleep(1000);
      } else {
        while (await cursor.hasNext()) {
          console.log('get next document');
          const doc = await cursor.next();
          console.log('doc: ', doc);
        }
      }
    }
  })
  .catch((err: any) => {
    console.log(err);
  });
