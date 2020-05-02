import { IPromptRepository } from '../../types/IPromptRepository';
import { Prompt } from '../../types/Prompt';
import { ContributionFormSubmission } from '../../types/ContributionFormSubmission';
import axios from 'axios';
import { ContactFormSubmission } from '../../types/ContactFormSubmission';

export class ClientPromptRepository implements IPromptRepository {
	async getPrompt(): Promise<Prompt> {
		return (await axios.get('/api/prompts')).data.prompt as Prompt;
	}

	async submitContactInfo(submission: ContactFormSubmission): Promise<void> {
		await axios.post('/api/contact-info', submission);
	}
	
	async submitResponse(promptId: string, submission: ContributionFormSubmission): Promise<void> {
		const formData = new FormData();

		formData.append('name', submission.name);
		formData.append('email', submission.email);
		formData.append('content', submission.content);
		formData.append('fileUpload', submission.fileUpload as File);
		formData.append('captchaToken', submission.captchaToken);

		await axios.post(`/api/prompts/submit/${promptId}`, formData, {
			headers: {
				'Content-Type': 'multipart/form',
			}
		});
	}
}
