var request = require('request');

module.exports = {
    ajaxRequest: function(url, callback) {
        var opts = { url: url, method: "GET" };

        request(opts, function(error, response, body) {
            return callback(body);
        });
    },

    jsonpRequest: function(url, callback) {
        var opts = { 
            url: url,
            method: "GET"
        };

        request(opts, function(error, response, body) {
            return callback(JSON.parse(body));
        });
    },

    postRequest: function(url, data, callback) {
        console.log(data);
        var opts = { url: url, form: data, method: "POST", dataType: "text" };

        request(opts, function(error, response, body) {

            return callback(body);
        });
    },

    inArray: function(needle, haystack) {
        return haystack.indexOf(needle);
    }
};
