import React from 'react';
import { Encounter, EncounterChoice } from '../../types/Encounter';

import {
	CardContainer,
	Title,
	BodyText,
	Button,
	Overlay,
	CoverImage,
} from './card-elements';

import { CenteredPage } from '../basic-styled/centered-page';
import { CardFace } from './card';

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
	return (
		<Overlay>
			<CenteredPage minHeight="min(80%, 880px)">
				<CardContainer className={className}>
					<CardFace
						title="ENCOUNTER"
						coverImageUrl={encounter.coverImageUrl}
						bodyText={encounter.description}
						onContinue={onContinue}
					/>
				</CardContainer>
			</CenteredPage>
		</Overlay>
	)
}
