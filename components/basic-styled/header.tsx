import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../theme/theme-provider';
import { ITheme } from '../../types/ITheme';

const StyledHeader = styled.h1<ITheme>`
	color: ${({ headerColor }) => headerColor};
	font: ${({ headerFont }) => headerFont};
`;

export const Header: React.FC = ({ children, ...rest }) => {
	const theme = useTheme();

	return (
		<StyledHeader
			headerColor={theme.headerColor}
			headerFont={theme.headerFont}
			{...rest}
		>
			{children}
		</StyledHeader>
	)
}
