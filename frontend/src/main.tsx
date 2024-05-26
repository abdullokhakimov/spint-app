import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/style.css'
import './i18n';

import { BrowserRouter } from 'react-router-dom'
import { QueryProvider } from './services/react-query/queryProvider.tsx'
import AuthProvider from './context/AuthContext.tsx'
import { SkeletonTheme } from 'react-loading-skeleton'
import { HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SkeletonTheme baseColor="#F4F4F4" highlightColor="#fff">
		<HelmetProvider>
			<BrowserRouter>
				<QueryProvider>
					<AuthProvider>
						<App />		
					</AuthProvider>
				</QueryProvider>
			</BrowserRouter>
		</HelmetProvider>	
	</SkeletonTheme>
)
