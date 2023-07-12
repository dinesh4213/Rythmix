const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("passport-jwt");
const Song = require("../models/Song");
const User = require("../models/User");


router.post(
	"/create", passport.authenticate('jwt', { session: false }),
	async (req, res) => {

		// req.user getss the user because of passport.authenticate
		let { name, thumbnail, track, artist } = req.body;
		if (!name || !thumbnail || !track) {
			return res
				.status(301)
				.json({ err: "Insufficient details to create song." });
		}
		console.log(req.user.email);
		artist = req.user._id;
		console.log(req.user._id);
		const songDetails =
		{
			name,
			thumbnail,
			track,
			artist,
		};
		console.log(songDetails);
		const createdSong = await Song.create(songDetails);
		console.log(createdSong);
		// await createdSong.save();
		return res.status(200).json(createdSong);
	}
);

// Get route to get all songs I have published.
router.get(
	"/get/mysongs", passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		// We need to get all songs where artist id == currentUser._id
		const artist = req.user._id;
		const songs = await Song.find({ artist: req.user._id }).populate(
			"artist"
		);
		return res.status(200).json({ data: songs });
	}
);

// Get route to get all songs any artist has published
// I will send the artist id and I want to see all songs that artist has published.
router.get(
	"/get/artist/:artistId", passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		// const { artistId } = req.params.artistId;
		// We can check if the artist does not exist
		const artist = await User.findOne({ _id: req.params.artistId });
		// ![] = false
		// !null = true
		// !undefined = true
		if (!artist) {
			return res.status(301).json({ err: "Artist does not exist" });
		}

		const songs = await Song.find({ artist: artist._id });
		return res.status(200).json({ data: songs });
	}
);

// Get route to get a single song by name
router.get(
	"/get/songname/:songName", passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { songName } = req.params;

		// name:songName --> exact name matching. Vanilla, Vanila
		// Pattern matching instead of direct name matching.
		const songs = await Song.find({ name: songName }).populate("artist");
		return res.status(200).json({ data: songs });
	}
);

module.exports = router;



