import styled from 'styled-components';

export interface ColumnLayoutProps {
	maxWidth?: number;
	margin?: string;
	columnSpacing?: number;
}

export interface ColumnProps {
	padding?: string;
}

type Suffix = "px" | "em" | "%";

function optionalStyle<T>(key: keyof T, styleName: string, suffix?: Suffix) {
	return (obj: T) => obj[key] ? `${styleName}: ${obj[key]}${suffix ? suffix : ''};` : '';
}

export const Column = styled.div<ColumnProps>`
	flex-grow: 1;
	width: 100%;

	${optionalStyle('padding', 'padding')}
`;

export const ColumnLayout = styled.div<ColumnLayoutProps>`
	display: flex;

	${optionalStyle('maxWidth', 'max-width', 'px')}
	${optionalStyle('margin', 'margin')}

	${({ columnSpacing }) => columnSpacing ? `
		${Column} {
			margin: 0 ${columnSpacing}px;

			&:first-child {
				margin-left: 0;
			}

			&:last-child {
				margin-right: 0;
			}
		}
	` : ''}
`;
