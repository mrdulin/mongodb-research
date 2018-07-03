# 删除速度

实验数据：

```bash
☁  mongodb-research [master] ⚡  ./node_modules/.bin/ts-node src/drop-and-remove-benchmark/remove.ts
connected correctly to server
(node:77404) DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
count:  100000
deleteMany took: 690ms
count:  100000
drop took: 12ms
mongo client close successfully
```

结论： deleteMany 的速度要慢于 drop 的速度
