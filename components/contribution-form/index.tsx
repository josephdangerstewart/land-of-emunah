import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useFormState } from 'react-use-form-state';
import { FaceContainer, Title as TitleCore, Button, CardContainer, BodyText } from '../card';
import { Input, TextArea, FileUpload } from '../forms';
import { ContributionFormSubmission } from '../../types/ContributionFormSubmission';

const Title = styled(TitleCore)`
	margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	width: 100%;
`;

export interface ContributionFormProps {
	onSubmit: (submission: ContributionFormSubmission) => void;
	isDisabled: boolean;
}

type ViewType = "form" | "success";

export const ContributionForm: React.FC<ContributionFormProps> = ({
	onSubmit,
	isDisabled,
}) => {
	const [formState, { text, email }] = useFormState<ContributionFormSubmission>();
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [fileUpload, setFileUpload] = useState<File>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [view, setView] = useState<ViewType>('form');

	const isFormDisabled = !formState.validity.email || !formState.values.name || isSubmitting || isDisabled || !formState.values.email;

	const handleSubmitAnother = useCallback(async () => {
		setView('form');
	}, [setView]);

	const handleSubmit = useCallback(async () => {
		setHasSubmitted(true);
		if (isFormDisabled) {
			return;
		}

		const submission = {
			...formState.values,
			fileUpload,
		};

		setIsSubmitting(true);
		try {
			onSubmit && await onSubmit(submission);
			setView('success');
		} finally {
			setIsSubmitting(false);
		}

		formState.clearField('content');
		setFileUpload(undefined);
	}, [formState, onSubmit, fileUpload, isFormDisabled, setView]);

	const handleChangeFile = useCallback((file) => {
		setFileUpload(file);
	}, [setFileUpload]);


	return (
		<CardContainer>
			<FaceContainer visible flipped={view === 'success'}>
				<Title>SUBMISSION</Title>
				<Input
					{...text('name')}
					required
					placeholder="Name"
					invalid={!formState.values.name && hasSubmitted}
				/>
				<Input
					{...email({
						name: 'email',
						validateOnBlur: true,
					})}
					required
					placeholder="Email"
					invalid={(!formState.validity.email && formState.touched.email) || (!formState.values.email && hasSubmitted)}
				/>
				<FileUpload onChange={handleChangeFile} file={fileUpload} />
				<TextArea {...text('content')} placeholder="Type your response here..." />
				<ButtonContainer>
					<Button onClick={handleSubmit}>
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</Button>
				</ButtonContainer>
			</FaceContainer>
			<FaceContainer isBack flipped={view !== 'success'} visible>
				<Title>SUBMISSION</Title>
				<BodyText>
					Thank you for your contribution!
				</BodyText>
				<Button onClick={handleSubmitAnother}>
					Submit another?
				</Button>
			</FaceContainer>
		</CardContainer>
	);
};
