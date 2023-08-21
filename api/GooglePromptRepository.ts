import { ContactFormSubmission } from '../types/ContactFormSubmission';
import { ContributionFormSubmission, FormidableFile } from '../types/ContributionFormSubmission';
import { IPromptRepository } from '../types/IPromptRepository';
import { Prompt } from '../types/Prompt';
import { getNow, uploadImage } from './api-utility';
import { addSheetData } from './sheetManipulation';
import { DataSheet } from './sheetManipulation/types';

export class GooglePromptRepository implements IPromptRepository {
	getPrompt = async (promptId?: string): Promise<Prompt> => {
		return {
			id: 'test',
			text: 'this is a test prompt',
		}
	};

	submitResponse = async (promptId: string, submission: ContributionFormSubmission): Promise<void> => {
		const url = submission.fileUpload ? await uploadImage(submission.fileUpload as FormidableFile) : '';
		await addSheetData(contributionSubmissionSheet, [{
			name: submission.name,
			email: submission.email,
			content: submission.content,
			fileUpload: url,
			promptId,
			timestamp: getNow(),
		}]);
	};

	submitContactInfo = async (submission: ContactFormSubmission): Promise<void> => {
		await addSheetData(contactSubmissionSheet, [{
			name: submission.name,
			email: submission.email,
			phone: submission.phone,
			timestamp: getNow(),
		}]);
	};
}

interface GoogleContributionSubmission extends Record<string, string> {
	name: string;
	email: string;
	content: string;
	fileUpload: string;
	promptId: string;
	timestamp: string;
}

const contributionSubmissionSheet: DataSheet<GoogleContributionSubmission> = {
	spreadsheetId: '1webABSBqGvs_SpGxt2oz2nSr2WH-SwjL8y4sJzxH1FE',
	name: 'Prompt_Submissions',
	dataStartsAtRow: 2,
	columns: {
		name: 'A',
		email: 'B',
		content: 'C',
		fileUpload: 'D',
		promptId: 'E',
		timestamp: 'F',
	}
}

interface GoogleContactSubmission extends Record<string, string> {
	name: string;
	email: string;
	phone: string;
	timestamp: string;
}

const contactSubmissionSheet: DataSheet<GoogleContactSubmission> = {
	spreadsheetId: '1webABSBqGvs_SpGxt2oz2nSr2WH-SwjL8y4sJzxH1FE',
	name: 'Prompt_Submissions',
	dataStartsAtRow: 2,
	columns: {
		name: 'A',
		email: 'B',
		phone: 'C',
		timestamp: 'D',
	}
}
