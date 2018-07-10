// db.getCollection('posts').insert({title: 'A blog post', content: 'content test'})

db.getCollection('posts').find({});

// db.posts.update({_id: ObjectId('5b3b1a6633558083e0c5c8fc')}, {
//     '$push': {
//         comments: {
//             name: 'mrdulin',
//             email: 'novaline@qq.com',
//             content: 'nice post.'
//         }
//     }
// });

// $push配合$each使用，可以一次添加多个值
// db.posts.update({_id: ObjectId('5b3b1a6633558083e0c5c8fc')}, {
//     '$push': {
//         hourly: {
//             '$each': [562.776, 562.790, 559.123]
//         }
//     }
// })

// 如果希望数组的最大长度是固定的，那么可以将$slice和$push组合一起使用
// 这个例子会限制数组只包含最后加入的10个元素。$slice的值必须是负整数

// db.posts.update({_id: ObjectId('5b3b1a6633558083e0c5c8fc')}, {
//     $push: {
//         top10: {
//             $each: [1,2,3,4,5,6,7,8,9,10,11],
//             $slice: -10
//         }
//     }
// });

// db.posts.update({_id: ObjectId('5b3b1a6633558083e0c5c8fc')}, {
//     $push: {
//         top10: {
//             $each: [12, 13],
//             $slice: -10,
//             $sort: 1
//         }
//     }
// });
