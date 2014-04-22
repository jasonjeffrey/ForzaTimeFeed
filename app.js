'use strict';
var http = require('http'),
    requestData = function (rootRes) {
        var req,
            options = {
                hostname: 'www.forzamotorsport.net',
                path: '/en-us/leaderboards/GetFirstFilter?firstFilter=1001&title=Forza5',
                headers: {}
            },
            carClass = {
                'd': 1000, 'c': 1001, 'b': 1002, 'a': 1003,
                's': 1004, 'r': 1005, 'p': 1006, 'x': 1007
            };

        req = http.request(options, function (res) {
            var data = '';
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                rootRes.end(data);
            });
        });

        req.on('error', function (e) {
            console.log('problem with request: ' + e.message);
        });

        req.end();
    },

    server = http.createServer(function (req, res) {
        //read request header for path
        //pass path to the function for track etc.
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With'
        });
        requestData(res);
    });

server.listen('8000');

console.log('server listening on port 8000');




