import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETrequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";

const SinglePlaylistView = () => {
	const [playlistDetails, setPlaylistDetails] = useState({});
	const { playlistId } = useParams();

	useEffect(() => {
		const getData = async () => {
			const response = await makeAuthenticatedGETrequest(
				"/playlist/get/playlist/" + playlistId
			);
			console.log(response);
			setPlaylistDetails(response);
		};
		getData();
	}, []);

	return (
		<LoggedInContainer curActiveScreen={"library"}>
			{playlistDetails._id && (
				<div className="bg-gray-400 mt-7 ml-2 mr-2 rounded-lg h-full">
					<div className=" h-32 bg-black font-serif pl-8 font-semibold flex flex-row items-center">
						<div className="h-20 w-16 bg-cover bg-center flex flex-col justify-center">
							<div>
								<img src={`${playlistDetails.thumbnail}`} alt="" />
							</div>
						</div>
						<div className="pl-8 flex flex-col justify-center mt-2">
							<div className="text-red-600 text-2xl">
								{playlistDetails.name}
							</div>
							<div className="text-gray-400 mt-3 text-sm">
								{playlistDetails.owner.firstName + " " + playlistDetails.owner.lastName}
							</div>
						</div>
					</div>
					<div className="border border-red-600"></div>
					<div className="space-x-4 bg-black flex flex-row flex-wrap ml-3 mt-4 flex-row h-120 mr-3">
						{playlistDetails.songs.map((item) => {
							return (
								<SingleSongCard
									info={item}
									key={JSON.stringify(item)}
									playSound={() => { }}
								/>
							);
						})}
					</div>
				</div>
			)}
		</LoggedInContainer>
	);
};

export default SinglePlaylistView;