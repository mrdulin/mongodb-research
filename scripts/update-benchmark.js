db.updateBenchmark.find()

// db.updateBenchmark.insert({x: 1})
// db.updateBenchmark.update({"_id" : ObjectId("5b42d61233558083e0c5c8fe")}, {$set: {x: 1}})

function main() {
    const start = new Date().getTime()
    
    for(var i = 0; i < 10 * 1000; i++) {
        db.updateBenchmark.update({"_id" : ObjectId("5b42d61233558083e0c5c8fe")}, {$inc: {x: 1}})
        db.getLastError()
    }
    
    var timeDiff = new Date().getTime() - start;
    print('Updates took: ' + timeDiff + 'ms');
}

// main()