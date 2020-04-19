import { keyframes } from 'styled-components';

export const popIn = keyframes`
	0% {
		transform: scale(0.2);
		opacity: 0;
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
`;

export const popOut = keyframes`
	0% {
		transform: scale(1);
		opacity: 1;
	}

	100% {
		transform: scale(0.2);
		opacity: 0;
	}
`;
