// db.getCollection('usersCompoundIndex').find({})

// var docs = [];
// for(var i = 0; i < 1000 * 1000; i++) {
//     docs.push({i: i, username: 'user' + i, age: Math.floor(Math.random() * 120), created: new Date()})
// }
// db.usersCompoundIndex.insertMany(docs)

// db.usersCompoundIndex.count()

// 建立复合索引, age字段严格升序排列，age相同的条目按照username升序排列。
// db.usersCompoundIndex.createIndex({age: 1, username: 1})

// db.usersCompoundIndex.find({age: 21}).sort({username: -1})
// .explain('allPlansExecution');

// $nin操作符总是进行全表扫描， totalDocsExamined总是1000000
// db.usersCompoundIndex.find({age: {$nin: [21, 22, 23, 24, 25, 26]}}).explain('allPlansExecution');

// 使用{age: 1, username: 1}索引查询特定年龄和用户名范围内的文档，可以精确指定索引边界
// totalDocsExamined为2778，executionTimeMillis为13ms, totalKeysExamined是2778
// 这个查询直接定位到age为47的索引条目，然后在其中搜索用户名介于user5和user8的条目

// db.usersCompoundIndex.dropIndex('username_1_age_1')
// db.usersCompoundIndex.createIndex({age: 1, username: 1})
// db.usersCompoundIndex.find({age: 47, username: {$gt: 'user5', $lt: 'user8'}}).explain('allPlansExecution');

// db.usersCompoundIndex.getIndexes()
// db.usersCompoundIndex.dropIndex('age_1_username_1')
// db.usersCompoundIndex.createIndex({username: 1, age: 1})

// 反过来，假如使用{username: 1, age: 1}索引, executionTimeMillis是746ms，totalDocsExamined是2778, totalKeysExamined是333333
// 这样就改变了查询计划，查询必须先找到介于user5和user8之间的所有用户，然后再挑选age等于47的用户
// db.usersCompoundIndex.find({age: 47, username: {$gt: 'user5', $lt: 'user8'}}).explain('allPlansExecution');