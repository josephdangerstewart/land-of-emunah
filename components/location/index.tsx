import React from 'react';
import styled from 'styled-components';
import { Header } from '../basic-styled/header';
import { BodyText } from '../basic-styled/body-text';
import { Button } from '../basic-styled/button';
import { CenteredPage } from '../basic-styled/centered-page';
import { Encounter } from '../../types/Encounter';

import {
	Image,
	TextContainer,
	Container,
	ButtonContainer,
} from './styled';

export interface LocationProps {
	title: string;
	bodyText: string;
	coverImageUrl: string;
	encounter?: Encounter;
	buttonText?: string;
	onContinue: () => void;
}

export const Location: React.FC<LocationProps> = ({
	title,
	bodyText,
	coverImageUrl,
	buttonText,
	onContinue,
}) => {
	return (
		<CenteredPage>
			<Container>
				<Header margin="0 0 15px">{title}</Header>
				<div>
					<Image src={coverImageUrl} />
				</div>
				<TextContainer>
					<BodyText>{bodyText}</BodyText>
					<ButtonContainer>
						<Button onClick={onContinue}>
							{buttonText ?? 'Continue'}
						</Button>
					</ButtonContainer>
				</TextContainer>
			</Container>
		</CenteredPage>
	)
}
