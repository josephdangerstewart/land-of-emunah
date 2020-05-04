import React, { useMemo, useEffect, useState } from 'react';
import { Encounter, EncounterChoice } from '../../types/Encounter';

import {
	CardContainer,
	Overlay,
} from './card-elements';

import { CenteredPage } from '../basic-styled/centered-page';
import { CardFace, ChoiceButton } from './card';
import { AnimatableComponent } from '../../types/AnimatableComponent';
import { FadeIn } from '../fade-in';

export interface EncounterCardProps {
	encounter: Encounter;
	onContinue: (result?: EncounterChoice) => void;
	className?: string;
}

export const EncounterCard: React.FC<EncounterCardProps & AnimatableComponent> = ({
	encounter,
	onContinue,
	inView,
	animationDuration,
	delay,
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
			<CenteredPage responsiveMargins={false}>
				<FadeIn
					inView={inView}
					animationDuration={animationDuration}
					delay={delay}
				>
					<CardContainer flipped={view !== -1}>
						<CardFace
							title="ENCOUNTER"
							coverImageUrl={encounter.coverImageUrl}
							bodyText={encounter.description}
							buttons={mappedChoiceButtons}
							onContinue={onContinue}
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
								isBack
							/>
						))}
					</CardContainer>
				</FadeIn>
			</CenteredPage>
		</Overlay>
	);
};
