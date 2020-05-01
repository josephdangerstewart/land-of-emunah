import { IEncounterRepository } from '../types/IEncounterRepository';
import { Encounter } from '../types/Encounter';
import { DirectusAsset } from './api-utility';
import axios from 'axios';

interface DirectusEncounter {
	title: string;
	cover_image: number;
	encounter_text: string;
	id: number;
	choices: DirectusChoice[];
	is_final_encounter: boolean;
}

interface DirectusChoice {
	choiceText: string;
	resultText: string;
}

export class DirectusEncounterRepository implements IEncounterRepository {
	private baseUri: string;
	private imageBaseUri: string;

	constructor(baseUri: string, imageUri: string) {
		this.baseUri = baseUri;
		this.imageBaseUri = imageUri;
	}
	
	public async getRandomEncounter(previousEncounters: string[], type: string, locationId: string): Promise<Encounter> {
		// First try and get encounters for this specific location
		let isEncounterLocationBound = true;
		let allEncounters = (await axios.get(`${this.baseUri}/items/encounter?filter[path][eq]=${type}&filter[available_locations.location_id][eq]=${locationId}&filter[is_final_encounter][empty]=1`)).data.data as DirectusEncounter[];

		// If there are no encounters for this specific location get encounters marked available for all locations in the path
		if (!allEncounters.length) {
			isEncounterLocationBound = false;
			allEncounters = (await axios.get(`${this.baseUri}/items/encounter?filter[available_to_all_locations][eq]=1&filter[path][eq]=${type}&filter[is_final_encounter][empty]=1`)).data.data as DirectusEncounter[];
		}

		// If there are still no encounters, return null
		if (!allEncounters.length) {
			return null;
		}

		// Get a list of encounters that have not appeared yet so as to prefer new encounters
		let availableEncounters = allEncounters.filter(x => !previousEncounters.includes(x.id.toString()));
		
		// If we have already been to all of the available 
		if (!availableEncounters.length) {
			availableEncounters = allEncounters;
		}

		const selectedEncounter = availableEncounters[Math.floor(Math.random() * availableEncounters.length)];

		return await this.mapEncounter(selectedEncounter, isEncounterLocationBound);
	}
	
	public async getFinalEncounter(type: string): Promise<Encounter> {
		const encounters = (await axios.get(`${this.baseUri}/items/encounter?filter[path][eq]=${type}&filter[is_final_encounter][eq]=1`)).data.data as DirectusEncounter[];

		if (!encounters.length) {
			return null;
		}

		const encounter = encounters[Math.floor(Math.random() * encounters.length)];

		return this.mapEncounter(encounter, true);
	}

	private async mapEncounter(encounter: DirectusEncounter, isBoundToLocation: boolean): Promise<Encounter> {
		let asset: DirectusAsset = null;
		
		if (encounter.cover_image) {
			asset = (await axios.get(`${this.baseUri}/files/${encounter.cover_image}`)).data.data as DirectusAsset;
		}

		return {
			encounterId: encounter.id.toString(),
			coverImageUrl: asset?.data?.url && `${this.imageBaseUri}${asset?.data?.url}`,
			description: encounter.encounter_text,
			choices: encounter.choices.map(x => ({
				choiceText: x.choiceText,
				result: x.resultText,
			})),
			isBoundToLocation: isBoundToLocation,
		};
	}
}
