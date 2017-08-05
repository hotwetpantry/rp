var express = require('express');
var fs = require('fs');
var router = express.Router();

function getRandN(arr, count){
    var min = 0;
    var max = arr.length;   

    var getRand = function(){
        var rand = Math.random()* 10000000;
        return (rand-rand%1)%max;
    };
    
    var tmp = null;
    for(var i=0;i<arr.length;i++)
    {
        var j = getRand();
        cur=arr[i];
        arr[i]=arr[j];
        arr[j]=cur;  
    }

    var n = max < count?max:count;
    var result = arr.slice(0,n);
    return result;
}

router.get("/reset", function(req,res, next){
    fs.readFile('girls.json','utf8',function(err, data){
        if(!!err){
            res.send("error!");
        }else{
            var girls = JSON.parse(data);
            var db = req.app.get("girlsDb");
            db.insert(girls);
            res.json({total:girls.length});
        }
    });
});

router.get("/import", function(req,res, next){
    fs.readFile('import.json','utf8',function(err, data){
        if(!!err){
            res.send("error!");
        }else{
            var girls = JSON.parse(data);
            var db = req.app.get("girlsDb");
            db.insert(girls);
            res.json({total:girls.length});
        }
    });
});

router.get("/normalize", function(req,res, next){
    fs.readFile('normalized.json','utf8',function(err, data){
        if(!!err){
            res.send("error!");
        }else{
            var girls = JSON.parse(data);
            var db = req.app.get("girlsDb");
            db.insert(girls);
            res.json({total:girls.length});
        }
    });
});

router.get('/all', function(req, res, next) {
    var db = req.app.get("girlsDb");
    var girls = db.getAllData();
    var take = req.query.take;
    var skip = req.query.skip;
    girls = girls.splice(skip,take);
    res.json(girls);
});

var dbUpdate = function(req, res,entity){
    var db = req.app.get("girlsDb");
    db.find({link:entity.link}, function(err, docs){
        if(!!err){
            res.send("error!");
        }else{
            db.update(docs[0],entity);
            res.json(entity);
        }    
    });
};

router.post("/crazy",function(req, res, next){
    var crazyGirl = req.body;
    crazyGirl.state = "crazy";
    dbUpdate(req, res,crazyGirl);
});

router.post("/normal",function(req, res, next){
    var normalGirl = req.body;
    normalGirl.state = "normal";
    dbUpdate(req, res,normalGirl);
});

router.get('/rand',function(req,res,next) {
    var count = req.query.count;

    var db=req.app.get("girlsDb");
    var cb = function(err,data){
        if(!!err){
            res.send("error!");
        }else{
            if(!count || count == 'undefined')
                count = data.length;
            console.log("count: ");
            console.log(count);
            var result = getRandN(data, count); 
            res.json(result);
        }
    };

    var tag = req.query.tag;
    if(tag=='all' || tag=='undefined'){
        var girls = db.getAllData();
        cb(null, girls);
    }else{
        db.find({state:tag},cb);
    }
});

module.exports = router;