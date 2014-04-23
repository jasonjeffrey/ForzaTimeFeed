'use strict';
var http = require('http'),
    port = process.env.PORT || 5000,
    url = require('url'),
    requestData = function (rootRes, path) {
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

        console.log(path);

        req = http.request(options, function (res) {
            var data = '';

            res.setEncoding('utf8');

            console.log('HEADERS: ' + JSON.stringify(res.headers));

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
            'Access-Control-Allow-Headers': 'X-Requested-With'
        });

        if (path.path.indexOf('favicon') === -1) {
            requestData(response, path.path.split('/'));
        }
    });

server.listen(port);

console.log('server listening on port ' + port);




