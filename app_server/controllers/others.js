module.exports.about = function(req, res) {
    res.render('generic-text', {title: 'ExprAbout'});
};

module.exports.angularApp = function(req, res) {
    res.render('layout', {'title': 'Loc8r' });
};