import React, { useMemo, useEffect, useState } from 'react';
import { Encounter, EncounterChoice } from '../../types/Encounter';

import {
	CardContainer,
	Overlay,
} from './card-elements';

import { CenteredPage } from '../basic-styled/centered-page';
import { CardFace, ChoiceButton } from './card';

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
	const [view, setView] = useState(-1);

	const mappedChoiceButtons = useMemo<ChoiceButton[]>(
		() => encounter.choices?.map((choice, index) => ({
			text: choice.choiceText,
			backgroundColor: choice.buttonBackgroundColor,
			onClick: () => setView(index),
		})
	), [encounter.choices, setView]);

	useEffect(() => {
		setView(-1);
	}, [encounter.choices]);

	return (
		<Overlay>
			<CenteredPage minHeight="min(80%, 880px)" responsiveMargins={false}>
				<CardContainer className={className}>
					<CardFace
						title="ENCOUNTER"
						coverImageUrl={encounter.coverImageUrl}
						bodyText={encounter.description}
						buttons={mappedChoiceButtons}
						onContinue={onContinue}
						flipped={view !== -1}
						visible
					/>
					{encounter.choices?.map((choice, index) => (
						<CardFace
							title="ENCOUNTER"
							coverImageUrl={encounter.coverImageUrl}
							bodyText={choice.result}
							onContinue={() => onContinue(choice)}
							visible={view === index}
							key={choice.choiceText}
							flipped={view === -1}
							isBack
						/>
					))}
				</CardContainer>
			</CenteredPage>
		</Overlay>
	);
};
