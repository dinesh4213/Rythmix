import LoadingBar from 'react-top-loading-bar';
import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Howl, Howler } from "howler";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SingleSongCard from '../components/shared/SingleSongCard';
import IconText from '../components/shared/IconText';
import { makeAuthenticatedGETrequest } from '../utils/serverHelper';
import LoggedInContainer from '../containers/LoggedInContainer';

const MyMusic = () => {

	const [songData, setSongData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await makeAuthenticatedGETrequest("/song/get/mysongs");
			console.log(response);
			setSongData(response.data);
		};
		getData();
	}, []);

	return (
		<LoggedInContainer curActiveScreen="myMusic">
			<div className='flex flex-col h-full'>
				<div className='text-red-600 text-3xl font-bold mt-6 ml-12 mb-3'>
					Music List
				</div>
				<div className='flex flex-row space-x-4 flex-wrap ml-4'>
					{
						songData.map((item) => {
							return <SingleSongCard info={item} playSound={() => { }} />
						})
					}
				</div>
			</div>
		</LoggedInContainer>
	)
}

export default MyMusic;