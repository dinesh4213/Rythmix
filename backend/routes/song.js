const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const User = require("../models/User");
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


// Create a Song
router.post("/create", [auth,
	[
		check('name', 'song name is required').not().isEmpty(),
		check('thumbnail', 'thumbnail is required').not().isEmpty(),
		check('track', 'track is required').not().isEmpty()
	]
], async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(404).json({ errors: errors.array() });
	}

	try {
		const { name, thumbnail, track } = req.body;
		if (!name || !thumbnail || !track) {
			return res
				.status(301)
				.json({ err: "Insufficient details to create song." });
		}

		const artist = req.user.id;
		const songDetails = { name, thumbnail, track, artist };
		const createdSong = await Song.create(songDetails);
		await createdSong.save();
		return res.status(200).json(createdSong);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// Get all songs by loggedin User
router.get("/get/mysongs", auth, async (req, res) => {
	try {
		const songs = await Song.find({ artist: req.user.id }).populate("artist");
		return res.status(200).json({ data: songs });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// Get Songs by artistId
router.get("/get/artist/:artistId", auth, async (req, res) => {
	try {
		const { artistId } = req.params;
		const artist = await User.findOne({ _id: artistId });
		if (!artist) {
			return res.status(301).json({ err: "Artist does not exist" });
		}

		const songs = await Song.find({ artist: artistId });
		return res.status(200).json({ data: songs });
	}
	catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});


// Get song by songname
router.get("/get/songname/:songName", auth, async (req, res) => {
	try {
		const { songName } = req.params;
		const songs = await Song.find({ name: songName }).populate("artist");
		return res.status(200).json({ data: songs });
	}
	catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;