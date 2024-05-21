import { ModalProps } from "../../types"

const Modal: React.FC<ModalProps> = ({ showModal, onModalClose, title, children }) => {
	const handleModalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};
	
	return (
		<div onClick={onModalClose} className={`filter__selection__gametype__options ${showModal ? 'active' : ''}`} aria-modal={showModal}>
			<div onClick={handleModalContentClick} className="filter__selection__gametype__options__modal">
				<div className="filter__selection__gametype__options__title">
					<h3 className="filter__selection__gametype__options__title__text">{ title }</h3>
								
					<button onClick={onModalClose}>
						<svg className="filter__selection__gametype__options__title__icon-close" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 16L16 1" strokeLinecap="round" strokeLinejoin="round" />
							<path d="M16 16L1 1" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>	
				</div>

				{ children }			
			</div>
		</div>
  )
}

export default Modal