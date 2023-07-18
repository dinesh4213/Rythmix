import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import { makeUnauthenticatedPOSTrequest } from "../utils/serverHelper";
import TextInputSignup from '../components/shared/TextInputsignup';
import PasswordInputSignup from '../components/shared/PasswordInputsignup';
import React from 'react'
import LoadingBar from 'react-top-loading-bar';

import { Link } from 'react-router-dom';

const SignupComponent = () => {
	const [email, setEmail] = useState("");
	const [confirmEmail, setConfirmEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [gender, setGender] = useState("");

	const [cookie, setCookie] = useCookies(["token"]);
	const navigate = useNavigate();

	const signUp = async () => {
		if (!email || !confirmEmail || !username || !password || !confirmPassword || !firstName || !gender) {
			alert(
				"Please complete the required fields"
			);
			return;
		}
		if (email !== confirmEmail) {
			alert(
				"Email address and confirm Email address fields must match!!!"
			);
			return;
		}
		if (password !== confirmPassword) {
			alert(
				"Password and confirm Password fields must match!!!"
			);
			return;
		}
		const data = { email, password, username, firstName, lastName, gender };
		const response = await makeUnauthenticatedPOSTrequest("/auth/register", data);

		if (response && !response.err) {
			const token = response.token;
			const date = new Date();
			date.setDate(date.getDate() + 5);
			setCookie("token", token, { path: "/", expires: date });
			alert("Success");
			navigate("/home");
		}
		else {
			alert("Failure");
		}
	};
	return <div className="bg-black w-full h-full flex flex-col justify-center">
		<LoadingBar color='#f11946' progress={100} />;
		<div className="border-b-2 border-red-600 flex flex-row -mt-5 p-4 w-full pl-6 items-center">
			<div className='cursor pointer'>
				<Icon icon="typcn:headphones" color="#f50514" width="50" height="50" />
			</div>
			<div className='text-2xl p-1 text-red-600 font-serif cursor-pointer '>
				<Link to="/home">Rythmix</Link>
			</div>
		</div>
		<div className=' h-80 bg-white w-full h-full flex flex-col items-center pt-1'>
			<div className='border-2 rounded-xl border-black bg-black w-3/5 h-full flex flex-col items-center mb-2'>
				<div className='border-b border-red-600 w-3/5 font-serif text-white p-4 text-5xl font-bold flex flex-col items-center'>
					Signup for Free
				</div>
				<div className="flex flex-col text-white w-3/5 justift-center pl-28 ml-5 mt-4 mb-1">
					<div className='pl-1 font-serif'>Name</div>
					<div className="text-center flex flex-row">
						<input type="text" placeholder="First Name" className="pl-2 pr-2 mt-1 bg-gray-800 border rounded-md  border-solid  placeholder-gray-400 w-36 focus:ring focus:ring-red-600 " id="fname" value={firstName} onChange={(e) => {
							setFirstName(e.target.value);
						}} />
						<input type="text" placeholder="Last Name" className="pl-2 pr-2 mt-1 ml-8 bg-gray-800 border rounded-md  border-solid  placeholder-gray-400 w-36 focus:ring focus:ring-red-600 " id="lname" value={lastName} onChange={(e) => {
							setLastName(e.target.value);
						}} />
					</div>
				</div>
				<div className='w-3/5 text-white flex flex-col pl-4 space-y-2 justify-center h-1/2 mt-5'>
					<TextInputSignup label="Enter your Email address" placeholder="Email address" value={email} setValue={setEmail} />
					<TextInputSignup label="Confirm Email Address" placeholder="Confirm email address" value={confirmEmail} setValue={setConfirmEmail} />
					<TextInputSignup label="Create a username" placeholder="Enter a username" value={username} setValue={setUsername} />
					<PasswordInputSignup label="Create a Password" placeholder="Create strong password" value={password} setValue={setPassword} />
					<TextInputSignup label="Confirm your Password" placeholder="Confirm password" value={confirmPassword} setValue={setConfirmPassword} />
					<TextInputSignup label="Enter your gender" placeholder="Gender" value={gender} setValue={setGender} />
				</div>
				<div className='w-80 mb-4 mt-4 ml-4'>
					<button type="button" className="bg-black text-red-600 font-sans font-bold text-md border-2 w-full border-solid  rounded-full p-2 w-20 hover:bg-red-600 hover:text-black mt-6" onClick={e => { e.preventDefault(); signUp(); }}>Signup</button>
				</div>
				<div className="flex flex-row">
					<div className="text-white">
						Already have an account ?
					</div>
					<div className='pl-2'>
						<Link to="/login " className='text-red-600 cursor pointer'>Signin</Link>
					</div>
				</div>
			</div>
		</div>
	</div >
};

export default SignupComponent;