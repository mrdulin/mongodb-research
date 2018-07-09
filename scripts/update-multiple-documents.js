db.getCollection('updates').find({})

// 默认情况下，更新只能对符合匹配条件的第一个文档执行操作。要是有多个文档符合条件，只有第一个文档会被更新，其他文档不会发生变化。要更新所有匹配的文档，可以将update的第4个参数设置为true

// db.updates.update({a:2}, {$set: {b: 100}}, false, true)

// update第4个参数的默认值是false

// db.updates.update({a:2}, {$set: {b: 200}}, false, false)