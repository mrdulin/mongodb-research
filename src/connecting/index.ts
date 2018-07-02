import { MongoClient } from 'mongodb';

const dbname: string = 'mongodb-research';

async function connect(): Promise<MongoClient | null> {
  const uri: string = `mongodb://localhost:27017/`;
  try {
    const mongoClient: MongoClient = await MongoClient.connect(
      uri,
      { useNewUrlParser: true }
    );
    console.log('connected correctly to server');
    return mongoClient;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { connect, dbname };
