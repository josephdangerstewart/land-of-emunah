export interface Encounter {
	title?: string;
	coverImageUrl?: string;
	description: string;
	choices?: EncounterChoice[];
	encounterId: string;
}

export interface EncounterChoice {
	choiceText: string;
	result: string;
	buttonBackgroundColor?: string;
}
