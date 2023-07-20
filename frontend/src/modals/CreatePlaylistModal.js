import { useState } from "react";
import TextInputSignin from "../components/shared/TextInputsignin";
import { makeAuthenticatedPOSTrequest } from "../utils/serverHelper";

const CreatePlaylistModal = ({ closeModal }) => {
	const [playlistName, setPlaylistName] = useState("");
	const [playlistThumbnail, setPlaylistThumbnail] = useState("");

	const createPlaylist = async () => {
		const response = await makeAuthenticatedPOSTrequest(
			"/playlist/create",
			{ name: playlistName, thumbnail: playlistThumbnail, songs: [] }
		);
		if (response._id) {
			closeModal();
		}
	};

	return (
		<div
			className="absolute bg-black w-screen h-screen bg-opacity-50 flex justify-center items-center"
			onClick={closeModal}
		>
			<div
				className="bg-red-900 rounded-lg w-1/3 p-8 justify-center items-center"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="text-white mb-5 font-semibold text-2xl ml-36 font-serif">
					Create Playlist
				</div>
				<div className="space-y-4 flex flex-col justify-center items-center">
					<TextInputSignin
						label="Name"
						labelClassName={"text-white"}
						placeholder="Name"
						value={playlistName}
						setValue={setPlaylistName}
					/>
					<TextInputSignin
						label="Thumbnail"
						labelClassName={"text-white"}
						placeholder="Thumbnail"
						value={playlistThumbnail}
						setValue={setPlaylistThumbnail}
					/>
					<div
						className="bg-black w-28  rounded flex font-bold text-lg text-red-600 justify-center items-center pt-2 pb-2 cursor-pointer"
						onClick={createPlaylist}
					>
						Create
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatePlaylistModal;