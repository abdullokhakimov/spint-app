import { NavLink, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../constants";
import { typeNavLink } from "../../types";
import { convertSvgToHtml } from "../../utils";
import { useUserContext } from "../../context/AuthContext";
import { useLoadUnreadNotificationsQuery } from "../../services/react-query/queries";


function Navbar() {
	const { pathname } = useLocation();
	const hideNavbar = pathname.startsWith('/facility/');

	const { user } = useUserContext();
	const { data } = useLoadUnreadNotificationsQuery({ id: user.id });
	

	if (hideNavbar && window.innerWidth < 500) {
		return null;
	}

	return (
		<nav className="navbar">
			<div className="navbar__list">
				<div className="navbar__list__link navbar__logo">
					<svg width={34} height={25} viewBox="0 0 34 25" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M8.5708 2.29873L4.00429 13.5446C3.96926 13.6309 4.02922 13.7269 4.11814 13.7269H10.0926C10.3976 13.7359 11.3682 13.1807 11.7338 12.06L13.437 7.58245C13.6688 6.96814 13.9057 6.82734 14.4279 6.76538H30.4577C30.4649 6.76538 30.4723 6.76466 30.4795 6.76335C31.2048 6.62477 31.5169 6.29068 31.9549 5.39269L33.9902 0.180545C34.0238 0.0944957 33.9638 0 33.8757 0H11.9816C10.1628 0.217801 9.49602 0.826311 8.58158 2.27778C8.57743 2.28436 8.57377 2.29146 8.5708 2.29873Z" fill="#2628DD" />
						<path d="M2.75262 17.205L0.0102042 23.9377C-0.024941 24.024 0.0350145 24.12 0.124 24.12H22.1079C23.8841 23.9007 24.7347 23.5159 25.6071 21.6688L30.0862 10.5096C30.1209 10.4234 30.0609 10.3278 29.9722 10.3278H23.9969C23.2358 10.3603 22.8879 10.5591 22.5105 11.4717L20.7144 16.3415C20.5297 16.8759 20.3493 17.0752 19.8474 17.1259H2.86641C2.81691 17.1259 2.77217 17.157 2.75262 17.205Z" fill="#2628DD" />
					</svg>
				</div>

				{NavbarLinks.map((link: typeNavLink) => {
					const isActive = pathname === link.route;

					return (
					<NavLink key={link.label} to={link.route} className={`navbar__list__link ${ isActive && "active" }`}>
						{convertSvgToHtml(link.svg)}

						<span className="navbar__list__name">{link.label}</span>
					</NavLink>
					)
				})}
			
			</div>

			<NavLink className="navbar__list__link navbar__notification" to="/notifications">
				<svg className="navbar__list__icon" width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M24.1749 18.1125L22.9249 16.0375C22.6624 15.575 22.4249 14.7 22.4249 14.1875V11.025C22.4249 8.0875 20.6999 5.55 18.2124 4.3625C17.5624 3.2125 16.3624 2.5 14.9874 2.5C13.6249 2.5 12.3999 3.2375 11.7499 4.4C9.31243 5.6125 7.62493 8.125 7.62493 11.025V14.1875C7.62493 14.7 7.38743 15.575 7.12493 16.025L5.86243 18.1125C5.36243 18.95 5.24993 19.875 5.56243 20.725C5.86243 21.5625 6.57493 22.2125 7.49993 22.525C9.92493 23.35 12.4749 23.75 15.0249 23.75C17.5749 23.75 20.1249 23.35 22.5499 22.5375C23.4249 22.25 24.0999 21.5875 24.4249 20.725C24.7499 19.8625 24.6624 18.9125 24.1749 18.1125Z" />
					<path d="M18.5376 25.0125C18.0126 26.4625 16.6251 27.5 15.0001 27.5C14.0126 27.5 13.0376 27.1 12.3501 26.3875C11.9501 26.0125 11.6501 25.5125 11.4751 25C11.6376 25.025 11.8001 25.0375 11.9751 25.0625C12.2626 25.1 12.5626 25.1375 12.8626 25.1625C13.5751 25.225 14.3001 25.2625 15.0251 25.2625C15.7376 25.2625 16.4501 25.225 17.1501 25.1625C17.4126 25.1375 17.6751 25.125 17.9251 25.0875C18.1251 25.0625 18.3251 25.0375 18.5376 25.0125Z" />
				</svg>

				{data?.unread_notification_count > 0 && (
					<span className="navbar__notification__unread__length">{data.unread_notification_count}</span>
				)}
			</NavLink>
		</nav>
	)
}

export default Navbar