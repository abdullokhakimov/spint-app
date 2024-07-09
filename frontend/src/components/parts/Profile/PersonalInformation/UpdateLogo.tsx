import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const UpdateLogo = ({ setUpdatedUser }: { setUpdatedUser: any }) => {
	const { t } = useTranslation();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files?.[0];

			if (file) {
				// File type restriction (e.g., JPEG, PNG)
				const validTypes = ['image/jpeg', 'image/png'];
				const maxSize = 2 * 1024 * 1024; // 2MB
				if (!validTypes.includes(file.type)) {
					toast.error(t("toast.profile__personal_information__upload_logo__type__error"));
					return;
				}else if (file.size > maxSize) {
					toast.error(t("toast.profile__personal_information__upload_logo__size__error"));
					return;
				}else{
					setUpdatedUser((prevUser: any) => ({
						...prevUser,
						logo: file,
					}));
					return;
				}
			}
		}
	};

	//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
	//     event.preventDefault();

	//     if (!selectedFile) {
	//       setMessage('Please select a file to upload.');
	//       return;
	//     }

	//     const formData = new FormData();
	//     formData.append('logo', selectedFile);
	//   }

	//     try {
	//       const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
	//       const response = await axios.patch('http://your-domain/api/users/me/', formData, {
	//         headers: {
	//           'Content-Type': 'multipart/form-data',
	//           Authorization: `Bearer ${token}`,
	//         },
	//       });

	//       if (response.status === 200) {
	//         setMessage('Logo updated successfully!');
	//         // Optionally update local state or context state with the new user data after successful update
	//         setUpdatedUser(prevUser => ({
	//           ...prevUser,
	//           logo_url: response.data.logo_url, // Assuming your API returns the updated logo_url
	//         }));
	//       }
	//     } catch (error) {
	//       setMessage('An error occurred while updating the logo.');
	//       console.error(error);
	//     }
	//   };

	return (
		<button className="personal-information__logo__add">
			<svg className="personal-information__logo__add__icon" width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.25 4.24984C12.8179 4.24984 12.4212 4.00192 12.2229 3.61942L11.7129 2.59234C11.3871 1.94775 10.5371 1.4165 9.81456 1.4165H8.19248C7.46289 1.4165 6.61289 1.94775 6.28706 2.59234L5.77706 3.61942C5.57873 4.00192 5.18206 4.24984 4.74998 4.24984C3.21289 4.24984 1.99456 5.54609 2.09373 7.07609L2.46206 12.9269C2.54706 14.3861 3.33331 15.5832 5.28831 15.5832H12.7116C14.6666 15.5832 15.4458 14.3861 15.5379 12.9269L15.9062 7.07609C16.0054 5.54609 14.7871 4.24984 13.25 4.24984ZM7.93748 5.13525H10.0625C10.3529 5.13525 10.5937 5.37609 10.5937 5.6665C10.5937 5.95692 10.3529 6.19775 10.0625 6.19775H7.93748C7.64706 6.19775 7.40623 5.95692 7.40623 5.6665C7.40623 5.37609 7.64706 5.13525 7.93748 5.13525ZM8.99998 12.8348C7.68248 12.8348 6.60581 11.7653 6.60581 10.4407C6.60581 9.11609 7.67539 8.0465 8.99998 8.0465C10.3246 8.0465 11.3941 9.11609 11.3941 10.4407C11.3941 11.7653 10.3175 12.8348 8.99998 12.8348Z" fill="#171717"/>
			</svg>
			
			<input className='personal-information__logo__add__input' type="file" onChange={handleFileChange}/>
			
			<label className="personal-information__logo__add__label">{t("profile.personal_information.change_logo")}</label>
			
			{/* <img src={previewUrl} alt="File preview" style={{ maxWidth: '100%', maxHeight: '200px' }} /> */}
		</button>
	);
	};

	export default UpdateLogo;