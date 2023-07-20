import { useContext } from 'react';
import songContext from '../../contexts/songContext';
import { Icon } from '@iconify/react';

const SingleSongCard = ({ info, playSound }) => {
	const { currentSong, setCurrentSong } = useContext(songContext);

	return (
		<div className="text-white flex flex-col w-28 h-44 justify-center items-center hover:bg-gray-300 hover:bg-opacity-30 m-2 rounded-sm">
			<div className="w-20 h-20 bg-white  bg-cover bg-center" style={{
				backgroundImage: `url("${info.thumbnail}")`
			}}>
			</div>
			<div className="flex flex-col justify-center pl-2 mt-1 space-y-2">
				<div>
					<div className="text-md text-center hover:underline cursor-pointer">{info.name}</div>
					<div className="text-xs  text-center text-gray-400 hover:underline cursor-pointer">{info.artist.firstName + " " + info.artist.lastName}</div>
				</div>
				<div className="flex flex-row items-center">
					<div onClick={() => {
						setCurrentSong(info);
					}}>
						<Icon icon="mdi:play" color="red" width="28" height="28" />
					</div>
					<div className="text-white text-xs pl-7">3:25</div>
				</div>
			</div>
		</div>
	)
};
export default SingleSongCard;