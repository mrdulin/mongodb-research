// show dbs
printjson(db.adminCommand('listDatabases'));

// use db
db = db.getSiblingDB('mongodb-research');

// show collections
printjson(db.getCollectionNames());
