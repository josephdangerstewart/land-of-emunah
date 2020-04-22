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
import { useImageLoader } from '../hooks/use-image-loader';
import { EncounterCard } from './encounter-card';

const ANIMATION_DURATION = .75

const FadeIn = styled.div<AnimatableComponent>`
	${({ inView, animationDuration, delay }) => inView
		? generateAnimation(AnimationKind.FadeIn, animationDuration, delay)
		: generateAnimation(AnimationKind.FadeOut, animationDuration, delay)}
`;

const AnimatedEncounterCard = styled(EncounterCard)<AnimatableComponent>`
	${({ inView, animationDuration }) => inView
		? generateAnimation(AnimationKind.FadeIn, animationDuration)
		: generateAnimation(AnimationKind.FadeOut, animationDuration)}
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
	encounter,
}) => {
	const { isInView, shouldRenderView, setView, addView } = useTransitionViewState('intro', ANIMATION_DURATION);
	const loadedCoverImageSrc = useImageLoader(coverImageUrl);

	useEffect(() => {
		if (shouldRenderView('continue')) {
			onContinue();
		}
	}, [shouldRenderView]);

	const handleOnContinue = useCallback(() => {
		setView('continue');
	}, [setView]);

	const handleOpenEncounter = useCallback(() => {
		addView('encounter');
	}, []);

	if (!loadedCoverImageSrc) {
		return null;
	}

	return (
		<CenteredPage>
			<Container>
				<FadeIn
					inView={isInView('intro')}
					animationDuration={ANIMATION_DURATION}
				>
					<Header margin="0 0 15px">{title}</Header>
				</FadeIn>
				<FadeIn
					inView={isInView('intro')}
					animationDuration={ANIMATION_DURATION}
					delay={.15}
				>
					<Image src={loadedCoverImageSrc} />
				</FadeIn>
				<TextContainer>
					<FadeIn
						inView={isInView('intro')}
						animationDuration={ANIMATION_DURATION}
						delay={.3}
					>
						<BodyText>{bodyText}</BodyText>
						<ButtonContainer>
							<Button onClick={encounter ? handleOpenEncounter : handleOnContinue}>
								{buttonText ?? 'Continue'}
							</Button>
						</ButtonContainer>
					</FadeIn>
				</TextContainer>
			</Container>
			{shouldRenderView('encounter') ? (
				<AnimatedEncounterCard
					encounter={encounter}
					onContinue={handleOnContinue}
					inView={isInView('encounter')}
					animationDuration={ANIMATION_DURATION}
				/>
			) : null}
		</CenteredPage>
	)
}
