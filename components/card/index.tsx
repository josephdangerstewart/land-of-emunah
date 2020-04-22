import React from 'react';
import {
	CardContainer,
	Title,
	BodyText,
	Button,
	Overlay,
} from './card-elements';
import { FlexSpacer } from '../basic-styled/flex-spacer';
import { CenteredPage } from '../basic-styled/centered-page';

export interface CardProps {
	title: string;
	bodyText?: string;
	onContinue: () => void;
	className?: string;
}

export const Card: React.FC<CardProps> = ({ title, bodyText, onContinue, className }) => {
	return (
		<Overlay>
			<CenteredPage minHeight="min(80%, 880px)">
				<CardContainer className={className}>
					<Title>{title}</Title>
					{bodyText && <BodyText>{bodyText}</BodyText>}
					<FlexSpacer />
					<Button onClick={onContinue}>Continue</Button>
				</CardContainer>
			</CenteredPage>
		</Overlay>
	);
}
