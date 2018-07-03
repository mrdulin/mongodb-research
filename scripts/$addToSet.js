// db.getCollection('users').insert({username: 'mrdulin', emails: ['novaline@qq.com', '365715693@qq.com']});

db.getCollection('users').find()

// 使用$addToSet可以避免插入重复地址

// db.users.update({username: 'mrdulin'}, {$addToSet: {emails: 'novaline@qq.com'}})

// db.users.update({username: 'mrdulin'}, {$addToSet: {emails: 'novaline@gmail.com'}})

// $addToSet和$each组合起来，可以添加多个不同的值

// db.users.update({username: 'mrdulin'}, {
//     $addToSet: {
//         emails: {
//             $each: ['novaline@php.net', 'novaline@qq.com', '365715693@qq.com', 'novaline@space.com']
//         }
//     }
// })