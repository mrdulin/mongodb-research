// db.getCollection('people').find({})

// db.people.insertMany([
//     {name: {first: 'Lin', last: 'Du'}, age: 29},
//     {name: {first: 'Shuang', last: 'Zhang'}, age: 26}
// ])

// 查询整个文档，要求子文档必须精确匹配，这种查询还是与顺序相关的

// db.people.find({name: {first: 'Lin', last: 'Du'}})

// 什么都匹配不到

// db.people.find({name: {last: 'Du', first: 'Lin'}})

// 通常只针对内嵌文档的特定键值进行查询，这时比较好的做法。这样，即便数据模式改变，也不会导致所有查询因为要精确匹配而一下子挂掉。
// 使用点表示法查询内嵌文档的键
// 点表示法也是待插入的文档不能包含"."的原因。将URL作为键保存时经常会遇到此类问题。 

// db.people.find({'name.first': 'Lin', 'name.last': 'Du'})


// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $push: {
//         comments: {
//             name: 'mrdulin',
//             email: 'novaline@qq.com',
//             content: 'hyperledge fabric',
//             votes: 5,
//             date: ISODate()
//         }
//     }
// })

// db.posts.insertMany([
//     {title: 'blog title 2', content: 'content test', comments: [{
//             "name" : "mrdulin",
//             "email" : "novaline@qq.com",
//             "content" : "nice post.",
//             "votes" : 3.0,
//             "date" : ISODate("2018-07-09T04:26:53.082Z")
//         }]},
//     {
//         title: 'blog title 3', content: 'content test', comments: [{
//             "name" : "zhangshuang",
//             "email" : "zhangshuang@qq.com",
//             "content" : "ao jiao",
//             "votes" : 6.0,
//             "date" : ISODate("2018-07-09T04:26:53.082Z")
//         }]
//     }
// ])
// db.posts.find()

// 需求：有博客文章若干，查询出根据mrdulin发表的votes大于等于3的评论的文章

// 内嵌文档匹配，必须要整个文档完全匹配

// db.posts.find({comments: {name: 'mrdulin', votes: {$gte: 3}}})

// 下列查询也不行

// db.posts.find({'comments.name': 'mrdulin', 'comments.votes': {$gte: 3}})

// 正确写法应该是使用$elemMatch

// db.posts.find({comments: {$elemMatch: {name: 'mrdulin', votes: {$gte: 3}}}})
