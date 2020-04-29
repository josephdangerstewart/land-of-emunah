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
}

interface DirectusChoice {
	choiceText: string;
	resultText: string;
}

interface DirectusEncounterLocation {
	location_id: number;
	encounter_id: number;
}

export class DirectusEncounterRepository implements IEncounterRepository {
	private baseUri: string;
	private imageBaseUri: string;

	constructor(baseUri: string, imageUri: string) {
		this.baseUri = baseUri;
		this.imageBaseUri = imageUri;
	}
	
	public async getRandomEncounter(previousEncounters: string[], type: string, locationId: string): Promise<Encounter> {
		const locationEncounters = (await axios.get(`${this.baseUri}/items/encounter_location?limit=10000`)).data.data as DirectusEncounterLocation[];
		const encountersForLocation = locationEncounters.filter(x => x.location_id.toString() === locationId);

		let possibleEncounters: DirectusEncounter[] = [];
		if (encountersForLocation.length) {
			let availableEncounters = encountersForLocation.filter(x => !previousEncounters.includes(x.encounter_id.toString()));

			if (availableEncounters.length === 0) {
				availableEncounters = encountersForLocation;
			}

			possibleEncounters = (await axios.get(`${this.baseUri}/items/encounter?filter[id][in]=${availableEncounters.map(x => x.encounter_id).join(',')}`)).data.data as DirectusEncounter[];
		} else {
			possibleEncounters = (await axios.get(`${this.baseUri}/items/encounter?filter[path][eq]=${type}&filter[id][nin]=${previousEncounters.join(',')}`)).data.data as DirectusEncounter[];

			if (!possibleEncounters.length) {
				possibleEncounters = (await axios.get(`${this.baseUri}/items/encounter?filter[path][eq]=${type}`)).data.data as DirectusEncounter[];
			}
		}

		if (!possibleEncounters.length) {
			return null;
		}

		const encounter = possibleEncounters[Math.floor(Math.random() * possibleEncounters.length)];

		return await this.mapEncounter(encounter, Boolean(encountersForLocation.length));
	}
	
	public async getFinalEncounter(type: string): Promise<Encounter> {
		const encounters = (await axios.get(`${this.baseUri}/items/encounter?filter[path][eq]=${type}&filter[is_final_encounter]=1`)).data.data as DirectusEncounter[];

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
