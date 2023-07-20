import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const Premium = () => {
	return (

		<div className="flex flex-col w-full h-full">
			<LoadingBar color='#f11946' progress={100} />
			<div className="logo mt-2 ml-2 mr-2 pt-1 pl-4 pb-2 h-24  flex flex-row items-center r cursor-pointer border border-solid border-black bg-black rounded-lg">
				<div className="flex flex-row items-center">
					<Icon icon="typcn:headphones" color="red" width="60" height="60" />
					<div className='text-4xl font-serif text-red-600 pl-1'>
						<Link to="/home">Rythmix</Link>
					</div>
				</div>
				<div className="flex flex-row justify-end w-full items-center">
					<div className="mr-10">
						<Link to={"/profile"}>
							<Icon icon="healthicons:ui-user-profile" color="red" width="48" height="48" />
						</Link>
					</div>
				</div>
			</div>
			<div className="bg-gray-600 rounded-lg mt-2 h-full ml-2 mr-2 mb-2 flex flex-col justify-center items-center text-red-600 text-3xl font-bold">
				Stay tuned! Premium features will be available soon
			</div>
		</div>
	)
}

export default Premium;