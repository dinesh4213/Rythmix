import LoadingBar from 'react-top-loading-bar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import IconText from '../components/shared/IconText';
import { useState } from 'react';
import { Howl, Howler } from "howler";
import LoggedInContainer from '../containers/LoggedInContainer';

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

const Home = () => {
	return (
		<LoggedInContainer>
			<div className='pl-4 mt-5 flex flex-col overflow-auto'>
				<div className='content pt-2 pb-3 mt-1 pl-4'>
					<PlaylistView
						titleDescription={"Rythmix Hits"}
						cardsData={rythmixHits}
					/>
				</div>
				<div className='content pt-2 pb-3 mt-1 pl-4'>
					<PlaylistView
						titleDescription={"Top Trending on Rythmix"}
						cardsData={rythmixTrending}
					/>
				</div>
				<div className='content pt-2 pb-3 mt-1 pl-4'>
					<PlaylistView
						titleDescription="Trending Artists"
						cardsData={trendingArtists}
					/>
				</div>
			</div>
		</LoggedInContainer>
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
export default Home