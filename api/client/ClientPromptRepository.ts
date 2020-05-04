import { IPromptRepository } from '../../types/IPromptRepository';
import { Prompt } from '../../types/Prompt';
import { ContributionFormSubmission } from '../../types/ContributionFormSubmission';
import { ContactFormSubmission } from '../../types/ContactFormSubmission';

interface ClientPromptRepositoryOptions {
	fetchJson: (url: string) => Promise<any>;
	postJson: (url: string, data: any) => Promise<any>;
	postForm: (url: string, data: FormData) => Promise<any>;
}

export class ClientPromptRepository implements IPromptRepository {
	private fetchJson: ClientPromptRepositoryOptions['fetchJson'];
	private postJson: ClientPromptRepositoryOptions['postJson'];
	private postForm: ClientPromptRepositoryOptions['postForm'];
	
	constructor({
		fetchJson,
		postJson,
		postForm,
	}: ClientPromptRepositoryOptions) {
		this.fetchJson = fetchJson;
		this.postJson = postJson;
		this.postForm = postForm;
	}

	async getPrompt(): Promise<Prompt> {
		return (await this.fetchJson('/api/prompts')).prompt as Prompt;
	}

	async submitContactInfo(submission: ContactFormSubmission): Promise<void> {
		await this.postJson('/api/contact-info', submission);
	}
	
	async submitResponse(promptId: string, submission: ContributionFormSubmission): Promise<void> {
		const formData = new FormData();

		formData.append('name', submission.name);
		formData.append('email', submission.email);
		formData.append('content', submission.content);
		formData.append('fileUpload', submission.fileUpload as File);
		formData.append('captchaToken', submission.captchaToken);

		await this.postForm(`/api/prompts/submit/${promptId}`, formData);
	}
}
