import React, { useCallback, useEffect } from 'react';
import { useTransitionViewState, useAnimationDuration } from '../components/animations';
import { FadeIn } from '../components/fade-in';
import { Head } from '../components/head';
import { useRouter } from 'next/router';
import { ThemeProvider, endTheme } from '../components/theme';
import { Header } from '../components/basic-styled/header';
import { BodyText } from '../components/basic-styled/body-text';
import { Button } from '../components/basic-styled/button';
import { CenteredPage } from '../components/basic-styled/centered-page';
import {
	TextContainer,
	ButtonContainer
} from '../components/basic-styled/text-button-container';
import { useCaptcha } from '../components/hooks/use-captcha';

export default function Contribution() {
	useCaptcha('contribution_description');
	const router = useRouter();
	const { duration, getDelay } = useAnimationDuration(0.5);
	const { isInView, setView } = useTransitionViewState(true, duration);

	const handleOnContinue = useCallback(() => {
		setView(false, true, getDelay(4));
	}, [setView, getDelay]);

	useEffect(() => {
		if (isInView(false)) {
			router.push('/prompt');
		}
	}, [isInView, router]);

	return (
		<ThemeProvider value={endTheme}>
			<Head />
			<CenteredPage>
				<FadeIn
					inView={isInView(true)}
					animationDuration={duration}
					delay={getDelay(0)}
				>
					<Header>Contribute your dreams…</Header>
				</FadeIn>
				<TextContainer>
					<FadeIn
						inView={isInView(true)}
						animationDuration={duration}
						delay={getDelay(1)}
					>
						<BodyText>
							Thank you for playing through this experience and witnessing a glimpse of this land. Now it is your turn to continue the development of Emunah by submitting your own creative ideas. Emunah is a land where imagination and collaboration flow together and in order for that to happen we need your help.
						</BodyText>
					</FadeIn>
					<FadeIn
						inView={isInView(true)}
						animationDuration={duration}
						delay={getDelay(2)}
					>
						<BodyText>
							There will be a series of prompts that will be updated regularly and will be vastly different from one another. We hope to gather enough content from various locations and people in order to create a unique and imaginative world. The kind of content that will be generated could be anywhere from writing encounter card situations or stories to drawing a scene in any of the four regions of Emunah to illustrating creatures and characters who would roam the land.
						</BodyText>
					</FadeIn>
					<FadeIn
						inView={isInView(true)}
						animationDuration={duration}
						delay={getDelay(3)}
					>
						<BodyText>
							The creative choice is yours and you have the freedom to produce whatever you like in response to each prompt. Continue on to see how you can contribute your dreams to the Land of Emunah.
						</BodyText>
					</FadeIn>
					<FadeIn
						inView={isInView(true)}
						animationDuration={duration}
						delay={getDelay(4)}
					>
						<ButtonContainer>
							<Button onClick={handleOnContinue}>Continue!</Button>
						</ButtonContainer>
					</FadeIn>
				</TextContainer>
			</CenteredPage>
		</ThemeProvider>
	);
}
