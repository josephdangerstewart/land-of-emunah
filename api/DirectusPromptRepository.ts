import { IPromptRepository } from '../types/IPromptRepository';
import { Prompt } from '../types/Prompt';
import { ContributionFormSubmission, FormidableFile } from '../types/ContributionFormSubmission';
import { uploadImage } from './api-utility';
// import axios from 'axios';

export class DirectusPromptRepository implements IPromptRepository {
	getPrompt(): Promise<Prompt> {
		throw new Error('Method not implemented.');
	}
	
	async submitResponse(promptId: string, submission: ContributionFormSubmission): Promise<void> {
		const url = await uploadImage(submission.fileUpload as FormidableFile);
		console.log(url);
	}
}
