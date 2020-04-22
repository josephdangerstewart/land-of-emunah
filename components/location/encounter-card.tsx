import React from 'react';
import { Encounter, EncounterChoice } from '../../types/Encounter';
import { Card } from '../card';

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
		<Card
			title="Encounter"
			bodyText={encounter.description}
			coverImageUrl={encounter.coverImageUrl}
			onContinue={onContinue}
			className={className}
		/>
	)
}
