import React from 'react';
import NextHead from 'next/head';
import { useTheme } from './theme';

export interface HeadProps {
	title?: string;
}

export const Head: React.FC<HeadProps> = ({ title }) => {
	const theme = useTheme();

	return (
		<>
			<NextHead>
				<title>{title ?? 'The Land of Emunah'}</title>

				{/* font-family: 'Averia Serif Libre', cursive; */}
				<link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css2?family=Trade+Winds&display=swap" rel="stylesheet"></link>
			</NextHead>
			{/* eslint-disable-next-line react/no-unknown-property */}
			<style jsx global>{`
				* {
					box-sizing: border-box;
					-webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
					-webkit-overflow-scrolling: touch;
				}

				html, body, #__next {
					height: 100%;
					padding: 0;
					margin: 0;
				}

				body {
					background: ${theme.background};
				}

				.grecaptcha-badge {
					visibility: collapse !important;
					z-index: -100000 !important;
				}
			`}</style>
		</>
	);
};
