import { IPromptRepository } from '../types/IPromptRepository';
import { Prompt } from '../types/Prompt';
import { ContributionFormSubmission, FormidableFile } from '../types/ContributionFormSubmission';
import { uploadImage, getNow } from './api-utility';
import axios from 'axios';

interface DirectusPrompt {
	id: number;
	prompt: string;
	date: string;
}

export class DirectusPromptRepository implements IPromptRepository {
	private baseUri: string;
	
	constructor(baseUri: string) {
		this.baseUri = baseUri;
	};
	
	async getPrompt(promptId?: string): Promise<Prompt> {
		if (promptId) {
			const response = (await axios.get(`${this.baseUri}/items/prompt/${promptId}`)).data.data as DirectusPrompt;

			return {
				id: response.id.toString(),
				text: response.prompt,
			};
		}

		const now = getNow();
		console.log(now);
		const response = (await axios.get(`${this.baseUri}/items/prompt?filter[date][lte]=${now}&sort=-date`)).data.data as DirectusPrompt[];

		return {
			id: response[0].id.toString(),
			text: response[0].prompt,
		};
	}
	
	async submitResponse(promptId: string, submission: ContributionFormSubmission): Promise<void> {
		const url = await uploadImage(submission.fileUpload as FormidableFile);

		const createSubmissionBody = {
			name: submission.name,
			email: submission.email,
			content: submission.content,
			upload_url: url,
			prompt: parseInt(promptId, 10),
		};

		await axios.post(`${this.baseUri}/items/prompt_submission`, createSubmissionBody);
	}
}
