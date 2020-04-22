import React, { useMemo, useEffect } from 'react';
import { Encounter, EncounterChoice } from '../../types/Encounter';

import {
	CardContainer,
	Overlay,
} from './card-elements';

import { CenteredPage } from '../basic-styled/centered-page';
import { CardFace, ChoiceButton } from './card';
import { useTransitionViewState } from '../animations';

const ANIMATION_DURATION = 0.75;

export interface EncounterCardProps {
	encounter: Encounter;
	onContinue: (result?: EncounterChoice) => void;
	className?: string;
}

export const EncounterCard: React.FC<EncounterCardProps> = ({
	encounter,
	onContinue,
	className,
}) => {
	const { setView, isInView } = useTransitionViewState(-1, ANIMATION_DURATION);

	const mappedChoiceButtons = useMemo<ChoiceButton[]>(
		() => encounter.choices?.map((choice, index) => ({
			text: choice.choiceText,
			backgroundColor: choice.buttonBackgroundColor,
			onClick: () => setView(index),
		})
	), [encounter.choices, setView]);

	useEffect(() => {
		setView(-1, false);
	}, [encounter.choices]);

	return (
		<Overlay>
			<CenteredPage minHeight="min(80%, 880px)">
				<CardContainer className={className}>
					<CardFace
						title="ENCOUNTER"
						coverImageUrl={encounter.coverImageUrl}
						bodyText={encounter.description}
						buttons={mappedChoiceButtons}
						onContinue={onContinue}
						visible={isInView(-1)}
					/>
					{encounter.choices?.map((choice, index) => (
						<CardFace
							title="ENCOUNTER"
							coverImageUrl={encounter.coverImageUrl}
							bodyText={choice.result}
							onContinue={() => onContinue(choice)}
							visible={isInView(index)}
							key={choice.choiceText}
						/>
					))}
				</CardContainer>
			</CenteredPage>
		</Overlay>
	)
}
