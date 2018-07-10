// db.getCollection('cappedCollection').find({})

// 创建固定集合，字节大小限制为10000字节，文档数量限制为100
// db.createCollection('cappedCollection', {capped: true, size: 10000, max: 100})

// db.cappedCollection.drop()

// var docs = [];
// 
// for(var i = 0; i < 120; i++) {
//     docs.push({x: i})
// }

// db.cappedCollection.insertMany(docs);