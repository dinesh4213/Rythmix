const express = require('express');
const mongoose = require("mongoose");
const JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./models/User');
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');
require("dotenv").config();
const app = express();
const port = 80;
const cors = require("cors");


// console.log(process.env);

// Connecting mongodb to our node app
// mongoose.connect()  takes 2 arguments.   1. which db to connect(url)
//											2. 

app.use(cors());
app.use(express.json());

mongoose
	.connect(
		process.env.MONGO_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	)
	.then((x) => {
		console.log("Connected to Mongo!");
	})
	.catch((err) => {
		console.log("Error while connecting to Mongo");
	});


// set-up Passport - jwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "thisKeyIsSupposedToBeSecret";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
try {

	passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
		const user = User.findOne({ _id: jwt_payload.identifier })
		if (user) {
			// console.log(user);
			console.log("ho to gaya");
			// req.user = user;
			console.log(user._id);
			// console.log(jwt_payload.identifier);
			return done(null, user);
		} else {
			console.log("hoga hi nhin");
			return done(null, false);
			// or you could create a new account
		}
	})
	);
} catch (err) {
	console.error(err.message);
	return res.status(401).send("Server Error");
}

app.use("/auth", authRoutes);
app.use("/song", songRoutes);


// API : GET type 
app.get('/', (req, res) => {
	res.send('Hello World');
});

// server to listen on port 
app.listen(port, () => console.log(`Server is listening at ${port}`));