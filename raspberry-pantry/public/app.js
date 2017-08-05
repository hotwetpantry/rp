angular.module("pantryApp",[])
.controller("mainController",
function($http){
    var context = this;

    this.message = "hello, world!";
    this.currentPage = 1;
    this.pageSize = 10;
    this.girls = [];

    this.loadGirls = function(){
        var ps = context.pageSize;
        var cp = context.currentPage-1;
        $http.get("/girls/all?take="+ps+"&skip="+cp*ps)
        .then(
        function(args){
            console.log("success", args.data);
            context.girls = args.data;
        },function(args){
            console.log("error", args);
        });
    };

    this.nextPage = function(){
        this.currentPage++;
        this.loadGirls();
    };

    this.prevPage = function(){
        this.currentPage = this.currentPage>1?this.currentPage-1:1; 
        this.loadGirls();
    };

    this.makeCrazy = function(girl){
        $http.post('/girls/crazy', girl).then(
            function(args){
                console.log("success", args.data);
                girl.state = args.data.state;
            },
            function(args){
                console.log("fail", args);
            });
    };

    this.makeNormal = function(girl){
        $http.post('/girls/normal', girl).then(
            function(args){
                console.log("success", args.data);
                girl.state = args.data.state;
            },
            function(args){
                console.log("fail", args);
            });
    };

    this.open = function(girl){
        window.open(girl.link, "_blank");
    };

    this.loadGirls();
})
.controller("randController",function($http){
    var context = this;

    this.load = function(){

        $http.get("/girls/rand?count="+context.count+"&tag="+context.tag)
        .then(
            function(args){
                context.girls = args.data;
            },
            function(args){
                console.log("error",args)
            }
        );
    };

    this.open = function(girl){
        window.open(girl.link, "_blank");
    };
    
    this.makeCrazy = function(girl){
        $http.post('/girls/crazy', girl).then(
            function(args){
                console.log("success", args.data);
                girl.state = args.data.state;
            },
            function(args){
                console.log("fail", args);
            });
    };

    this.makeNormal = function(girl){
        $http.post('/girls/normal', girl).then(
            function(args){
                console.log("success", args.data);
                girl.state = args.data.state;
            },
            function(args){
                console.log("fail", args);
            });
    };
});