'use strict';
var http = require('http'),
    port = process.env.PORT || 5000,
    url = require('url'),
    requestData = function (rootRes, path) {
        var req,

            //set cookie header with my cookies for friends list
            options = {
                hostname: 'www.forzamotorsport.net',
                path: '/en-us/leaderboards/',
                headers: {}
            },
            carClass = {
                'd': 1000, 'c': 1001, 'b': 1002, 'a': 1003,
                's': 1004, 'r': 1005, 'p': 1006, 'x': 1007
            };


        if(!path[2]) {
            options.path += 'GetSecondFilter?firstFilter=' + carClass[path[1]] + '&title=Forza5'
        } else if(!path[3]) {
            options.path += 'GetThirdFilter?firstFilter=' + carClass[path[1]] + '&secondFilter=' + path[2] + '&title=Forza5'
        } else {
            options.path += 'GetRows?firstFilter=' + carClass[path[1]] + '&secondFilter=' + path[2] + '&thirdFilter=' + path[3] + '&fourthFilter=-1&sortView=0&rowsShown=10&startIndex=0&title=Forza5'
        }

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

    server = http.createServer(function (request, response) {
        var path = url.parse(request.url);

        response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
        });

        if (path.path.indexOf('favicon') === -1) {
            requestData(response, path.path.split('/'));
        }
    });

server.listen(port);

console.log('server listening on port ' + port);




