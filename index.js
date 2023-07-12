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


// console.log(process.env);

// Connecting mongodb to our node app
// mongoose.connect()  takes 2 arguments.   1. which db to connect(url)
//											2. 


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
// opts.jwtFromRequest = ExtractJwt.fromBodyField("Authorization");
// opts.jwtFromRequest = ExtractJwt.fromHeader("Authorization");
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = process.env.JWT_SECRET_KEY;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
	User.findOne({ id: jwt_payload.sub }, function (err, user) {
		if (err) {
			console.log("nhin ho rha")
			return done(err, false);
		}
		if (user) {
			console.log("ho to gaya");
			return done(null, user);
		} else {
			console.log("hoga hi nhin");
			return done(null, false);
			// or you could create a new account
		}
	});
	// console.log("Ho gaya")
})
);

app.use("/auth", authRoutes);
app.use("/song", songRoutes);


// API : GET type 
app.get('/', (req, res) => {
	res.send('Hello World');
});

// server to listen on port 
app.listen(port, () => console.log(`Server is listening at ${port}`));