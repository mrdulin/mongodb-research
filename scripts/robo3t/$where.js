// db.getCollection('fruits').find({})

// db.fruits.insertMany([
//     {apple: 1, banana: 6, peach: 3},
//     {apple: 8, banana: 4, watermelon: 4}
// ])

// 需求：返回两个键具有相同值的文档

// 函数返回true，文档就做为结果集的一部分返回；如果为false，就不返回
// 不是非常必要时，一定要避免使用$where查询，因为它在速度上要比常规查询慢很多。每个文档都要从BSON转换成JS对象，然后通过$where表达式来运行。
// 而且，$where语句不能使用索引，所以只在走投无路时才考虑$where这种用法。先使用常规查询进行过滤，然后再使用$where语句，这样组合使用可以降低性能损失。
// 如果可能的话，使用$where语句前应该先使用索引进行过滤，$where只用于对结果进行进一步过滤。


db.fruits.find({$where: function() {
    for(var current in this) {
        for(var other in this) {
            if(current !== other && this[current] === this[other]) {
                return true
            }
        }
    }
    return false
}})