import React from 'react';
import styled from 'styled-components';
import { ITheme } from '../../types/ITheme';
import { useTheme } from '../theme';

const ThemedButton = styled.button<ITheme>`
	color: ${({ buttonColor }) => buttonColor};
	background: ${({ buttonBackground }) => buttonBackground};
	font: ${({ buttonFont }) => buttonFont};
	cursor: pointer;
	width: fit-content;
	padding: 6px 18px;
	outline: none;
	border: none;
	border-radius: 24px;

	&:hover {
		background: ${({ buttonHoverBackground }) => buttonHoverBackground};
	}
`;

export interface ButtonProps {
	onClick: () => void;
	disabled: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
	const theme = useTheme();

	return <ThemedButton {...theme} {...rest}>{children}</ThemedButton>
};
