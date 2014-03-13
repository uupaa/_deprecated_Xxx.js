new Test().add([
        testXxx,
    ]).run().worker(function(err, test) {
        if (!err && typeof Xxx_ !== "undefined") {
            var name = Test.swap(Xxx, Xxx_);

            new Test(test).run(function(err, test) {
                Test.undo(name);
            });
        }
    });

function testXxx(next) {

    if (true) {
        console.log("testXxx ok");
        next && next.pass();
    } else {
        console.log("testXxx ng");
        next && next.miss();
    }
}

