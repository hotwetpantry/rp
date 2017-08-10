var labels = [
    { name: 'Newer', flag: 1 },
    { name: 'Two', flag: 2 },
    { name: 'Three', flag: 4 },
    { name: 'Fingers', flag: 8 },
    { name: 'Toys', flag: 16 },
    { name: 'Ugly', flag: 32 },
    { name: 'Normal', flag: 64 },
    { name: 'Nice', flag: 128 },
    { name: 'Beauty', flag: 256 },
    { name: 'Fat', flag: 512 },
    { name: 'Slim', flag: 1024 },
    { name: 'Ass', flag: 2048 },
    { name: 'BigTits', flag: 4096 },
    { name: 'SmallTits', flag: 8192 },
    { name: 'NotEnough', flag: 16384 },
    { name: 'WithoutFace', flag: 32768 },
    { name: 'Hard', flag: 65536 },
    { name: 'FMN', flag: 131072 },
    { name: 'Asian', flag: 262144 },
    { name: 'Black', flag: 524288 },
    { name: 'DarkSkin', flag: 1048576 }
];

angular.module("pantryApp", [])
    .controller("mainController",
        function($http) {
            var context = this;

            this.message = "hello, world!";
            this.currentPage = 1;
            this.pageSize = 10;
            this.girls = [];

            this.loadGirls = function() {
                var ps = context.pageSize;
                var cp = context.currentPage - 1;
                $http.get("/girls/all?take=" + ps + "&skip=" + cp * ps)
                    .then(
                        function(args) {
                            console.log("success", args.data);
                            context.girls = args.data;
                        },
                        function(args) {
                            console.log("error", args);
                        });
            };

            this.nextPage = function() {
                this.currentPage++;
                this.loadGirls();
            };

            this.prevPage = function() {
                this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
                this.loadGirls();
            };

            this.makeCrazy = function(girl) {
                $http.post('/girls/crazy', girl).then(
                    function(args) {
                        console.log("success", args.data);
                        girl.state = args.data.state;
                    },
                    function(args) {
                        console.log("fail", args);
                    });
            };

            this.makeNormal = function(girl) {
                $http.post('/girls/normal', girl).then(
                    function(args) {
                        console.log("success", args.data);
                        girl.state = args.data.state;
                    },
                    function(args) {
                        console.log("fail", args);
                    });
            };

            this.open = function(girl) {
                window.open(girl.link, "_blank");
            };

            this.setRate = function(girl) {
                $http.post('/girls/setrate', girl).then(
                    function(args) {
                        console.log("success", args.data);
                        girl.state = args.data.state;
                    },
                    function(args) {
                        console.log("fail", args);
                    });
            };

            this.loadGirls();
        })
    .controller("randController", function($http) {
        var context = this;

        this.labels = labels;

        this.mask = 0;

        this.applyLabel = function(girl, label) {
            girl.flags = girl.flags ^ label;
        };

        this.isAttached = function(girl, label) {
            return !!(girl.flags & label);
        };

        this.load = function() {

            $http.get("/girls/rand?count=" + context.count + "&tag=" + context.tag)
                .then(
                    function(args) {
                        context.girls = args.data;
                    },
                    function(args) {
                        console.log("error", args)
                    }
                );
        };

        this.open = function(girl) {
            window.open(girl.link, "_blank");
        };

        this.makeCrazy = function(girl) {
            $http.post('/girls/crazy', girl).then(
                function(args) {
                    console.log("success", args.data);
                    girl.state = args.data.state;
                },
                function(args) {
                    console.log("fail", args);
                });
        };

        this.makeNormal = function(girl) {
            $http.post('/girls/normal', girl).then(
                function(args) {
                    console.log("success", args.data);
                    girl.state = args.data.state;
                },
                function(args) {
                    console.log("fail", args);
                });
        };

        this.updateState = function(girl) {
            $http.post('/girls/setrate', girl).then(
                function(args) {
                    console.log("success", args.data);
                },
                function(args) {
                    console.log("fail", args);
                });
        };

        this.setRate = function(girl) {
            $http.post('/girls/setrate', girl).then(
                function(args) {
                    console.log("success", args.data);
                },
                function(args) {
                    console.log("fail", args);
                });
        };
    });