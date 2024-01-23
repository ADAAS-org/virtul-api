"use strict";
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var params_iterator_1 = require("./params.iterator");
var ParamsParser = /** @class */ (function () {
    function ParamsParser() {
    }
    ParamsParser.prototype.extract = function (text, customConfig) {
        var dom = new jsdom_1.JSDOM(text);
        var document = dom.window.document;
        var spans = Array.from(document.querySelectorAll('span'));
        return new params_iterator_1.ParamsIterator(spans);
    };
    ParamsParser.prototype.getJSON = function (value) {
        if (value === void 0) { value = ''; }
        var parsingString = value;
        // TODO FIX when time is come
        var used = [];
        var dom = new jsdom_1.JSDOM(value);
        var document = dom.window.document;
        var spans = document.querySelectorAll("span.request-param-hider");
        var i = 0;
        spans.forEach(function (span) {
            var randKey = Math.random();
            used.push({
                key: randKey,
                span: new params_iterator_1.ParamIterable(span, i)
            });
            i++;
            parsingString = parsingString.replace(span.outerHTML, randKey
            // JSON.stringify(span.getAttribute("id")).replace(/"/gi, '\\"')
            );
        });
        // Add double quotes to property names
        var jsonString = parsingString.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
        // Replace single quotes with double quotes for string values
        var jsonLikeString = jsonString.replace(/'([^']+)'(:\s*[^',}\]]+)/g, '"$1"$2');
        var parsed = JSON.parse(jsonLikeString);
        return {
            parsed: parsed,
            replacement: used
        };
    };
    // GET PATH TO TARGET VALUE
    ParamsParser.prototype.getPropertyPath = function (obj, targetValue, currentPath) {
        if (currentPath === void 0) { currentPath = ''; }
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (String(obj[prop]) === String(targetValue)) {
                    return currentPath + prop;
                }
                else if (typeof obj[prop] === 'object') {
                    var nestedPath = this.getPropertyPath(obj[prop], targetValue, currentPath + prop + '.');
                    if (nestedPath) {
                        return nestedPath;
                    }
                }
            }
        }
        return null;
    };
    return ParamsParser;
}());
exports.ParamsParser = ParamsParser;
//# sourceMappingURL=params.parser.js.map