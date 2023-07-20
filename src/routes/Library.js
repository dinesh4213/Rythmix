import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETrequest } from "../utils/serverHelper";

const Library = () => {
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
		<LoggedInContainer curActiveScreen={"library"}>
			<div className="ml-2 h-full mr-2 rounded-lg border-gray-400 flex flex-col mt-1">
				<div className="text-white font-serif font-bold text-3xl mt-6 ml-10">
					My Playlists
				</div>
				<div className="mt-4 flex flex-row space-x-8 flex-wrap">
					{myPlaylists.map((item) => {
						return (
							<Card
								key={JSON.stringify(item)}
								title={item.name}
								description=""
								imgUrl={item.thumbnail}
								playlistId={item._id}
							/>
						);
					})}
				</div>
			</div>
		</LoggedInContainer >
	)
};

const Card = ({ title, description, source, playlistId }) => {
	const navigate = useNavigate();
	return (
		<div className='ml-8 w-40 h-52 p-2 mb-4 opacity-100 bg-gray-500 mt-2 rounded-lg flex flex-col justify-center items-center cursor-pointer' onClick={() => {
			navigate("/playlist/" + playlistId);
		}}>
			<div className='w-32 h-32'>
				<img className="rounded-lg bg-center bg-cover" src={source} alt="loading" />
			</div>
			<div className='text-white pt-1 mt-2'>{title}</div>
			<div className='text-gray-400 text-sm'>{description}</div>
		</div>
	)
}

export default Library;