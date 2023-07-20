import { Icon } from '@iconify/react';
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import TextInputSignin from '../components/shared/TextInputsignin';
import PasswordInputSignin from '../components/shared/PasswordInputsignin';
import { makeUnauthenticatedPOSTrequest } from '../utils/serverHelper';
import { Link } from 'react-router-dom';


const LoginComponent = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cookies, setCookie] = useCookies(["token"]);
	const navigate = useNavigate();
	const logIn = async () => {
		if (!email || !password) {
			alert(
				"Please complete the required fields"
			);
			return;
		}
		const data = { email, password };
		const response = await makeUnauthenticatedPOSTrequest("/auth/login", data);

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

	return (<div className="bg-black w-full h-full flex flex-col justify-center">
		<LoadingBar color='#f11946' progress={100} />
		<div className="border-b-2  border-red-600 flex flex-row pb-3 mt-3 w-full pl-6 items-center">
			<div className='cursor pointer'>
				<Icon icon="typcn:headphones" color="#f50514" width="50" height="50" />
			</div>
			<div className='text-2xl p-1 text-red-600 font-serif  cursor-pointer '>
				<Link to="/home">Rythmix</Link>
			</div>
		</div>
		<div className=' h-80 bg-gray-700 w-full h-full flex flex-col items-center pt-6'>
			<div className='border-2 rounded-xl border-black bg-black w-3/5 h-full flex flex-col items-center mb-2'>
				<div className='border-b border-red-600 w-3/5 font-serif mx-10 text-white p-4 text-5xl font-bold flex flex-col items-center pt-8'>
					Log in to Rythmix
				</div>
				<div className='w-3/5 text-white flex flex-col p-4 space-y-6 pt-14 justify-center'>
					<TextInputSignin label="Email address" placeholder="Email address" value={email} setValue={setEmail} />
					<PasswordInputSignin label="Password" placeholder="Password" value={password} setValue={setPassword} />
				</div>
				<div className='w-80 mt-4'>
					<button type="button" className="bg-black text-red-600 font-sans font-bold text-md border-2 w-full border-solid rounded-full p-2 w-20 cursor-pointer hover:bg-red-600 hover:text-black" onClick={(e) => { e.preventDefault(); logIn(); }}>LOG IN</button>
				</div>
				<div className='w-80 mt-20 border border-solid'></div>
				<div className="text-red-600 mt-4 font-semibold">
					Don't have an account?
				</div>
				<div className='w-80 mt-4 text-center'>
					<div className="bg-black text-red-600 font-sans font-bold text-md border-2 w-full border-solid  rounded-full p-2 w-20 cursor-pointer hover:bg-red-600 hover:text-black">
						<Link to="/signup">SIGNUP FOR RYTHMIX</Link>
					</div>
				</div>
			</div>
		</div>
	</div >
	)
};

export default LoginComponent;