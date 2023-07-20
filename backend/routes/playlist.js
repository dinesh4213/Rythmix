const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const User = require("../models/User");
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


// Create a playlist
router.post("/create", [auth,
	[
		check('name', 'Name is required').not().isEmpty(),
		check('thumbnail', 'Thumbnail is required').not().isEmpty(),
		check('songs', 'Please add valid songs').not().isEmpty()
	]
], async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const currentUser = req.user;
	const { name, thumbnail, songs } = req.body;

	try {
		const playlistData = {
			name,
			thumbnail,
			songs,
			owner: currentUser.id,
			collaborators: [],
		};
		const playlist = await Playlist.create(playlistData);
		await playlist.save();
		return res.status(200).json(playlist);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
}
);


// Get playlist by playlistID
router.get("/get/playlist/:playlistId", auth, async (req, res) => {
	try {
		const playlistId = req.params.playlistId;
		const playlist = await Playlist.findOne({ _id: playlistId }).populate(
			{
				path: "songs",
				populate: {
					path: "artist"
				}
			},
		).populate("owner");
		if (!playlist) {
			return res.status(301).json({ err: "Invalid ID" });
		}
		return res.status(200).json(playlist);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});


// Request to get all playlists of loggedin user
router.get("/get/me", auth, async (req, res) => {
	try {
		const artistId = req.user.id;
		const playlists = await Playlist.find({ owner: artistId }).populate("owner");
		return res.status(200).json({ data: playlists });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});


// Get all playlist by me
router.get("/get/me", auth, async (req, res) => {

	const artistId = req.user.id;
	try {
		const artist = await User.findOne({ _id: artistId });
		if (!artist) {
			return res.status(304).json({ err: "Invalid Artist ID" });
		}

		const playlists = await Playlist.find({ owner: artistId }).populate("owner");
		return res.status(200).json({ data: playlists });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});


// Get all playlist by artistID
router.get("/get/artist/:artistId", auth, async (req, res) => {

	const artistId = req.params.artistId;
	try {
		const artist = await User.findOne({ _id: artistId });
		if (!artist) {
			return res.status(304).json({ err: "Invalid Artist ID" });
		}

		const playlists = await Playlist.find({ owner: artistId });
		return res.status(200).json({ data: playlists });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// Add a song to a playlist
router.post("/add/song", [auth,
	[
		check('playlistId', 'Please enter a valid playlistId').not().isEmpty(),
		check('songId', 'Please enter a valid songId').not().isEmpty()
	]
], async (req, res) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const currentUser = req.user;
	const { playlistId, songId } = req.body;

	try {
		const playlist = await Playlist.findOne({ _id: playlistId });
		if (!playlist) {
			return res.status(304).json({ err: "Playlist does not exist" });
		}

		if (!playlist.owner.equals(currentUser.id) &&
			!playlist.collaborators.includes(currentUser.id)) {
			return res.status(400).json({ err: "Not allowed" });
		}

		let song = await Song.findOne({ _id: songId });
		if (!song) {
			return res.status(304).json({ err: "Song does not exist" });
		}

		playlist.songs.push(songId);
		await playlist.save();

		return res.status(200).json(playlist);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;