/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../basic-styled/header';
import { BodyText } from '../basic-styled/body-text';
import { Button } from '../basic-styled/button';
import { CenteredPage } from '../basic-styled/centered-page';
import { Encounter, EncounterChoice } from '../../types/Encounter';
import {
	Image,
	Container,
} from './styled';
import { generateAnimation, AnimationKind, useTransitionViewState, useAnimationDuration } from '../animations';
import { AnimatableComponent } from '../../types/AnimatableComponent';
import { useImageLoader } from '../hooks/use-image-loader';
import { EncounterCard } from '../card';
import { FadeIn } from '../fade-in';
import { TextContainer, ButtonContainer } from '../basic-styled/text-button-container';

const AnimatedEncounterCard = styled(EncounterCard)<AnimatableComponent>`
	${({ inView, animationDuration }) => inView
		? generateAnimation(AnimationKind.FadeIn, animationDuration)
		: generateAnimation(AnimationKind.FadeOut, animationDuration)}
`;

const AnimatedButton = styled(Button)<{ duration: number }>`
	${({ disabled, duration }) => disabled ? 'visibility: hidden;' : generateAnimation(AnimationKind.FadeIn, duration)}
`;

export interface LocationProps {
	title: string;
	bodyText: string;
	coverImageUrl: string;
	encounter?: Encounter;
	buttonText?: string;
	onContinue: (result?: EncounterChoice) => any;
	expectingEncounter?: boolean;
	onOpenEncounter?: () => any;
}

export const Location: React.FC<LocationProps> = ({
	title,
	bodyText,
	coverImageUrl,
	buttonText,
	onContinue,
	encounter,
	expectingEncounter,
	onOpenEncounter,
}) => {
	const { duration } = useAnimationDuration();
	const { isInView, shouldRenderView, setView, addView } = useTransitionViewState('intro', duration);
	const loadedCoverImageSrc = useImageLoader(coverImageUrl);
	const [result, setResult] = useState<EncounterChoice>();

	useEffect(() => {
		if (shouldRenderView('continue')) {
			onContinue(result);
		}
	}, [shouldRenderView]);

	const handleOnContinue = useCallback((result: EncounterChoice) => {
		setResult(result);
		setView('continue');
	}, [setView]);

	const handleOpenEncounter = useCallback(() => {
		if (onOpenEncounter) {
			onOpenEncounter();
		}

		addView('encounter');
	}, [onOpenEncounter]);

	if (!loadedCoverImageSrc) {
		return null;
	}

	return (
		<CenteredPage>
			<Container>
				<FadeIn
					inView={isInView('intro')}
					animationDuration={duration}
				>
					<Header margin="0 0 15px">{title}</Header>
				</FadeIn>
				<FadeIn
					inView={isInView('intro')}
					animationDuration={duration}
					delay={.15}
				>
					<Image src={loadedCoverImageSrc} />
				</FadeIn>
				<TextContainer>
					<FadeIn
						inView={isInView('intro')}
						animationDuration={duration}
						delay={.3}
					>
						<BodyText>{bodyText}</BodyText>
						<ButtonContainer>
							<AnimatedButton
								onClick={(encounter || expectingEncounter) ? handleOpenEncounter : handleOnContinue}
								disabled={!encounter && expectingEncounter}
								duration={duration}
							>
								{buttonText ?? 'Continue'}
							</AnimatedButton>
						</ButtonContainer>
					</FadeIn>
				</TextContainer>
			</Container>
			{shouldRenderView('encounter') ? (
				<AnimatedEncounterCard
					encounter={encounter}
					onContinue={handleOnContinue}
					inView={isInView('encounter')}
					animationDuration={duration}
				/>
			) : null}
		</CenteredPage>
	);
};
