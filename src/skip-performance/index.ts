import { MongoClient, Db, Collection, InsertWriteOpResult, DeleteWriteOpResultObject, Cursor } from 'mongodb';
import * as assert from 'assert';

import { connect, dbname } from '../connecting';
import { EventEmitter } from 'events';

const eventEmitter = new EventEmitter();

interface IMainResult {
  col: Collection<any>;
  mongoClient: MongoClient;
}

function initData(col: Collection): Promise<InsertWriteOpResult> {
  const docs = [];
  for (let i = 0; i < 1000; i++) {
    docs.push({ x: i });
  }

  return col.insertMany(docs);
}

function next(col: Collection<any>, page: number = 1, pageSize: number = 100): Promise<any> {
  const skipNum = (page - 1) * pageSize;
  return col
    .find()
    .skip(skipNum)
    .limit(pageSize)
    .toArray();
}

function main() {
  return connect().then(
    (mongoClient: MongoClient | null): Promise<IMainResult> => {
      if (!mongoClient) {
        return Promise.reject('mongoClient is null');
      }
      const db: Db = mongoClient.db(dbname);
      return db
        .collection('testCursor')
        .drop()
        .then(() => {
          const col: Collection = db.collection('testCursor');
          return initData(col).then((): IMainResult => ({ col, mongoClient }));
        });
    }
  );
}

main()
  .then(({ col, mongoClient }: IMainResult) => {
    let page: number = 0;
    const delay: number = 2000;
    let docs: any[] = [];
    let hasMore: boolean = true;
    const nextPageEvent: string = 'nextPage';

    const intervalId = setInterval(() => {
      if (hasMore) {
        eventEmitter.emit(nextPageEvent);
      } else {
        eventEmitter.removeAllListeners(nextPageEvent);
        clearInterval(intervalId);
        console.log('docs total count: ', docs.length);
        mongoClient.close();
      }
    }, delay);

    eventEmitter.on(nextPageEvent, () => {
      if (hasMore) {
        page += 1;
        console.log('next page');
        next(col, page).then((datas: any[]) => {
          console.log('datas count: ', datas.length);
          hasMore = datas.length > 0;
          docs = docs.concat(datas);
        });
      }
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
