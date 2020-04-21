import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Inner = styled.div`
	margin: auto;
`;

export const CenteredPage: React.FC = ({ children }) => (
	<Outer>
		<Inner>
			{children}
		</Inner>
	</Outer>
)
