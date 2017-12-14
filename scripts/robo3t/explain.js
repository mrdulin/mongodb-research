// https://docs.mongodb.com/v3.6/reference/method/cursor.explain/index.html

// db.testCursor.drop();

// var docs = [];
// for(var i = 0; i < 1000 * 1000; i++) {
//     docs.push({i: i, username: 'user' + i, age: Math.floor(Math.random() * 120), created: new Date()})
// }
// db.testCursor.insertMany(docs)
//
// db.testCursor.count();

// https://docs.mongodb.com/v3.6/reference/explain-results/#explain.executionStats.totalDocsExamined
// explain.executionStats.totalDocsExamined 是MongoDB在完成这个查询的过程中扫描的文档总数。可以看到，这个集合中的每个文档都被扫描过了。

// https://docs.mongodb.com/v3.6/reference/explain-results/#explain.executionStats.executionTimeMillis
// explain.executionStats.executionTimeMillis 显示的是这个查询耗费的毫秒数
// 下列查询executionTimeMillis为404ms

// db.getCollection('testCursor').find({username: 'user101'}).explain('allPlansExecution')

// 由于不知道集合里的username字段是唯一的，MongoDB不得不查看集合中的每个文档。为了优化查询，将查询结果限制为1，这样MongoDB在找到一个文档之后就会停止了
// 下列查询，totalDocsExamined为102，executionTimeMillis为0ms
// 但这个方案是不现实的，如果要查找user999999，仍然不得不遍历整个集合，而且随着用户的增加，查询会越来越慢

// db.testCursor.find({username: 'user101'}).limit(1).explain('allPlansExecution');

// 对于此类查询，索引是一个非常好的解决方案：索引可以根据给定的字段组织数据，让MongoDB能够非常快地找到目标文档。
// 在username字段上创建一个索引:
// db.testCursor.ensureIndex({username: 1})
// 创建完索引之后，再次执行最初的查询
// totalDocsExamined为1，executionTimeMillis为0ms
// db.getCollection('testCursor').find({username: 'user101'}).explain('allPlansExecution')
// 对于任意的username的查询，几乎都是瞬间完成
// db.testCursor.find({username: 'user999999'}).explain('allPlansExecution')
