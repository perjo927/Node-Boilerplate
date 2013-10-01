/*
 *
 *
 */

var headOptions =  { locals: {
    title : 'Your Page Title'
        ,description: 'Your Page Description'
        ,author: 'Your Name'
        ,analyticssiteid: 'XXXXXXX'
}};


// Ta ej bort, Innehåller intressant funktionalitet
exports.index = function(req,res) {
    res.render("index.jade",  headOptions);
};


exports.start = function(req,res) {
    headOptions.locals.title = "Programmeringsklubben";
    res.render("./start.jade", headOptions);
};

exports.explore = function(req,res) {
    headOptions.locals.title = "Utforska Programmeringsklubben";
    res.render("./explore.jade", headOptions);
};

exports.register = function(req,res) {
    res.render("./register.jade", headOptions);
};

exports.signin = function(req,res) {
    res.render("./signin.jade", headOptions);
};
