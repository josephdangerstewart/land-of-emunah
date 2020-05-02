import { Prompt } from './Prompt';
import { ContributionFormSubmission } from './ContributionFormSubmission';
import { ContactFormSubmission } from './ContactFormSubmission';

export interface IPromptRepository {
	getPrompt(promptId?: string): Promise<Prompt>;
	submitResponse(promptId: string, submission: ContributionFormSubmission): Promise<void>;
	submitContactInfo(submission: ContactFormSubmission): Promise<void>;
}
