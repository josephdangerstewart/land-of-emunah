import { Prompt } from './Prompt';
import { ContributionFormSubmission } from './ContributionFormSubmission';

export interface IPromptRepository {
	getPrompt(promptId?: string): Promise<Prompt>;
	submitResponse(promptId: string, submission: ContributionFormSubmission): Promise<void>;
}
