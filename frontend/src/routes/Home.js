import LoadingBar from 'react-top-loading-bar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import IconText from '../components/shared/IconText';

const rythmixHits = [
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
]
const rythmixTrending = [
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
]
const trendingArtists = [
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
	{
		title: "Relax",
		description: "Calm yourself with free listening",
		source: "https://images.unsplash.com/photo-1505430111830-b998ef798efa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
	},
]
const HomeComponent = () => {
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
				<div className='border border-solid border-black bg-black mt-4 pt-8 pl-4 pb-20 ml-2 mr-2 rounded-lg flex space-y-3 flex-col'>   {/*Left side options*/}
					<IconText iconName={"bxs:home"} displayText={"Home"} active />
					<IconText iconName={"mdi:search"} displayText={"Search"} />
					<IconText iconName={"fluent:library-28-regular"} displayText={"Library"} />
					<IconText iconName={"iconoir:playlist-add"} displayText={"Create Playlist"} />
					<IconText iconName={"bxs:heart"} displayText={"Liked Songs"} />

				</div>
				<div className='text-gray-500 justify-end flex flex-col text-gray-400 border border-solid border-black bg-black ml-2 mr-2 mt-2 h-60 rounded-lg pl-4 pt-6 pb-2 text-xs space-y-1'>
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
						<Link to="/signup">SignUp</Link>
					</div>
					<div className='rounded-full pl-3 pt-1 pb-1 pr-3 hover:text-black hover:bg-red-600 items-center cursor-pointer'>
						{/* <Icon icon="mdi:login" color="red" width="20" height="20" /> */}
						<Link to="/login">LogIn</Link>
					</div>
				</div>
				<div className='pl-4 mt-5 flex flex-col overflow-auto'>
					<div className='content pt-2 pb-3 mt-1 pl-4'>
						<PlaylistView
							titleDescription={"Rythmix Hits"}
							cardsData={rythmixHits}
						/>
					</div>
					{/* <div className='pl-4 flex flex-col'> */}
					<div className='content pt-2 pb-3 mt-1 pl-4'>
						<PlaylistView
							titleDescription={"Top Trending on Rythmix"}
							cardsData={rythmixTrending}
						/>
					</div>
					{/* </div> */}
					{/* <div className='pl-4 flex flex-col'> */}
					<div className='content pt-2 pb-3 mt-1 pl-4'>
						<PlaylistView
							titleDescription="Trending Artists"
							cardsData={trendingArtists}
						/>
					</div>
					{/* </div> */}
				</div>

			</div>
		</div>
	)
}

const PlaylistView = ({ titleDescription, cardsData }) => {
	return (
		<div className='text-white'>
			<div className='font-bold text-2xl pl-7'>{titleDescription}</div>
			<div className="w-full flex flex-row space-x-8 mt-4">
				{
					cardsData.map((item) => {
						return (
							<Card
								title={item.title}
								description={item.description}
								source={item.source}
							/>
						);
					})
				}
			</div>
		</div>
	)
}

const Card = ({ title, description, source }) => {
	return (
		<div className='w-1/6 p-4 ml-2 mr-2 mb-4 opacity-100 bg-black  rounded-lg'>
			<div className='w-full'>
				<img className="w-full rounded-lg" src={source} alt="loading" />
			</div>
			<div className='text-white pt-1'>{title}</div>
			<div className='text-gray-400 text-sm'>{description}</div>
		</div>
	)
}
export default HomeComponent