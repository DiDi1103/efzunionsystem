var xml2js = require('xml2js');
var http = require('http');

var builder = new xml2js.Builder();
var parser = new xml2js.Parser();

var xml = '<?xml version="1.0" encoding="utf-8" ?><soap:Envelope><soap:Body><ValidateResponse><ValidateResult>OU=8班,OU=2016届,OU=学生,OU=组织架构,DC=hsefz,DC=com</ValidateResult></ValidateResponse></soap:Body></soap:Envelope>';

function parseXML(xml, callback) {
    parser.parseString(xml, function(err, result) {
        callback(err, result['soap:Envelope']['soap:Body'][0].ValidateResponse[0].ValidateResult);
    });
}

function getInfo(xml, callback) {
    parseXML(xml, function(err, res) {
        res = String(res);
        if (res == '') {
            callback(['Password Error']);
            return;
        }
        var arr = res.split(','), temp, value;
        temp = arr[0].split('=');
        value = temp[1].substring(0, temp[1].length - 1);
        userClass = value;
        temp = arr[1].split('=');
        value = temp[1].substring(0, temp[1].length - 1);
        userYear = value;
        var data = {
            class: userClass,
            year: userYear
        };
        callback(err, data);
        arr = temp = value = userClass = userYear = data = null;
    });
}

function auth(email, password, callback) {
   /* var data = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><Validate xmlns="http://tempuri.org/"><userAccount>' + email + '</userAccount><userPWD>' + password + '</userPWD></Validate></soap:Body></soap:Envelope>', body = '';
    var opt = {
        method: 'POST',
        host: 'www.hsdefz.com',
        port: 80,
        path: '/ADUser/ADUser.asmx',
        headers: {
            "Content-Type": 'text/xml; charset=utf-8',
            "Content-Length": data.length
        }
    };
    var req = http.request(opt, function(res) {
        res.on('data', function(d) {
            body += d;
        }).on('end', function() {
            getInfo(body, function(err, res) {
                callback(err, res);
                data = opt = body = null;
            });
        });
    }).on('error', function(e) {
        callback(e.message, null);;
    });
    req.write(data);
    req.end(); */
    callback(null, {});
}

exports.auth = auth;

