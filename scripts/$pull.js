db.posts.find()

// 基于特定条件删除元素，而不仅仅是

// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {$pull: {top10: 6}})

// 删除数组中的多个对象

// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $push: {
//         comments: {
//             name: 'dengli',
//             email: 'dengli@qq.com',
//             content: 'ao jiao'
//         }
//     }
// })

// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $push: {
//         comments: {
//             $each: [
//                 {name: 'zhangshuang', email: 'zhangshuang@qq.com', content: 'ao jiao'},
//                 {name: 'zhangjingwen', email: 'zhangjingwen@qq.com', content: 'wen shen'}
//             ]
//         }
//     }
// })

// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $pull: {
//         comments: {
//             name: {
//                 $in: ['dengli', 'zhangjingwen']
//             }
//         }
//     }
// })

