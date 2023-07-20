import LoadingBar from 'react-top-loading-bar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import IconText from '../components/shared/IconText';
import { useState, useContext, useLayoutEffect, useRef } from 'react';
import { Howl, Howler } from "howler";
import songContext from '../contexts/songContext';
import CreatePlaylistModal from '../modals/CreatePlaylistModal';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTrequest } from '../utils/serverHelper';

const LoggedInContainer = ({ children, curActiveScreen }) => {
	const [createPlaylistModalOpen, setCreatePlaylistModalOpen] = useState(false);
	const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);
	const { currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused } = useContext(songContext);

	const firstUpdate = useRef(true);

	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
		}
		if (!currentSong) {
			return;
		}
		changeSong(currentSong.track);
	}, [currentSong && currentSong.track]);

	const playSound = () => {
		if (!soundPlayed) {
			return;
		}
		soundPlayed.play();
	}
	const changeSong = (songSource) => {
		if (soundPlayed) {
			soundPlayed.stop();
		}
		let sound = new Howl({
			src: [songSource],
			html5: true,
		});
		setSoundPlayed(sound);
		sound.play();
		setIsPaused(false);
	}

	const addSongToPlaylist = async (playlistId) => {
		const songId = currentSong._id;

		const payload = { playlistId, songId };
		const response = await makeAuthenticatedPOSTrequest("/playlist/add/song", payload);

		console.log(response);
		if (response._id) {
			setAddToPlaylistModalOpen(false);
		}
	};

	const pauseSound = () => {
		soundPlayed.pause();
	};

	const togglePlayPause = () => {
		if (isPaused) {
			playSound(currentSong.track);
			setIsPaused(false);
		}
		else {
			pauseSound();
			setIsPaused(true);
		}
	};

	return (
		<div className="w-full h-full flex">  {/*outermost div*/}
			<LoadingBar color='#f11946' progress={100} />
			{createPlaylistModalOpen && <CreatePlaylistModal closeModal={() => { setCreatePlaylistModalOpen(false) }} />}
			{addToPlaylistModalOpen && <AddToPlaylistModal closeModal={() => { setAddToPlaylistModalOpen(false) }} addSongToPlaylist={addSongToPlaylist} />}
			<div className="w-1/4 h-full  " style={{ backgroundColor: "#1A1B1C" }}>   {/*left black side*/}
				<div className="logo mt-3 ml-2 mr-2 pt-1 pl-2 pb-2  flex flex-row items-center justify-center cursor-pointer border border-solid border-black bg-black rounded-lg">  {/*Rythmix logo*/}
					<Icon icon="typcn:headphones" color="red" width="60" height="60" />
					<div className='text-4xl font-serif text-red-600 pl-1'>
						<Link to="/home">Rythmix</Link>
					</div>
				</div>
				<div className='border border-solid border-black bg-black mt-4 pt-8 pl-4 pb-20 ml-2 mr-2 rounded-lg flex space-y-3 flex-col'>   {/*Left side options*/}
					<IconText iconName={"bxs:home"} displayText={"Home"} targetLink={"/home"} active={curActiveScreen === "home"} />
					<IconText iconName={"mdi:search"} displayText={"Search"} targetLink={"/search"} active={curActiveScreen === "search"} />
					<IconText iconName={"fluent:library-28-regular"} displayText={"Library"} active={curActiveScreen === "library"} targetLink={"/library"} />
					<IconText iconName={"iconoir:playlist-add"} displayText={"Create Playlist"} active={curActiveScreen === "playlist"} onClick={() => { setCreatePlaylistModalOpen(true) }} />
					<IconText iconName={"bxs:heart"} displayText={"Liked Songs"} />
					<IconText iconName={"arcticons:line-music"} displayText={"My Songs"} targetLink={"/myMusic"} active={curActiveScreen === "myMusic"} />

				</div>
				<div className='text-gray-500 justify-end flex flex-col text-gray-400 border border-solid border-black h-48 bg-black ml-2 mr-2 mt-2 rounded-lg pl-4 pt-6 pb-2 text-xs space-y-1'>
					<div className='flex flex-row space-x-8 pl-1'>
						<div className='hover:text-white cursor-pointer'>Legal</div>
						<div className='hover:text-white cursor-pointer'>Privacy Policy</div>
						<div className='hover:text-white cursor-pointer'>Rate us</div>
					</div>
					<div className='flex flex-row space-x-8 pl-1'>
						<div className='hover:text-white cursor-pointer'>Support</div>
						<div className='hover:text-white cursor-pointer'>Know About Us</div>
					</div>
					<div className='flex flex-row space-x-4 pl-1'>
						<div className='hover:text-white cursor-pointer'>Terms and Conditions</div>
					</div>
					<div className='flex flex-row space-x-4 pl-1'>
						<div className='hover:text-white cursor-pointer'>Our Team</div>
					</div>
				</div>
				<div className='flex flex-row border border-solid border-black bg-black ml-2 mr-2 mt-2 h-16 rounded-lg items-center pl-4 text-2xl'>
					<div>
						<Icon icon="clarity:settings-line" color="red" width="40" height="40" />
					</div>
					<div className='text-2xl text-gray-500 pl-2 font-semibold hover:text-white'>
						<Link to="">Settings</Link>
					</div>
				</div>
			</div>
			<div className='border border-solid border-red-600'></div>
			<div className="w-full h-full overflow-auto" style={{ backgroundColor: "#1A1B1C" }}> {/*Right Grey Side*/}
				<div className='sticky top-3 flex flex-row justify-end bg-black h-16 border border-black rounded-lg mt-3 ml-2 mr-2 text-red-600 items-center text-lg space-x-4 pr-8'>    {/* NAVBAR */}
					<div className='font-semibold hover:text-white cursor-pointer'>
						<Link to={"/premium"}>Premium</Link>
					</div>

					<div className='font-semibold hover:text-white cursor-pointer'>
						<Link to={"/download"}>Download</Link>
					</div>
					<div className='h-10 border border-white'></div>
					<div className='rounded-full pl-3 pt-1 pb-1 pr-3 hover:text-black hover:bg-red-600 cursor-pointer'>
						<Link to="/uploadSong">Upload Song</Link>
					</div>
					<div className='rounded-full pl-2 pt-1.5 w-10 h-10 mb-5 text-black cursor-pointer'>
						<Link to={"/profile"}>
							<Icon icon="healthicons:ui-user-profile" color="red" width="48" height="48" />
						</Link>
					</div>
				</div>
				{children}
				{currentSong &&
					<div className='text-white flex flex-row sticky bottom-0 bg-black border border-red-600 rounded-lg w-full h-20'>
						<div className='bg-cover bg-center w-20 h-20 p-2 ml-2'>
							<img src={currentSong.thumbnail} alt="" className='rounded-lg h-full w-full' />
						</div>
						<div className='flex flex-col text-white justify-center ml-3 w-40'>
							<div className='cursor-pointer hover:underline'>{currentSong.name}</div>
							<div className='text-sm text-gray-400 cursor-pointer hover:underline'>{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
						</div>
						<div className='flex flex-col w-2/5 ml-36 items-center justify-center'>
							<div className='flex flex-row justify-center space-x-6'>
								<Icon icon="mi:previous" color="red" width="36" height="36" className='cursor-pointer' />
								<Icon icon={isPaused ? "zondicons:play-outline" : "zondicons:pause-outline"} color="red" width="36" height="36" className='cursor-pointer' onClick={togglePlayPause} />
								<Icon icon="mi:next" color="red" width="36" height="36" className='cursor-pointer' />
							</div>
						</div>
						<div className='w-1/5 ml-36 flex flex-row items-center space-x-4'>
							<Icon icon="ic:sharp-playlist-add" color="red" width="36" height="36" onClick={() => { setAddToPlaylistModalOpen(true) }} />
							<Icon icon="mdi:heart-outline" color="red" width="36" height="36" />
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default LoggedInContainer;