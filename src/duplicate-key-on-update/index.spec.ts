import { expect } from 'chai';
import { MongoClient, Collection, Db, ObjectID, ReplaceWriteOpResult } from 'mongodb';

import { connect, dbname } from '../connecting';

let mongoClient: MongoClient | null;
let db: Db;
let col: Collection;

async function initData(collection: Collection) {
  try {
    await collection.deleteMany({ name: 'joe' });
    await collection.insertMany([{ name: 'joe', age: 65 }, { name: 'joe', age: 20 }, { name: 'joe', age: 49 }]);
  } catch (err) {
    console.log('initData: ', err);
  }
}

before(async () => {
  mongoClient = await connect();
  if (mongoClient) {
    db = mongoClient.db(dbname);
    col = db.collection('duplicateKeyOnUpdate');
    await initData(col);
  }
});

after(() => {
  if (mongoClient) {
    mongoClient.close();
  }
});

describe('duplicate-key-on-update test suites', () => {
  it('t-1', async () => {
    const doc = await col.findOne({ name: 'joe', age: 20 });
    console.log('doc: ', doc, typeof doc._id);
    expect(doc.name).eql('joe');
    doc.age++;
    expect(doc.age).eql(21);

    // 报错: After applying the update, the (immutable) field '_id' was found to have been altered to _id
    // 这里用doc整个文档去替换update找到的第一个文档，_id是不可变的不能被更新
    const updateResult = await col.update({ name: 'joe' }, doc);
  });

  it('t-2', async () => {
    const doc = await col.findOne({ name: 'joe', age: 20 });
    expect(doc.name).eql('joe');
    doc.age++;
    expect(doc.age).eql(21);

    // MongoError: the update operation document must contain atomic operators.
    // https://stackoverflow.com/questions/38883285/error-the-update-operation-document-must-contain-atomic-operators-when-running
    // const updateResult = await col.updateOne({ _id: doc._id }, doc);
    const replaceResult: ReplaceWriteOpResult = await col.replaceOne({ _id: doc._id }, doc);
    expect(replaceResult.modifiedCount).eql(1);
    expect(replaceResult.matchedCount).eql(1);
  });
});
