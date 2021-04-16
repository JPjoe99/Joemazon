const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ["http://127.0.0.1:5500"];
var corsOptionsDelegate = (request, callback) => {
    var corsOptions;
    console.log(request.header("Origin"));
    if (whitelist.indexOf(request.header("Origin")) !== -1) {
        corsOptions = {
            origin: true
        }
    }
    else {
        corsOptions = {
            origin: false
        }
    }
    callback(null, corsOptions);
}

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);