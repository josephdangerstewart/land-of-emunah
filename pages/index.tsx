import React, { useCallback, useEffect } from 'react';
import { Head } from '../components/head';
import styled from 'styled-components';
import { generateAnimation, AnimationKind, useAnimationDuration } from '../components/animations';
import { AnimatableComponent } from '../types/AnimatableComponent';
import { useSetTimeout } from '../components/hooks/use-set-timeout';
import { useTransitionViewState } from '../components/animations';
import { Card } from '../components/card';
import { useRouter } from 'next/router';
import { useImageLoader } from '../components/hooks/use-image-loader';
import { useCaptcha } from '../components/hooks/use-captcha';

const LOGO_DISPLAY_DURATION = 4000;

const Image = styled.img<AnimatableComponent>`
	height: 100%;
	width: 100%;
	object-fit: contain;
	opacity: 0;
	${({ inView, animationDuration }) => inView
		? generateAnimation(AnimationKind.PopIn, animationDuration)
		: generateAnimation(AnimationKind.PopOut, animationDuration)}
`;

const Container = styled.div`
	height: calc(100% - 30px);
	padding: 15px 0;
`;

export default function Index() {
	useCaptcha('index');
	const { duration } = useAnimationDuration();
	const setTimeout = useSetTimeout();
	const logoSrc = useImageLoader('/images/homepage-logo.png');

	const { isInView, setView, shouldRenderView } = useTransitionViewState('logo', duration);
	const router = useRouter();

	const fadeOut = useCallback(() => {
		setView('intro');
		router.prefetch('/home');
	}, []);

	useEffect(() => {
		if (logoSrc) {
			setTimeout(fadeOut, LOGO_DISPLAY_DURATION);
		}
	}, [logoSrc]);

	const onContinue = useCallback(() => {
		setView('home');
	}, [router]);

	useEffect(() => {
		if (shouldRenderView('home')) {
			router.push('/home');
		}
	}, [shouldRenderView, router]);

	if (!logoSrc) {
		return (
			<Container>
				<Head />
			</Container>
		);
	}

	return (
		<Container>
			<Head />
			<Image
				inView={isInView('logo')}
				animationDuration={duration}
				src={logoSrc}
			/>
			{shouldRenderView('intro') && (
				<Card
					title="An Invitation To Adventure"
					bodyText="Outside of our physical realities, there are other worlds that exist within our creative minds and consciousness. This suggests that there is more than just the world we can physically see. Everything we fantasize is not contained in a physical world, but rather in something called imagination. However, as the creator, only you have access to your fantastical world. In order to share this imaginary world with others, we must provide a space to bring this world to life: a collaborative landscape of fantasy. We can combine our individual worlds of fantasy to build one imagined world together–a unified universe of creativity. The worlds that we build together are fantasy, but to us they are real."
					onContinue={onContinue}
					inView={isInView('intro')}
					animationDuration={duration}
				/>
			)}
		</Container>
	);
}
