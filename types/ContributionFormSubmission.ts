export interface FormidableFile {
	path: string;
}

export interface ContributionFormSubmission {
	name: string;
	email: string;
	content: string;
	fileUpload: File | FormidableFile;
	captchaToken: string;
}
