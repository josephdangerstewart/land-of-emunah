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
import { useTransitionViewState } from '../components/animations';
import { FadeIn } from '../components/fade-in';

const ANIMATION_DURATION = 0.75;

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function Asleep() {
	const router = useRouter();
	const { isInView, setView } = useTransitionViewState(true, ANIMATION_DURATION);

	const handleOnContinue = useCallback(() => {
		setView(false);
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
						animationDuration={ANIMATION_DURATION}
						delay={0.5}
					>
						<Header>You have fallen asleep</Header>
					</FadeIn>
					<FadeIn
						inView={isInView(true)}
						animationDuration={ANIMATION_DURATION}
						delay={0.65}
					>
						<Button onClick={handleOnContinue}>Continue?</Button>
					</FadeIn>
				</Container>
			</CenteredPage>
		</ThemeProvider>
	);
}
