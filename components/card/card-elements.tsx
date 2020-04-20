import styled from 'styled-components';
import { lighten } from 'polished';

export const CardContainer = styled.div`
	max-width: 470px;
	min-height: min(80%, 880px);
	max-height: 880px;
	height: fit-content;
	background-color: #E0D2A8;
	border: 4px solid #67614E;
	padding: 20px 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 6px;
	margin-top: 30px;
`;

export const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const BodyText = styled.p`
	padding: 10px;
	background-color: #FDF6E3;
	color: #375147;
	border-radius: 6px;
	font: 18px 'Averia Serif Libre', cursive;
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
	background-color: #BFAD74;
	color: #375147;
	transition: background-color .25s;
	cursor: pointer;
	border-radius: 12px;
	font: 22px 'Averia Serif Libre', cursive;
	width: fit-content;

	&:hover {
		background-color: ${lighten(0.1, '#BFAD74')}
	}
`;
