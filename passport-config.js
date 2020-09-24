const LocalStrategy = require("passport-local").Strategy;

// const db = require("./sql.js");
const User = require("./Models/User.js");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcrypt");
// eslint-disable-next-line no-unused-vars
function initialize(passport, getUserByEmail, getUserById) {
	const authenticateUser = async (email, password, done) => {
		console.log("called authenticateUser");
		User.findOne({ where: { email: email } })
			.then((user) => {
				if (user == null) {
					return done(null, false, { message: "No user with that email" });
				}

				try {
					bcrypt.compare(password, user.password, function (err, result) {
						if (result) return done(null, user);
						else return done(null, false, { message: "Password incorrect" });
					});
				} catch (e) {
					return done(e);
				}
			})
			.catch(() => {
				return done(null, false, {
					message: "Password is incorrect or No user with that email",
				});
			});
	};

	passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
	passport.serializeUser((user, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		User.findOne({ where: { id: id } }).then((user) => {
			if (user == null) {
				return done(null, false, { message: "No user with that id" });
			}
			return done(null, user);
		});
	});
}

module.exports = initialize;
