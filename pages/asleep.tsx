import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import {
	ThemeProvider,
	endTheme,
} from '../components/theme';
import { Head } from '../components/head';
import { Header } from '../components/basic-styled/header';
import { CenteredPage } from '../components/basic-styled/centered-page';
import { Button } from '../components/basic-styled/button';
import { useRouter } from 'next/router';
import { useTransitionViewState, useAnimationDuration } from '../components/animations';
import { FadeIn } from '../components/fade-in';
import { useCaptcha } from '../components/hooks/use-captcha';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function Asleep() {
	const router = useRouter();
	const { getDelay, duration } = useAnimationDuration(0.5);
	const { isInView, setView } = useTransitionViewState(true, duration);
	useCaptcha('asleep');

	const handleOnContinue = useCallback(() => {
		setView(false, true, getDelay(1));
	}, [isInView]);

	useEffect(() => {
		if (isInView(false)) {
			router.push('/contribution');
		}
	}, [isInView]);

	return (
		<ThemeProvider value={endTheme}>
			<Head />
			<CenteredPage>
				<Container>
					<FadeIn
						inView={isInView(true)}
						animationDuration={duration}
						delay={getDelay(0)}
					>
						<Header>You have fallen asleep</Header>
					</FadeIn>
					<FadeIn
						inView={isInView(true)}
						animationDuration={duration}
						delay={getDelay(1)}
					>
						<Button onClick={handleOnContinue}>Continue?</Button>
					</FadeIn>
				</Container>
			</CenteredPage>
		</ThemeProvider>
	);
}
