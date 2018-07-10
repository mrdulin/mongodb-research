// db.getCollection('testCursor').find({})

// for(var i = 0; i < 100; i++) {
//     db.testCursor.insert({x: i});
// }

// var cursor = db.testCursor.find();

// while(cursor.hasNext()) {
//     var obj = cursor.next();
//     printjson(obj);
// }

// 游标类还实现了JavaScript的迭代器接口，所以可以在forEach循环中使用

// cursor.forEach((x) => {
//     printjson(x);
// })

// limit、skip和sort

// limit, 限制匹配结果数量
// db.testCursor.find().limit(3)

// skip, 略过前三个匹配的文档，返回余下的文档。略过过多的结果会导致性能问题。
// db.testCursor.find().skip(3)

// sort, -1降序，1升序
// db.testCursor.find().sort({x: -1});


