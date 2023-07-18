const PasswordInputSignin = ({ label, placeholder, value, setValue }) => {
	return (
		<div className="textinput">
			<div className="text-1xl font-serif flex flex-col justify-center w-full">
				<div className="w-80 flex flex-col pl-28 w-full ">
					<div>
						<label>{label}</label>
					</div>
				</div>
				<div className="text-center focus:border-10">
					<input type="password" placeholder={placeholder} className="pl-2 pt-1 pb-1 pr-2 mt-1 bg-gray-800 border  rounded-md border-solid placeholder-gray-400 w-80 focus:ring focus:ring-red-600" id={label} value={value} onChange={(e) => {
						setValue(e.target.value);
					}} />
				</div>
			</div>
		</div>
	)
}

export default PasswordInputSignin;