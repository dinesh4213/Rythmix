import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IconText from '../components/shared/IconText';
import TextInputUploadSong from '../components/shared/TextInputUploadSong';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { makeAuthenticatedPOSTrequest } from '../utils/serverHelper';

const UploadSong = () => {
	const [name, setName] = useState("");
	const [thumbnail, setThumbnail] = useState("");
	const [playlistURL, setPlaylistURL,] = useState("");
	const [uploadedFileSongName, setUploadedFileSongName,] = useState("");
	const navigate = useNavigate();

	const submitSong = async () => {
		const data = { name, thumbnail, track: playlistURL };
		const response = await makeAuthenticatedPOSTrequest(
			"/song/create",
			data
		);
		if (response.err) {
			alert("Could not create song");
			return;
		}
		console.log(response);
		alert("Success");
		navigate("/home");
	};

	return (
		<div className="w-full h-full flex">  {/*outermost div*/}
			<LoadingBar color='#f11946' progress={100} />
			<div className="w-1/4 h-full" style={{ backgroundColor: "#1A1B1C" }}>   {/*left black side*/}
				<div className="logo mt-3 ml-2 mr-2 pt-2 pl-2 pb-3  flex flex-row items-center cursor-pointer border border-solid border-black bg-black rounded-lg">  {/*Rythmix logo*/}
					<Icon icon="typcn:headphones" color="red" width="50" height="50" />
					<div className='text-2xl text-red-600 pl-1'>
						<Link to="/home">Rythmix</Link>
					</div>
				</div>
				<div className='border border-solid border-black bg-black mt-3 pt-8 pl-4 pb-20 ml-2 mr-2 rounded-lg flex space-y-3 flex-col'>   {/*Left side options*/}
					<IconText iconName={"bxs:home"} displayText={"Home"} active />
					<IconText iconName={"mdi:search"} displayText={"Search"} />
					<IconText iconName={"fluent:library-28-regular"} displayText={"Library"} />
					<IconText iconName={"iconoir:playlist-add"} displayText={"Create Playlist"} />
					<IconText iconName={"bxs:heart"} displayText={"Liked Songs"} />
					<IconText iconName={"arcticons:line-music"} displayText={"My Songs"} />

				</div>
				<div className='text-gray-500 justify-end flex flex-col text-gray-400 border border-solid border-black bg-black ml-2 mr-2 mt-2 h-52 rounded-lg pl-4 pt-6 pb-2 text-xs space-y-1'>
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
				<div className='flex flex-row justify-end bg-black h-16 border border-black rounded-lg mt-3 ml-2 mr-2 text-red-600 items-center text-lg space-x-4 pr-8'>    {/* NAVBAR */}
					<div className='font-semibold hover:text-white cursor-pointer'>Premium</div>
					<div className='font-semibold hover:text-white cursor-pointer'>Download</div>
					<div className='h-10 border border-white'></div>
					<div className='rounded-full pl-3 pt-1 pb-1 pr-3 hover:text-black hover:bg-red-600 cursor-pointer'>
						<Link to="/DKC">Upload Song</Link>
					</div>
					<div className='rounded-full pl-2 pt-1.5 w-10 h-10  text-black bg-red-600 cursor-pointer'>
						<Link to="/login">DK</Link>
					</div>
				</div>
				<div className='bg-black w-200  mt-5 ml-3 mr-3 pt-6 pb-32 border-2 border-black rounded-lg p-4 overflow-auto'>
					<div className='text-3xl text-white flex flex-col mt-10 font-serif text-center font-bold '>Upload Your Music</div>
					<div className='flex flex-col text-white mt-8 text-center'>
						<div className='flex flex-col items-center mr-20'>
							<TextInputUploadSong label="Enter Songname" placeholder="songname" value={name} setValue={setName} />
							<TextInputUploadSong label="Enter link to Thumbnail" placeholder="thumbnail" value={thumbnail} setValue={setThumbnail} />
							<div className='text-white text-xl font-serif mt-5 pl-20'>Upload the track</div>
							<div className='mt-4 pl-20 hover:w-20 hover:h-20'>
								{
									uploadedFileSongName ? (
										<div className='border border-red-600 w-48 rounded-full text-red pt-2 pb-2 pl-2 pr-2'>
											{uploadedFileSongName.substring(0, 20)}....
										</div>
									) : (
										<CloudinaryUpload setUrl={setPlaylistURL} setName={setUploadedFileSongName} />
									)
								}
							</div>
							<div className='bg-black text-red-600 border-red-600 border rounded-full cursor-pointer w-80 pt-1 h-10 text-xl font-semibold mt-8 ml-20 hover:text-black hover:bg-red-600' onClick={submitSong}>Submit</div>
						</div>
						<div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


export default UploadSong;