import React, { useState, useCallback } from 'react';
import { Head } from '../components/head';
import styled from 'styled-components';
import { generateAnimation, Animations } from '../components/animations';
import { useTimeout } from '../components/hooks/use-timeout';

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
	const [inView, setInView] = useState(true);

	const fadeOut = useCallback(
		() => setInView(false),
		[],
	);

	useTimeout(
		fadeOut,
		4000
	);

	return (
		<Container>
			<Head title="The Land of Emunah" />
			<Image inView={inView} src="/images/homepage-logo.png" />
		</Container>
	)
}
