import styled from 'styled-components';
import { lighten } from 'polished';

export const CardContainer = styled.div`
	max-width: 470px;
	min-height: 100%;
	max-height: 880px;
	height: fit-content;

	display: flex;
	flex-flow: row nowrap;
`;

export const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	overflow: hidden;
`;

export const CoverImage = styled.img`
	width: 100%;
	height: 225px;
	object-fit: cover;
`;

export const BodyText = styled.p`
	padding: 10px;
	background-color: #FDF6E3;
	color: #375147;
	border-radius: 6px;
	font: 18px 'Averia Serif Libre', cursive;
	width: 100%;
	flex-grow: 1;
`;

export const Title = styled.h1`
	margin: 0;
	padding: 0;
	color: #375147;
	text-align: center;
	font: 45px 'Trade Winds', cursive;
`;

export const Button = styled.button`
	padding: 8px 20px;
	margin: 0;
	border: none;
	outline: none;
	background-color: #FFE9AC;
	color: #375147;
	transition: background-color .25s;
	cursor: pointer;
	border-radius: 12px;
	font: 22px 'Averia Serif Libre', cursive;
	width: fit-content;

	&:hover {
		background-color: ${lighten(0.1, '#FFE9AC')}
	}
`;

export const ChoiceButton = styled(Button)<{ backgroundColor?: string }>`
	flex: 1 0 calc(49% - 8px);
	background-color: ${({ backgroundColor }) => backgroundColor};
	margin: 4px;

	${({ backgroundColor }) => backgroundColor ? `
		&:hover {
			background-color: ${lighten(0.1, backgroundColor)}
		}
	`: ''}
`;

export const ButtonsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const FaceContainer = styled.div<{ visible: boolean; isBack?: boolean; flipped?: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #E0D2A8;
	border: 4px solid #67614E;
	padding: 20px 40px;
	border-radius: 6px;
	transition: transform 0.6s;
	transform-style: preserve-3d;
	backface-visibility: hidden;

	width: 100%;
    flex: none;

	${({ isBack }) => isBack ? 'margin-left: -100%; backface-visibility: visible; z-index: -1;' : ''}
	${({ visible }) => !visible ? 'visibility: hidden;' : ''}

	${({ flipped }) => flipped ? 'transform: rotateY(180deg);' : ''}
`;
