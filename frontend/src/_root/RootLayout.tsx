import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";
import '../styles/Navbar.css'
import '../styles/Home.css'


function RootLayout() {
	return (
		<div className="root-wrapper">
			<Navbar/>

			<Outlet/>
		</div>
		
	)
}

export default RootLayout