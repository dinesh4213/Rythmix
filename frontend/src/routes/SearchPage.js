import { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETrequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [searchText, setSearchText] = useState("");
	const [songData, setSongData] = useState([]);

	const searchSong = async () => {
		const response = await makeAuthenticatedGETrequest(
			"/song/get/songname/" + searchText
		);
		setSongData(response.data);
	};

	return (
		<LoggedInContainer curActiveScreen="search">
			<div className="w-full py-6 h-full bg-black mt-6 rounded-lg">
				<div className="text-red-600 text-2xl font-bold ml-10 mb-2">
					Search
				</div>
				<div className={`w-1/3 p-3 text-sm rounded-full bg-gray-800 flex text-white space-x-3 items-center ml-6 ${isInputFocused ? "border border-white" : ""}`}>
					<Icon icon="ic:outline-search" className="text-lg" height="28" width="28" />
					<input
						type="text"
						placeholder="What do you want to listen to?"
						className="w-full bg-gray-800 focus:outline-none"
						onFocus={() => {
							setIsInputFocused(true);
						}}
						onBlur={() => {
							setIsInputFocused(false);
						}}
						value={searchText}
						onChange={(e) => {
							setSearchText(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								searchSong();
							}
						}}
					/>
				</div>
				{songData.length > 0 ? (
					<div className="pt-6 pl-6 space-y-3">
						<div className="text-white ml-4">
							Search results for
							<span className="font-bold"> {searchText}</span>
						</div>
						<div className="flex flex-row space-x-6">
							{songData.map((item) => {
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
				) : (
					<div className="text-gray-400 pt-10 ml-12">
						Nothing to show here.
					</div>
				)}
			</div>
		</LoggedInContainer>
	);
};

export default SearchPage;