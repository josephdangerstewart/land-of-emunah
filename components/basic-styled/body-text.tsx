import React from 'react';
import styled from 'styled-components';
import { ITheme } from '../../types/ITheme';
import { useTheme } from '../theme';

const P = styled.p<ITheme>`
	color: ${({ bodyColor }) => bodyColor};
	font: ${({ bodyFont }) => bodyFont};
`;

export const BodyText: React.FC = ({ children, ...rest }) => {
	const theme = useTheme();

	return <P {...theme} {...rest}>{children}</P>
}
