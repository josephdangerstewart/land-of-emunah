import React from 'react';
import {
	CardContainer,
	Title,
	BodyText,
	Button,
	Overlay,
} from './card-elements';
import { FlexSpacer } from '../basic-styled/flex-spacer';

export interface CardProps {
	title: string;
	bodyText?: string;
	onContinue: () => void;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ title, bodyText, onContinue, className }) => {
	return (
		<Overlay>
			<CardContainer className={className}>
				<Title>{title}</Title>
				{bodyText && <BodyText>{bodyText}</BodyText>}
				<FlexSpacer />
				<Button onClick={onContinue}>Continue</Button>
			</CardContainer>
		</Overlay>
	);
}
