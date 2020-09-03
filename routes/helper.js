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

function clientOnly(req, res, next) {
	if (req.isAuthenticated() && req.user.groupID === 0) {
		next();
	}
	return res.redirect("/");
}

function adminOnly(req, res, next) {
	if (req.isAuthenticated() && req.user.groupID === 2) {
		next();
	}
	return res.redirect("/");
}

function workerOnly(req, res, next) {
	if (req.isAuthenticated() && req.user.groupID === 1) next();
	return res.redirect("/");
}

module.exports = {
	checkAuthenticated,
	checkNotAuthenticated,
	clientOnly,
	adminOnly,
	workerOnly,
};
