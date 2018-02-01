'use strict';
const HTTPSession = require("./lib/HTTPSession");
const zlib = require('zlib');

function filter(res) {
    if (/(image|audio|octet-stream|css)/.test(res.contentType)) {
        return true;
    }
    return false;
}

exports.track = function(tcp_tracker) {
    tcp_tracker.on('session', function(tcp_session) {
        var http_session = new HTTPSession(tcp_session);

        http_session.on("http request", function(session) {
            var req = session.request;
            req.path = decodeURIComponent(req.url);
            if (req.headers) {
                req.cookie = req.headers["Cookie"];
                req.host = req.headers["Host"];
            }
            req.url = "http://" + req.host + req.path;
        });

        http_session.on("http request body", function(session, data) {
            var req = session.request;
            req.data = req.data ? Buffer.concat([req.data, data], req.data.length + data.length) : new Buffer(data);
        });

        http_session.on("http response", function(session) {
            var res = session.response;
            res.contentType = res.headers["Content-Type"];
            res.contentEncode = res.headers["Content-Encoding"];
        });

        http_session.on("http response body", function(session, data) {
            var res = session.response;
            if (filter(res)) return;
            res.data = res.data ? Buffer.concat([res.data, data], res.data.length + data.length) : new Buffer(data);
        });

        http_session.on("http response complete", function(session, req, res) {
            if (filter(res)) return;
            console.log("===============================");
            console.log(session.tcp_session.src_name);
            console.log(req.method, req.url);
            if (req.cookie) {
                console.log(req.cookie);
            }
            console.log(res.contentType);
            if (req.body_len > 0) {
                console.log("request:", req.data.toString());
            }
            var text;
            console.log("response:");
            if (/gzip/.test(res.contentEncode)) {
                zlib.gunzip(res.data, function(err, buffer) {
                    text = buffer;
                    if (err) console.log("解码失败", err);
                    else console.log("解码成功");
                    if (!text) {

                    } else if (text.length > 10240) {
                        console.log("-------->", text.length);
                    } else {
                        console.log(text.toString());
                    }
                });
            } else if (res.contentEncode) {
                console.log(res.contentEncode);
            } else {
                text = res.data;
                if (/html/.test(res.contentType)) {

                }
                if (text.length > 10240) {
                    console.log("-------->", text.length);
                } else {
                    console.log(text.toString());
                }
            }
        });
    });
};