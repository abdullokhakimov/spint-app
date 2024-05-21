import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/AuthContext";
import { getNextHour } from "../../utils";
import { useCreateBookingMutation } from "../../services/react-query/queries";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";


function FacilityDetailBook({selectedDate, selectedTimeRange, roomPrice, roomID}: { selectedDate: Date; selectedTimeRange: string[]; roomPrice: number; roomID: number}) {
	const { t } = useTranslation();
	
	const { user, isAuthenticated } = useUserContext();

	const date = () => {
     	const year = selectedDate.getFullYear()
		const month = selectedDate.getMonth()+1;
		const day = selectedDate.getDate();
		return `${year}-${month < 10 ? '0' + month : month}-${day}`
	}
	
	const { mutateAsync: mutateCreateBooking, status } = useCreateBookingMutation();	
	
  	const navigate = useNavigate();

	if (status === 'success') {
        navigate("/orders");
		toast.success(t("toast.booking__success"))
    }
	
	return (
		<div className="facility-details__bron">
			<div className="facility-details__bron__timeduration">
				{isAuthenticated == false ? (
					<Link to="/login"><span>{t("facility__detail.book.login")}</span></Link>	
				) : (
					selectedTimeRange.length > 0 ? (
						<span>{selectedTimeRange[0]} - {getNextHour(selectedTimeRange[selectedTimeRange.length - 1])}</span>
					) : user.is_owner == true ? (
						<span>{t("facility__detail.book.owner__permission")}</span>	
					) : (
						<span>{t("facility__detail.book.not__selected")}</span>	
					)
				)}
					
			</div>

			<button onClick={() => {mutateCreateBooking({ user: user.id, room: roomID, date: date(), timeRange: selectedTimeRange})}}  
				className={`facility-details__bron__submit ${!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' ? 'disabled' : ''}`}
				disabled={!isAuthenticated || selectedTimeRange.length === 0 || status === 'pending' || user.is_owner == true}
			>
				{ status === 'pending' ? (
					<span className="facility-details__bron__submit__text-loading">{t("facility__detail.book.booking")}</span>
				) : (
					<>
						<span className="facility-details__bron__submit__text">{t("facility__detail.book.tobook")}</span>
						{selectedTimeRange.length > 0 ? (
							<span className="facility-details__bron__submit__price">{roomPrice * selectedTimeRange.length} 000 {t("others.som")}</span>
						) : (
							<span className="facility-details__bron__submit__price">{roomPrice} 000 {t("others.som")}</span>
						)}
					</>
				)}
				
			</button>
		</div>
	)
}

export default FacilityDetailBook