/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import styled from 'styled-components';
import { ITheme } from '../../types/ITheme';
import { useTheme } from '../theme';

const ThemedButton = styled.button<ITheme & ButtonProps>`
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

	${({ disabled, buttonDisabledBackground }) => disabled ? `
	background: ${buttonDisabledBackground} !important;
	cursor: not-allowed !important;
	` : ''}
`;

export interface ButtonProps {
	onClick: (...params: unknown[]) => unknown;
	disabled?: boolean;
	children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
	const theme = useTheme();

	return <ThemedButton {...theme} {...rest}>{children}</ThemedButton>;
};
