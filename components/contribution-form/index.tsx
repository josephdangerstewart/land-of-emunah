import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useFormState } from 'react-use-form-state';
import { CardFace, Title as TitleCore, Button } from '../card';
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

export const ContributionForm: React.FC<ContributionFormProps> = ({
	onSubmit
}) => {
	const [formState, { text, email }] = useFormState<ContributionFormSubmission>();
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [fileUpload, setFileUpload] = useState<File>(null);

	const isNameInvalid = !formState.values.name && hasSubmitted;
	const isEmailInvalid = (!formState.validity.email && formState.touched.email) || (!formState.values.email && hasSubmitted);

	const isFormDisabled = isNameInvalid || isEmailInvalid;

	const handleSubmit = useCallback(() => {
		setHasSubmitted(true);
		if (isFormDisabled) {
			return;
		}

		const submission = {
			...formState.values,
			fileUpload,
		};

		onSubmit && onSubmit(submission);
	}, [formState, onSubmit, fileUpload, isFormDisabled]);


	return (
		<CardFace visible>
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
			<FileUpload onChange={setFileUpload} />
			<TextArea {...text('content')} placeholder="Type your response here..." />
			<ButtonContainer>
				<Button onClick={handleSubmit}>
					Submit
				</Button>
			</ButtonContainer>
		</CardFace>
	);
};
