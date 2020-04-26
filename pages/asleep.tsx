import React, { useCallback } from 'react';
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

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default function Asleep() {
	const router = useRouter();

	const handleOnContinue = useCallback(() => {
		router.push('/contribution');
	}, [router]);

	return (
		<ThemeProvider value={endTheme}>
			<Head />
			<CenteredPage>
				<Container>
					<Header>You have fallen asleep</Header>
					<Button onClick={handleOnContinue}>Continue?</Button>
				</Container>
			</CenteredPage>
		</ThemeProvider>
	);
}
