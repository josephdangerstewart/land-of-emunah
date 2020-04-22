import React from 'react';
import styled from 'styled-components';

const Outer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;



const Inner = styled.div<{ minHeight?: string }>`
	margin: auto;
	min-height: ${({ minHeight }) => minHeight}; 
`;

export const CenteredPage: React.FC<{ minHeight?: string }> = ({ children, minHeight }) => (
	<Outer>
		<Inner
			minHeight={minHeight}
		>
			{children}
		</Inner>
	</Outer>
)
