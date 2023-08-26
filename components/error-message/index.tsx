import React, { useCallback, useState, useMemo, useContext, useEffect } from 'react';
import { Card, ButtonContainer } from './styled';
import { CenteredPage } from '../basic-styled/centered-page';
import { Title as TitleCore, BodyText, Button, Overlay } from '../card';
import styled from 'styled-components';
import { useAnimationDuration, useTransitionViewState } from '../animations';
import { FadeIn } from '../fade-in';

const DEFAULT_ERROR_MESSAGE = 'Looks like you encountered an error that is preventing you from continuing on your journey! Please try again later.';

const Title = styled(TitleCore)`
	font-size: 38px;
`;

interface UseShowErrorHook {
	showError: (message?: string) => void;
}

const ErrorContext = React.createContext<UseShowErrorHook>({
	showError: () => null,
});

export const ErrorMessageProvider: React.FC<React.PropsWithChildren<never>> = ({ children }) => {
	const [error, setError] = useState('');
	const { duration } = useAnimationDuration();
	const { setView, isInView, shouldRenderView } = useTransitionViewState(false, duration);

	useEffect(() => {
		if (isInView(false)) {
			setError('');
		}
	}, [isInView, setError]);

	const showError = useCallback((message: string) => {
		setView(true, false);
		setError(message ?? DEFAULT_ERROR_MESSAGE);
	}, [setError]);

	const onGoBack = useCallback(() => {
		window.location.reload();
	}, [setView]);

	const contextValue = useMemo(() => ({ showError }), [showError]);

	return (
		<>
			<ErrorContext.Provider value={contextValue}>
				{children}
			</ErrorContext.Provider>
			{shouldRenderView(true) && (
				<Overlay>
					<CenteredPage>
						<FadeIn
							inView={isInView(true)}
							animationDuration={duration}
						>
							<Card>
								<Title>An Error Occurred!</Title>
								<BodyText>
									{error}
								</BodyText>
								<ButtonContainer>
									<Button onClick={onGoBack}>Reload</Button>
								</ButtonContainer>
							</Card>
						</FadeIn>
					</CenteredPage>
				</Overlay>
			)}
		</>
	);
};

export function useShowError(): UseShowErrorHook {
	return useContext(ErrorContext);
}
