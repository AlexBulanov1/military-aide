import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Toaster } from './components/ui/toaster';
import './index.css';
import TanstackQueryProvider from './providers/TanstackQueryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TanstackQueryProvider>
			<App />
		</TanstackQueryProvider>
		<Toaster />
	</React.StrictMode>,
);
