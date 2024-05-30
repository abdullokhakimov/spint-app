import '../../styles/FacilityDetail.css'
import { useParams } from "react-router-dom";
import { useLoadFacilityDetailsQuery } from "../../services/react-query/queries";
import FacilityDetailHeader from "../../components/parts/FacilityDetailHeader";
import FacilityDetailRoom from '../../components/shared/FacilityDetailRoom';
import RoomTabs from '../../components/parts/RoomsTab';
import { useEffect, useState } from 'react';
import FacilityDetailsLocation from '../../components/parts/FacilityDetailsLocation';
import { Room } from '../../types';
import FacilityDetailsMaps from '../../components/parts/FacilityDetailsMap';
import FacilityDetailsSkeleton from '../../components/parts/FacilityDetailsSkeleton';
import FacilityDetailsContact from '../../components/parts/FacilityDetailsContact';
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
			{(id == undefined || facilityDetails == undefined || error) ? (
                <NotFound/>
            ) : isLoadingFacilityDetails ? (
				<>
					<FacilityDetailsSkeleton/>
				</>	
			) : (
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