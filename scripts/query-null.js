// 特殊类型的查询

// db.c.find()

// null

// db.c.insert([{y: null}, {y: 1}, {y: 2}])
// db.c.insertOne({x: 1})

// null不仅会匹配某个键的值为null的文档，而且还会匹配不包含这个键的文档

// db.c.find({y: null})

// 如果仅想匹配键值为null的文档，既要检查该键的值是否为null，还要通过$exists条件判定键值已存在

// db.c.find({y: {$in: [null], $exists: true}})

