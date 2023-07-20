import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const IconText = ({ iconName, displayText, active, targetLink, onClick }) => {
	return (
		<Link to={targetLink}>
			<div className="flex items-center cursor-pointer" onClick={onClick}>
				<div className="">
					<Icon icon={iconName} color="red" width="30" height="30" />
				</div>
				<div className={`${active ? "text-white" : "text-gray-500"} text-lg ml-4 font-semibold hover:text-white`}>
					{displayText}
				</div>
			</div>
		</Link>
	)
}

export default IconText;