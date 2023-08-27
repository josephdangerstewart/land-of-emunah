import React, { useEffect, useCallback, useState } from 'react';
import { Header as HeaderCore } from '../basic-styled/header';
import { BodyText } from '../basic-styled/body-text';
import { Button } from '../basic-styled/button';
import { CenteredPage } from '../basic-styled/centered-page';
import { Encounter, EncounterChoice } from '../../types/Encounter';
import {
	Image,
	Container,
} from './styled';
import { useTransitionViewState, useAnimationDuration } from '../animations';
import { useImageLoader } from '../hooks/use-image-loader';
import { EncounterCard } from '../card';
import { FadeIn } from '../fade-in';
import { TextContainer, ButtonContainer } from '../basic-styled/text-button-container';
import { ColumnLayout, Column } from '../basic-styled/column-layout';
import styled from 'styled-components';

const Header = styled(HeaderCore)`
	@media (max-width: 680px) {
		margin-top: 18px;
	}
`;

export interface LocationProps {
	title: string;
	locationId: string;
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
	locationId,
}) => {
	const { duration, getDelay } = useAnimationDuration(0.35);
	const { isInView, shouldRenderView, setView, addView } = useTransitionViewState('intro', duration);
	const loadedCoverImageSrc = useImageLoader(coverImageUrl);
	const [result, setResult] = useState<EncounterChoice>();

	useEffect(() => {
		setView('intro', false);
	}, [locationId]);

	useEffect(() => {
		if (shouldRenderView('continue')) {
			onContinue(result);
		}
	}, [shouldRenderView]);

	const handleOnContinue = useCallback(async (result: EncounterChoice) => {
		setResult(result);
		setView('continue', true, getDelay(2));
	}, [setView]);

	const handleOpenEncounter = useCallback(() => {
		if (onOpenEncounter) {
			onOpenEncounter();
		}

		addView('encounter');
	}, [onOpenEncounter]);

	const isEncounterLoading = expectingEncounter && !encounter;

	if (!loadedCoverImageSrc) {
		return null;
	}

	return (
		<CenteredPage>
			<ColumnLayout margin="0 32px">
				<Column>
					<FadeIn
						inView={isInView('intro')}
						animationDuration={duration}
						delay={getDelay(0)}
					>
						<Image src={loadedCoverImageSrc} />
					</FadeIn>
				</Column>
				<Column>
					<Container>
						<FadeIn
							inView={isInView('intro')}
							animationDuration={duration}
							delay={getDelay(1)}
						>
							<Header margin="0 0 15px">{title}</Header>
						</FadeIn>
						<TextContainer>
							<FadeIn
								inView={isInView('intro')}
								animationDuration={duration}
								delay={getDelay(2)}
							>
								<BodyText>{bodyText}</BodyText>
							</FadeIn>
							<ButtonContainer>
								<FadeIn
									inView={isInView('intro')}
									animationDuration={duration}
									delay={getDelay(3)}
								>
									<Button
										onClick={(encounter || expectingEncounter) ? handleOpenEncounter : handleOnContinue}
										disabled={isEncounterLoading}
									>
										{isEncounterLoading ? 'Loading...' : (buttonText ?? 'Continue')}
									</Button>
								</FadeIn>
							</ButtonContainer>
						</TextContainer>
					</Container>
				</Column>
			</ColumnLayout>
			{shouldRenderView('encounter') ? (
				<EncounterCard
					encounter={encounter}
					onContinue={handleOnContinue}
					inView={isInView('encounter')}
					animationDuration={duration}
				/>
			) : null}
		</CenteredPage>
	);
};
