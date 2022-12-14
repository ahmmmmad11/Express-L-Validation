const respond = require('./respond')

function getFuncName () {return getFuncName.caller.name;}

module.exports = {
    after: (conf, req, item, compared, roles = []) => {
        if (Date.parse(req[item]) < Date.parse(compared)) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    alpha: (conf, req, item) => {
        const pattern = /[A-z]/
        if (! pattern.test(String(req.body[item]))) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    alphanumeric: (conf, req, item) => {
        const pattern = /[A-z0-9]/
        if (! pattern.test(String(req.body[item]))) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    array: (conf, req, item) => {
        if (! Array.isArray((req.body[item]))) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    before: (conf, req, item, compared, roles = []) => {
        if (Date.parse(req[item]) > Date.parse(compared)) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    boolean: (conf, req, item) => {
        if (typeof(req.body[item]) != 'boolean') {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    confirmed: (conf, req, item) => {
        if (!req.body[item + '_confirmation'] || req.body[item + '_confirmation'] != req.body[item] ) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    date: (conf, req, item) => {
        if (!Date.parse(req['item'])) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true; 
    },

    email: (conf, req, item) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (! pattern.test(String(req.body[item]).toLowerCase())) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    endwith: (conf, req, item, suffix, roles = []) => {
        if (! req[item].endsWith(suffix)) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    in: (conf, req, item, list, roles = []) => {
        let ListArray = list.split(',')
        if (!req[item] in ListArray) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    notin: (conf, req, item, list, roles = []) => {
        let ListArray = list.split(',')
        if (req[item] in ListArray) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    number: (conf, req, item) => {
        if (String(Number(req.body[item])) == 'NaN') {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    max: (conf, req, item, len, roles) => {
        if ('number' in roles && Number(req.body[item]) > len) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    min: (conf, req, item, len, roles) => {
        if ('number' in roles && Number(req.body[item]) < len) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    regx: (conf, req, item, pattern, roles = []) => {
        let str = String(req.body[item])
        if (! pattern.test(str)) {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    required: (conf, req, item) => {
        if (!(item in req.body) || req.body[item] == '') {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    startwith: (conf, req, item, prefix, roles = []) => {
        if (! req[item].endsWith(prefix)) {
            respond(conf, getFuncName(), item)
            return false;
        }
        return true;
    },

    string: (conf, req, item) => {
        if (typeof(req.body[item]) != 'string') {
            respond(conf, getFuncName(), item);
            return false;
        }
        return true;
    },

    url: (conf, req, item) => {
        const isValidUrl = urlString=> {
            let url;
            try { 
                  url =new URL(urlString); 
            }
            catch(e){ 
              return false; 
            }
            return url.protocol === "http:" || url.protocol === "https:";
        }

        if (! isValidUrl(req.body[item])) {
            respond(conf, getFuncName(), item)
            return false;
        }

        return true;
    },
};