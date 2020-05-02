import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useFormState } from 'react-use-form-state';
import { CardFace, Title as TitleCore, Button, CardContainer } from '../card';
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
}

type ViewType = "form" | "success";

export const ContributionForm: React.FC<ContributionFormProps> = ({
	onSubmit
}) => {
	const [formState, { text, email }] = useFormState<ContributionFormSubmission>();
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [fileUpload, setFileUpload] = useState<File>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [view, setView] = useState<ViewType>('form');

	const isNameInvalid = !formState.values.name && hasSubmitted;
	const isEmailInvalid = (!formState.validity.email && formState.touched.email) || (!formState.values.email && hasSubmitted);

	const isFormDisabled = isNameInvalid || isEmailInvalid || isSubmitting;

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
		} catch (e) {
			console.log(e);
		} finally {
			setIsSubmitting(false);
		}

		formState.clearField('content');
		setFileUpload(null);
	}, [formState, onSubmit, fileUpload, isFormDisabled, setView]);


	return (
		<CardContainer>
			<CardFace visible flipped={view === 'success'}>
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
				<FileUpload onChange={setFileUpload} file={fileUpload} />
				<TextArea {...text('content')} placeholder="Type your response here..." />
				<ButtonContainer>
					<Button onClick={handleSubmit}>
						Submit
					</Button>
				</ButtonContainer>
			</CardFace>
			<CardFace isBack flipped={view !== 'success'} visible>
				<p>I am the back of the card! Maybe I need to be in a p tag?</p>
			</CardFace>
		</CardContainer>
	);
};
