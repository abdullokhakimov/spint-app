
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './_auth/AuthLayout'
import { LoginForm, SignupForm, ActivateForm } from './_auth/forms'
import RootLayout from './_root/RootLayout'
import { Home, Notifications, Bookings, Profile, Teams, FacilityDetail } from './_root/pages'
import { Toaster } from 'sonner'

function App() {
	return (
		<>
			<Routes>
				<Route element={<AuthLayout/>}>
					<Route path="/login" element={<LoginForm/>}/>
					<Route path="/signup" element={<SignupForm/>}/>
					<Route path='/activate/:uid/:token' element={<ActivateForm/>} />
				</Route>

				<Route element={<RootLayout/>}>
					<Route index element={<Home/>}/>
					<Route path='/facility/:id' element={<FacilityDetail/>}/>
					<Route path="/teams" element={<Teams/>}/>
					<Route path="/bookings" element={<Bookings/>}/>
					<Route path="/profile" element={<Profile/>}/>
					<Route path="/notifications" element={<Notifications/>}/>
				</Route>
					
			</Routes>

			<Toaster position="top-right" expand={false} richColors/>
		</>
	)
}

export default App
