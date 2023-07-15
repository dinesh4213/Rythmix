const mongoose = require('mongoose');
const express = require("express");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/song");
const playlistRoutes = require("./routes/playlist");
require('dotenv').config();
const app = express();

const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.MONGO_URL, {
			useNewUrlParser: true,
		});
		console.log('MongoDB Connected');
	} catch (err) {
		console.error(err.message);

		process.exit(1);
	}
};

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Hello World"));


app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

// Now we want to tell express that our server will run on localhost:80
const port = 80;
app.listen(port, () => console.log(`Server listening on port ${port}`));