// db.getCollection('a').find({})

// var users = [];
// for(var i = 0; i < 100 * 1000; i ++) {
//     users.push({
//        name: 'user' + i,
//        loc: {
//            ip: '1.2.3.' + i,
//            city: 'city' + i,
//            state: 'NY'
//        }
//     });
// }
// 
// db.a.insertMany(users);

// 全文扫描
// totalDocsExamined=100000, executionTimeMillis=49, totalKeysExamined=0
// db.a.find({loc: {ip: '1.2.3.101', city: 'city101', state: 'NY'}}).explain('allPlansExecution')

// 嵌套文档本身("loc")建立索引
// db.a.createIndex({loc: 1})

// 只有在进行与子文档字段顺序完全匹配的子文档查询时，查询优化器才会使用'loc'上的索引
// totalDocsExamined=1, totalKeysExamined=1, executionTimeMillis=0
// db.a.find({loc: {ip: '1.2.3.101', city: 'city101', state: 'NY'}}).explain('allPlansExecution')

// 无法对下面的查询使用索引
// db.a.find({'loc.city': 'city101'}).explain('allPlansExecution')

// db.a.getIndexes()

// 要优化db.a.find({'loc.city': 'city101'})查询，需要对嵌套文档的某个字段("loc.city")建立索引
// db.a.createIndex({'loc.city': 1})

// 优化后，再次查询，totalDocsExamined=1，totalKeysExamined=1,executionTimeMillis=0
// db.a.find({'loc.city': 'city101'}).explain('allPlansExecution')


