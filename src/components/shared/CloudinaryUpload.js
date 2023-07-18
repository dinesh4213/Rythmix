import { openUploadWidget } from "../../utils/CloudinaryService";
import { add } from "../../config";

const CloudinaryUpload = ({ setUrl, setName }) => {
	const uploadImageWidget = () => {
		let myUploadWidget = openUploadWidget(
			{
				cloudName: "dmno75ehb",
				uploadPreset: add.cloudinary_upload_preset,
				sources: ["local"],
			},
			function (error, result) {
				if (!error && result.event === "success") {
					console.log(result.info);
					setUrl(result.info.secure_url);
					setName(result.info.original_filename);
				} else {
					if (error) {
						console.log(error);
					}
				}
			}
		);
		myUploadWidget.open();
	};

	return (
		<button
			className="bg-black text-red-600 text-xl border border-red-600 rounded-full p-2 pl-4 pr-4 font-semibold hover:text-black hover:bg-red-600"
			onClick={uploadImageWidget}
		>
			Select Track
		</button>
	);
};

export default CloudinaryUpload;