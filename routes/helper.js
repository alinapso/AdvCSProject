function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect("/landing");
}

function checkNotAuthenticated(req, res, next) {
	console.log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		return res.redirect("/");
	}
	next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
