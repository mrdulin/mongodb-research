db.posts.find()

// 从数组末尾删除一个元素

// db.posts.update({_id: ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $pop: {
//         top10: 1
//     }
// })

// 从数组头部删除一个元素

// db.posts.update({_id: ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $pop: {
//         top10: -1
//     }
// })