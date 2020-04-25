import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/theme-provider';
import { ITheme } from '../../types/ITheme';

const StyledHeader = styled.h1<ITheme & HeaderProps>`
	color: ${({ headerColor }) => headerColor};
	font: ${({ headerFont }) => headerFont};
	margin: ${({ margin }) => margin};
	text-align: center;
`;

export interface HeaderProps {
	margin?: string;
}

export const Header: React.FC<HeaderProps> = ({ children, margin, ...rest }) => {
	const theme = useTheme();

	return (
		<StyledHeader
			{...theme}
			margin={margin}
			{...rest}
		>
			{children}
		</StyledHeader>
	);
};
