import { useState, useEffect } from "react";
import { makeAuthenticatedGETrequest } from "../utils/serverHelper";
import LoggedInContainer from "../containers/LoggedInContainer";
import ProfileField from "../components/shared/ProfileField";

const Profile = () => {
	const [profile, setProfile] = useState({});
	useEffect(() => {
		const getData = async () => {
			const response = await makeAuthenticatedGETrequest(
				"/auth/profile"
			);
			console.log(response);
			setProfile(response);
		};
		getData();
	}, []);
	return (
		<LoggedInContainer>
			<div className="bg-black h-5/6 m-2 mt-7 rounded-lg flex flex-col">
				<div className="font-bold text-5xl mt-5 text-red-600 text-center pt-4 font-serif ">
					User's Profile
				</div>
				<div className="flex flex-col font-serif ml-20 mt-20 text-2xl space-y-2">
					<ProfileField field={"Name"} value={`${profile.firstName} ${profile.lastName}`} />
					<ProfileField field={"Email"} value={`${profile.email}`} />
					<ProfileField field={"Username"} value={`${profile.username}`} />
					<ProfileField field={"Gender"} value={`${profile.gender}`} />
				</div>
			</div>
		</LoggedInContainer>
	)
};
export default Profile;