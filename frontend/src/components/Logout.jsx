import { MdLogout } from "react-icons/md";
// TODO Implement Logout functionality

const Logout = () => {
	return (
		<>
			<img
				src={"https://api.dicebear.com/8.x/fun-emoji/svg"}
				className='w-10 h-10 rounded-full border border-gray-800'
			/>

			<div className='cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto border border-gray-800'>
				<MdLogout size={22} />
			</div>
		</>
	);
};

export default Logout;