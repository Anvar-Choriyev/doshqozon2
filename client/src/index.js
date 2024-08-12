import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/assets/style/style.css';
import { BrowserRouter } from "react-router-dom"
import AppContextProvider from './context/AppContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<AppContextProvider>
			<App />
		</AppContextProvider>
	</BrowserRouter>
);