import React, { useEffect, useCallback } from 'react';
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
import { generateAnimation, AnimationKind, useTransitionViewState } from '../animations';
import { AnimatableComponent } from '../../types/AnimatableComponent';

const ANIMATION_DURATION = .75

const FadeIn = styled.div<AnimatableComponent>`
	${({ inView, animationDuration, delay }) => inView
		? generateAnimation(AnimationKind.FadeIn, animationDuration, delay)
		: generateAnimation(AnimationKind.FadeOut, animationDuration, delay)}
`;

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
	const { isInView, shouldRenderView, setView } = useTransitionViewState(true, ANIMATION_DURATION);

	useEffect(() => {
		if (shouldRenderView(false)) {
			onContinue();
		}
	}, [shouldRenderView]);

	const handleOnContinue = useCallback(() => {
		setView(false);
	}, [setView]);

	return (
		<CenteredPage>
			<Container>
				<FadeIn
					inView={isInView(true)}
					animationDuration={ANIMATION_DURATION}
				>
					<Header margin="0 0 15px">{title}</Header>
				</FadeIn>
				<FadeIn
					inView={isInView(true)}
					animationDuration={ANIMATION_DURATION}
					delay={.15}
				>
					<Image src={coverImageUrl} />
				</FadeIn>
				<TextContainer>
					<FadeIn
						inView={isInView(true)}
						animationDuration={ANIMATION_DURATION}
						delay={.3}
					>
						<BodyText>{bodyText}</BodyText>
						<ButtonContainer>
							<Button onClick={handleOnContinue}>
								{buttonText ?? 'Continue'}
							</Button>
						</ButtonContainer>
					</FadeIn>
				</TextContainer>
			</Container>
		</CenteredPage>
	)
}
