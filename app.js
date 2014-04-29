'use strict';
var http = require('http'),
    port = process.env.PORT || 5000,
    url = require('url'),
    cleanseData = function (rawPath) {
        var pathRegExp = new RegExp('^\/?(.*?)\/?$'),
            cleansedData = pathRegExp.exec(rawPath.path);
        return cleansedData[1].split('/');
    },
    setRequestPath = function (path) {
        var enviroment = {
            'auto': 5,
            'd': 1000, 'c': 1001, 'b': 1002, 'a': 1003,
            's': 1004, 'r': 1005, 'p': 1006, 'x': 1007
        };

        if(!path[1]) {
            return 'GetSecondFilter?firstFilter=' + enviroment[path[0]] + '&title=Forza5'
        } else if(!path[2] && path[0].length === 1) {
            return 'GetThirdFilter?firstFilter=' + enviroment[path[0]]  + '&secondFilter=' + path[1] + '&title=Forza5'
        } else {
            if(!path[2]) {
                path[2] = -1;
            }
            return 'GetRows?firstFilter=' + enviroment[path[0]]  + '&secondFilter=' + path[1] + '&thirdFilter=' + path[2] + '&fourthFilter=-1&sortView=2&rowsShown=10&startIndex=0&title=Forza5'
        }
    },
    requestData = function (rootRes, path) {
        var req,

            options = {
                hostname: 'www.forzamotorsport.net',
                path: '/en-us/leaderboards/',
                headers: {
                    cookie: '__RequestVerificationToken=QX3FH3eSPaA4FTC7d5QFOQmatGpsWpkFiv2kKxV3YF7kbBVypQIpalC5BHloAcVz5vBqlqPF-_jKMK6qjSWGhASMx9w7QJdU6cYuMC6oafs1; locale=en-US; leWebAuth=eyJhbGciOiJIUzI1NiIsImtpZCI6IjEiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOjEsImlzcyI6InVybjp3aW5kb3dzOmxpdmVpZCIsImV4cCI6MTM5NzY1NjI2NiwidWlkIjoiZTRiOGNiMTJiMzVlZWM1MWZmZTUyOTg5MDY4NGI4OWUiLCJhdWQiOiJmb3J6YW1vdG9yc3BvcnQubmV0IiwidXJuOm1pY3Jvc29mdDphcHB1cmkiOiJhcHBpZDovLzAwMDAwMDAwNDQxMEE0NEQiLCJ1cm46bWljcm9zb2Z0OmFwcGlkIjoiMDAwMDAwMDA0NDEwQTQ0RCJ9.EAnDAdWIRLTfUsh858k0Ha_i1-egXK-3FUCk5H-6lts'
                }
            };

        options.path += setRequestPath(path);

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
            requestData(response, cleanseData(path));
        }
    });

server.listen(port);

console.log('server listening on port ' + port);




