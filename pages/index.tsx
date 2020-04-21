import React, { useCallback, useEffect } from 'react';
import { Head } from '../components/head';
import styled from 'styled-components';
import { generateAnimation, AnimationKind } from '../components/animations';
import { AnimatableComponent } from '../types/AnimatableComponent';
import { useTimeout } from '../components/hooks/use-timeout';
import { useTransitionViewState } from '../components/animations';
import { Card } from '../components/card';
import { useRouter } from 'next/router';

const ANIMATION_DURATION = 1.25;

const Image = styled.img<AnimatableComponent>`
	height: 100%;
	width: 100%;
	object-fit: contain;
	opacity: 0;
	${({ inView, animationDuration }) => inView
		? generateAnimation(AnimationKind.PopIn, animationDuration)
		: generateAnimation(AnimationKind.PopOut, animationDuration)}
`;

const AnimatedCard = styled(Card)<AnimatableComponent>`
	${({ inView, animationDuration }) => inView
		? generateAnimation(AnimationKind.PopIn, animationDuration)
		: generateAnimation(AnimationKind.PopOut, animationDuration)}
`;

const Container = styled.div`
	height: calc(100% - 30px);
	padding: 15px 0;
`;

export default function Index() {
	const { view, setView, nextView } = useTransitionViewState('logo', ANIMATION_DURATION);
	const router = useRouter();

	const fadeOut = useCallback(() => {
		setView('intro');
		router.prefetch('/home');
	}, []);

	useTimeout(fadeOut, 4000);

	const onContinue = useCallback(() => {
		setView('home');
	}, [router]);

	useEffect(() => {
		if (view === 'home') {
			router.push('/home');
		}
	}, [view, router]);

	return (
		<Container>
			<Head title="The Land of Emunah" />
			<Image
				inView={view === 'logo' && nextView === view}
				animationDuration={ANIMATION_DURATION}
				src="/images/homepage-logo.png"
			/>
			{view === 'intro' && (
				<AnimatedCard
					title="An Invitation To Adventure"
					bodyText="Outside of our physical realities, there are other worlds that exist within our creative minds and consciousness. This suggests that there is more than just the world we can physically see. Everything we fantasize is not contained in a physical world, but rather in something called imagination. However, as the creator, only you have access to your fantastical world. In order to share this imaginary world with others, we must provide a space to bring this world to life: a collaborative landscape of fantasy. We can combine our individual worlds of fantasy to build one imagined world together–a unified universe of creativity. The worlds that we build together are fantasy, but to us they are real."
					onContinue={onContinue}
					inView={view === 'intro' && nextView === view}
					animationDuration={ANIMATION_DURATION}
				/>
			)}
		</Container>
	)
}
