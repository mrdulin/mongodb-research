// 有时并不需要将文档中的所有键/值对都返回。遇到这种情况，可以通过find(或者findOne)的第二个参数来指定想要的键。这样做即会节省传输的数据量，又能节省客户端解码文档的时间和内存消耗。
// 默认情况下，"_id"这个键总是被返回，即便没有指定要返回这个键

// db.getCollection('posts').find({}, {title: 1})

// 也可以用第二个参数来剔除查询结果中的某些键/值对。

// db.posts.find({}, {title: 1, _id: 0})

// db.users.insertMany([
//     {username: 'zhangshuang', age: 26},
//     {username: 'zhangjingwen', age: 30}
// ])

// db.users.find()

// db.users.update({username: 'mrdulin'}, {$set: {age: 29}})

// 条件查询 - 范围查询
// 找出age字段大于等于27、小于等于30的所有文档

// db.users.find({age: {$gte: 27, $lte: 30}})

// 对于文档的键值不等于某个特定值的情况，就要使用另外一种条件操作符"$ne"了，它表示“不相等”
// "$ne"能用于所有类型的数据

// db.users.find({username: {$ne: 'mrdulin'}})

// 如果一个键需要与多个值进行匹配的话，就要用"$in"操作符，再加一个条件数组

// db.users.find({age: {$in: [26,27,28,29]}})

// 与$in相对的是$nin，$nin将返回与数组中所有条件都不匹配的文档

// db.users.find({age: {$nin: [30, 29]}})

// $in 能对单个键做OR查询，但是要是想找到age为29或者username为zhangshuang的文档，应该使用"$or"

// db.users.find({$or: [{age: 29}, {username: 'zhangshuang'}]})