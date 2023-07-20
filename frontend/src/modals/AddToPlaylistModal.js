import { useState, useEffect } from "react";
import { makeAuthenticatedGETrequest } from "../utils/serverHelper";

const AddToPlaylistModal = ({ closeModal, addSongToPlaylist }) => {

	const [myPlaylists, setMyPlaylists] = useState([]);
	useEffect(() => {
		const getData = async () => {
			const response = await makeAuthenticatedGETrequest(
				"/playlist/get/me"
			);
			setMyPlaylists(response.data);
		};
		getData();
	}, []);

	return (
		<div
			className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
			onClick={closeModal}
		>
			<div
				className="bg-black rounded-lg w-1/3 p-8 justify-center h-80 items-center overflow-auto"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="text-red-600 mb-4 font-semibold text-2xl ml-36 font-serif">
					Select Playlist
				</div>
				<div className="flex flex-row flex-wrap overflow-auto ml-1">
					{myPlaylists.map((item) => {
						return <PlaylistListComponent info={item} addSongToPlaylist={addSongToPlaylist} />
					})}
				</div>
			</div>
		</div>
	);
};


const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
	return (
		<div className="bg-app-black flex flex-col hover:bg-gray-600 w-24 h-32 items-center justify-center ml-2" onClick={() => {
			addSongToPlaylist(info._id);
		}}>
			<div>
				<img src={info.thumbnail} alt="" className="w-20 h-20" />
			</div>
			<div className="font-bold text-1xl text-center text-red-600">
				{info.name}
			</div>
		</div>
	)
}
export default AddToPlaylistModal;