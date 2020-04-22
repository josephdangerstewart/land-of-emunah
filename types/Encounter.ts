export interface Encounter {
	title?: string;
	coverImageUrl?: string;
	description: string;
	choices?: EncounterChoice[];
}

export interface EncounterChoice {
	choiceText: string;
	result: string;
}
