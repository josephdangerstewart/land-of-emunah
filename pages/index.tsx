import React, { useState, useCallback } from 'react';
import { Head } from '../components/head';
import styled from 'styled-components';
import { generateAnimation, Animations } from '../components/animations';
import { useTimeout } from '../components/hooks/use-timeout';
import { Card } from '../components/card';

interface ImageProps {
	inView: boolean;
}

const Image = styled.img<ImageProps>`
	height: 100%;
	width: 100%;
	object-fit: contain;
	opacity: 0;
	${({ inView }) => inView
		? generateAnimation(Animations.PopIn, 1.5)
		: generateAnimation(Animations.PopOut, 1.5)}
`;

const Container = styled.div`
	height: calc(100% - 30px);
	padding: 15px 0;
`;

export default function Index() {
	const [view, setView] = useState('logo');

	const fadeOut = useCallback(
		() => setView('intro'),
		[],
	);

	useTimeout(
		fadeOut,
		4000
	);

	return (
		<Container>
			<Head title="The Land of Emunah" />
			<Image inView={view === 'logo'} src="/images/homepage-logo.png" />
			{view === 'intro' && (
				<Card
					title="An Invitation To Adventure"
					bodyText="Outside of our physical realities, there are other worlds that exist within our creative minds and consciousness. This suggests that there is more than just the world we can physically see. Everything we fantasize is not contained in a physical world, but rather in something called imagination. However, as the creator, only you have access to your fantastical world. In order to share this imaginary world with others, we must provide a space to bring this world to life: a collaborative landscape of fantasy. We can combine our individual worlds of fantasy to build one imagined world together–a unified universe of creativity. The worlds that we build together are fantasy, but to us they are real."
					onContinue={() => setView('next-boi')}
				/>
			)}
		</Container>
	)
}
