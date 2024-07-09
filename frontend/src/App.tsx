
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import { LoginForm, SignupForm, ActivateForm, ResetPasswordForm } from './_auth/forms'
import RootLayout from './_root/RootLayout'
import { Home, Notifications, Bookings, Profile, Teams, FacilityDetails, NotFound } from './_root/pages'
import { Toaster } from 'sonner'
import ForPartners from './_root/pages/ForPartners'
import PersonalInformation from './_root/pages/PersonalInformation'

function App() {
	return (
		<>
			<Routes>
				<Route element={<AuthLayout/>}>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/signup" element={<SignupForm/>}/>
					<Route path='/activate/:uid/:token' element={<ActivateForm/>} />
					<Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordForm/>} />
				</Route>

				<Route element={<RootLayout/>}>
					<Route index element={<Home/>}/>
					<Route path='/facility/:id' element={<FacilityDetails/>}/>
					<Route path="/teams" element={<Teams/>}/>
					<Route path="/bookings" element={<Bookings/>}/>
					<Route path="/bookings/:uuid" element={<Bookings/>} />
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/notifications" element={<Notifications/>}/>
				</Route>

				<Route path="/for-partners" element={<ForPartners/>}/>
				<Route path="/profile/personal-information" element={<PersonalInformation/>}/>
				<Route path="*" element={<NotFound/>} />

			</Routes>

			<Toaster position="top-right" expand={false} richColors/>
		</>
	)
}

export default App
