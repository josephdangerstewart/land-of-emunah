import React from 'react';
import styled from 'styled-components';

const ScrollBoundary = styled.div`
	overflow: hidden;
	width: 100%;
	height: 100%;
`;

const Outer = styled.div<{ responsiveMargins?: boolean }>`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: auto;

	${({ responsiveMargins }) => responsiveMargins ? `
		@media (max-width: 680px) {
			padding: 12px 0;
		}
	` : ''}
`;

const Inner = styled.div<{ minHeight?: string }>`
	margin: auto;
	overflow: visible;
	width: 100%;
	min-height: ${({ minHeight }) => minHeight}; 
`;

export const CenteredPage: React.FC<React.PropsWithChildren<{ minHeight?: string; responsiveMargins?: boolean }>> = ({
	children,
	minHeight,
	responsiveMargins = true,
}) => (
	<ScrollBoundary>
		<Outer responsiveMargins={responsiveMargins}>
			<Inner
				minHeight={minHeight}
			>
				{children}
			</Inner>
		</Outer>
	</ScrollBoundary>
);
