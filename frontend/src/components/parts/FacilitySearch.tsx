import { NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { SearchInputProps } from '../../types';
import { useTranslation } from 'react-i18next';

function FacilitySearch({ onSearch }: { onSearch: SearchInputProps['onSearch'] }) {
	const { t } = useTranslation();
	
	const debouncedSearch = debounce(onSearch, 500);

	return (
		<div className="filters__search">
			<svg className="filter__search__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M9.58317 17.5C13.9554 17.5 17.4998 13.9556 17.4998 9.58335C17.4998 5.2111 13.9554 1.66669 9.58317 1.66669C5.21092 1.66669 1.6665 5.2111 1.6665 9.58335C1.6665 13.9556 5.21092 17.5 9.58317 17.5Z" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M18.3332 18.3334L16.6665 16.6667" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
			
			<input onChange={e => debouncedSearch(e.target.value)} aria-label="Search" type="text" className="filter__search__input" placeholder={t('home.facility__search.filters__search__input__placeholder')} />

			<NavLink className="filter__notification-mobile" to="/notifications">
				<svg className="filter__notification-mobile__icon" width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14.0233 3.39502C10.1617 3.39502 7.02334 6.53335 7.02334 10.395V13.7667C7.02334 14.4784 6.72001 15.5634 6.35834 16.17L5.01668 18.3984C4.18834 19.775 4.76001 21.3034 6.27668 21.8167C11.305 23.4967 16.73 23.4967 21.7583 21.8167C23.17 21.35 23.7883 19.6817 23.0183 18.3984L21.6767 16.17C21.3267 15.5634 21.0233 14.4784 21.0233 13.7667V10.395C21.0233 6.54502 17.8733 3.39502 14.0233 3.39502Z" stroke="#242424" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" />
					<path d="M16.1817 3.73343C15.82 3.62843 15.4467 3.54676 15.0617 3.50009C13.9417 3.36009 12.8683 3.44176 11.865 3.73343C12.2033 2.87009 13.0433 2.26343 14.0233 2.26343C15.0033 2.26343 15.8433 2.87009 16.1817 3.73343Z" stroke="#242424" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
					<path d="M17.5233 22.2366C17.5233 24.1616 15.9483 25.7366 14.0233 25.7366C13.0667 25.7366 12.18 25.3399 11.55 24.7099C10.92 24.0799 10.5233 23.1932 10.5233 22.2366" stroke="#242424" strokeWidth="1.5" strokeMiterlimit={10} />
				</svg>	
			</NavLink>
		</div>
	);
}

export default FacilitySearch