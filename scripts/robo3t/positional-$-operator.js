db.posts.findOne()

// 给comnents数组中的每个对象添加votes字段
// https://docs.mongodb.com/manual/reference/operator/update/positional-all/#positional-update-all

// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $set: {
//         "comments.$[].votes": NumberInt(0)
//     }
// }, {multi: true})

// 增加第一个评论的投票数量

// db.posts.update({"_id" : ObjectId("5b3b1a6633558083e0c5c8fc")}, {
//     $inc: {
//         'comments.0.votes': NumberInt(1)
//     }
// })

// 但是很多情况下，不预先查询文档就不能知道要修改的数组元素的下标。为了克服这个困难，MongoDB提供了定位操作符"$", 用来定位查询文档已经匹配的数组元素，并进行更新
// 注意，定位符只更新第一个匹配的元素
// 增加zhangshuang的votes投票数量

// db.posts.update({'comments.name': 'zhangshuang'}, {
//     $inc: {
//         'comments.$.votes': NumberInt(1)
//     }
// })
