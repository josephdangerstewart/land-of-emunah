import React, { useState, useCallback } from 'react';
import { FaceContainer, CardContainer, Title, Overlay, Button as ButtonCore } from '../card';
import { CenteredPage } from '../basic-styled/centered-page';
import styled from 'styled-components';
import { Input } from '../forms';
import { useFormState } from 'react-use-form-state';
import { ContactFormSubmission } from '../../types/ContactFormSubmission';
import { FlexSpacer } from '../basic-styled/flex-spacer';
import { FadeIn } from '../fade-in';
import { AnimatableComponent } from '../../types/AnimatableComponent';
import { useShowError } from '../error-message';

const Button = styled(ButtonCore)`
	font-size: 18px;
`;

const CloseButton = styled(Button)`
	margin-right: 6px;

	@media (max-width: 680px) {
		margin-right: 0;
	}
`;

const BodyText = styled.p`
	font: 16px 'Averia Serif Libre';
	color: #375147;
	margin-top: 0;

	&:first-child {
		margin-top: 8px;
	} 
`;

const ButtonContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;

	@media (max-width: 680px) {
		flex-direction: column;

		${Button} {
			margin-top: 8px;
		}
	}
`;

const InstaContainer = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	margin-right: auto;

	img {
		height: 25px;
		margin-right: 12px;
	}

	a {
		color: #375147;
		text-decoration: none;
		font: 16px 'Averia Serif Libre';

		&:hover {
			text-decoration: underline;
		}
	}

	@media (max-width: 680px) {
		justify-content: center;
		width: 100%;
	}
`;

const InstaDetails: React.FC = () => (
	<InstaContainer>
		<img src="/images/instagram-logo.svg" />
		<a
			rel="noopener noreferrer"
			target="_blank"
			href="https://instagram.com/landofemunah"
		>
			@landofemunah
		</a>
	</ InstaContainer>
);

export interface ContactInfoFormProps {
	className?: string;
	onClose: () => void;
	onSubmit: (submission: ContactFormSubmission) => void;
}

type ViewType = "form" | "success";

export const ContactInfoForm: React.FC<ContactInfoFormProps & AnimatableComponent> = ({
	onClose,
	onSubmit,
	inView,
	animationDuration,
	delay,
}) => {
	const [formState, { text, email }] = useFormState<ContactFormSubmission>();
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { showError } = useShowError();
	const [view, setView] = useState<ViewType>('form');

	const isFormValid = formState.values.email && formState.values.name && formState.validity.email && !isSubmitting;

	const submit = useCallback(async () => {
		setHasSubmitted(true);
		if (!isFormValid) {
			return;
		}

		setIsSubmitting(true);
		try {
			await onSubmit(formState.values);
			setView('success');
		} catch (err) {
			if (!err.isCanceled) {
				showError();
				setIsSubmitting(false);
			}
		}
	}, [setHasSubmitted, setIsSubmitting, isFormValid, onSubmit, setView, showError]);	

	return (
		<Overlay zIndex={100}>
			<CenteredPage responsiveMargins={false}>
				<FadeIn
					inView={inView}
					animationDuration={animationDuration}
					delay={delay}
				>
					<CardContainer flipped={view !== 'form'}>
						<FaceContainer visible flipped={view !== 'form'}>
							<Title>CONTACT INFO</Title>
							<BodyText>
								By providing your contact information, we can keep you posted with news and updates regarding the Land of Emunah.
							</BodyText>
							<BodyText>
								We will not give away your contact information or spam you with emails or messages. We will just send updates and news whenever they come!
							</BodyText>
							<Input
								{...text('name')}
								placeholder="Name"
								autoComplete="name"
								required
								invalid={(!formState.values.email && hasSubmitted)}
							/>
							<Input
								{...email('email')}
								placeholder="Email"
								required
								invalid={(!formState.validity.email && formState.touched.email) || (!formState.values.email && hasSubmitted)}
							/>
							<Input placeholder="Phone" {...text('phone')} />
							<BodyText>
								Make sure to follow our instagram page as another way to stay posted and to check out submissions from anyone who has contributed to the Land of Emunah.
							</BodyText>
							<FlexSpacer />
							<ButtonContainer>
								<InstaDetails />
								<CloseButton onClick={onClose}>Cancel</CloseButton>
								<Button onClick={submit}>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
							</ButtonContainer>
						</FaceContainer>
						<FaceContainer visible isBack flipped={view !== 'success'}>
							<Title>CONTACT INFO</Title>
							<BodyText>Thank you! We will message you soon about any updates.</BodyText>
							<FlexSpacer />
							<ButtonContainer>
								<InstaDetails />
								<Button onClick={onClose}>Continue</Button>
							</ButtonContainer>
						</FaceContainer>
					</CardContainer>
				</FadeIn>
			</CenteredPage>
		</Overlay>
	);
};
