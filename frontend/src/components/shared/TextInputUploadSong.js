const TextInputUploadSong = ({ label, placeholder, value, setValue }) => {
	return (
		<div className="textinput">
			<div className="text-1xl font-serif flex flex-col w-full pl-20 mt-5">
				<div className="w-80 flex flex-col w-full text-xl ">
					<label>{label}</label>
				</div>
				<div className="mt-2">
					<input type="text" placeholder={placeholder} className="pl-2 pb-2 pt-2 pr-2 bg-gray-800 border rounded-md w-80 border-solid  placeholder-gray-400 focus:ring focus:ring-red-600 " id={label} value={value} onChange={(e) => {
						setValue(e.target.value);
					}} />
				</div>
			</div>
		</div>
	)
}

export default TextInputUploadSong;