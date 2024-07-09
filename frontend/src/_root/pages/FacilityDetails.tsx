import '../../styles/FacilityDetail.css'
import { useParams } from "react-router-dom";
import { useLoadFacilityDetailsQuery } from "../../services/react-query/queries";
import FacilityDetailHeader from "../../components/parts/FacilityDetails/FacilityDetailsHeader";
import FacilityDetailRoom from '../../components/shared/FacilityDetailsRoom';
import RoomTabs from '../../components/parts/FacilityDetails/FacilityDetailsRoomsTab';
import { useEffect, useState } from 'react';
import FacilityDetailsLocation from '../../components/parts/FacilityDetails/FacilityDetailsLocation';
import { Room } from '../../types';
import FacilityDetailsMaps from '../../components/parts/FacilityDetails/FacilityDetailsMap';
import FacilityDetailsSkeleton from '../../components/parts/FacilityDetails/FacilityDetailsSkeleton';
import FacilityDetailsContact from '../../components/parts/FacilityDetails/FacilityDetailsContact';
import NotFound from './NotFound';

function FacilityDetail() {
    const { id } = useParams<{ id: string | undefined}>();

    const { isLoading: isLoadingFacilityDetails, data: facilityDetails, error} = useLoadFacilityDetailsQuery({ id });
	
	const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

	useEffect(() => {
		if (facilityDetails && facilityDetails.rooms.length > 0) {
			setSelectedRoom(facilityDetails.rooms[0]);
		}
	}, [facilityDetails]);
	
	return (
        <section className="facility-details-wrap">
			{(id == undefined || ( isLoadingFacilityDetails == false && facilityDetails == undefined || error )) ? (
                <NotFound/>
            ) : isLoadingFacilityDetails ? (
				<>
					<FacilityDetailsSkeleton/>
				</>	
			) : facilityDetails && (
					<>
						<div className='facility-details'>
							<FacilityDetailHeader
								title={facilityDetails.title}
								image_url={facilityDetails.image_url}
								game={facilityDetails.game}
							/>

							<RoomTabs selectedRoomID={selectedRoom?.id} onSelectRoom={setSelectedRoom} rooms={facilityDetails.rooms} />

							{selectedRoom && <FacilityDetailRoom room={selectedRoom} startTime={facilityDetails.start_time} endTime={facilityDetails.end_time} facilityTitle={facilityDetails.title}/>}
						
							<FacilityDetailsLocation address={facilityDetails.address} address_url={facilityDetails.address_url}/>
						</div>

						<FacilityDetailsMaps addressCoordinates={facilityDetails.address_coordinates}/>

						<FacilityDetailsContact phoneNumber={facilityDetails.phone}/>
					</>
			)}
        </section>
    )
}


export default FacilityDetail