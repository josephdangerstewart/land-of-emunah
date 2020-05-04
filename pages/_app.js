import React from 'react';
import { ErrorMessageProvider } from '../components/error-message';

export default function App({ Component, pageProps }) {
	return (
		<ErrorMessageProvider>
			<Component {...pageProps} />
		</ErrorMessageProvider>
	);
}
