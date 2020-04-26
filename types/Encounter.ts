export interface Encounter {
	title?: string;
	coverImageUrl?: string;
	description: string;
	choices?: EncounterChoice[];

	// Auto generated by api
	encounterId: string;
}

export interface EncounterChoice {
	choiceText: string;
	result: string;
	buttonBackgroundColor?: string;
}
