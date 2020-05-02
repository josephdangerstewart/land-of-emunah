import React, { useMemo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Head } from '../components/head';
import { ThemeProvider, endTheme } from '../components/theme';
import { CenteredPage } from '../components/basic-styled/centered-page';
import { Header } from '../components/basic-styled/header';
import { ColumnLayout, Column } from '../components/basic-styled/column-layout';
import { BodyText as BodyTextCore } from '../components/basic-styled/body-text';
import { PromptBox } from '../components/prompt-box';
import { ContributionForm } from '../components/contribution-form';
import { getClientPromptRepository } from '../components/utility';
import { ContributionFormSubmission } from '../types/ContributionFormSubmission';
import { useCaptcha } from '../components/hooks/use-captcha';
import { ContactInfoForm } from '../components/contact-info-form';
import { AnimatableComponent } from '../types/AnimatableComponent';
import { generateAnimation, AnimationKind, useTransitionViewState, useAnimationDuration } from '../components/animations';
import { ContactFormSubmission } from '../types/ContactFormSubmission';
import { Button as ButtonCore } from '../components/card';

const Button = styled(ButtonCore)`
	font-family: 'Trade Winds';
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const StyledPromptBox = styled(PromptBox)`
	margin-top: 40px;
	margin-bottom: 30px;
`;

const BodyText = styled(BodyTextCore)`
	font-size: 16px;
`;

const AnimatedContactInfoForm = styled(ContactInfoForm)<AnimatableComponent>`
	${({ inView, animationDuration }) => inView
		? generateAnimation(AnimationKind.FadeIn, animationDuration)
		: generateAnimation(AnimationKind.FadeOut, animationDuration)}
`;

type PromptViewType = "prompt" | "contact-form";

export default function Prompt() {
	const promptRepository = useMemo(() => getClientPromptRepository(), []);
	const [promptText, setPromptText] = useState('Loading prompt...');
	const [promptId, setPromptId] = useState(null);
	const { duration } = useAnimationDuration();
	const { isInView, setView, shouldRenderView } = useTransitionViewState<PromptViewType>('prompt', duration);
	const { getToken: getPromptFormToken } = useCaptcha('prompt_submission', false);
	const { getToken: getContactFormToken } = useCaptcha('contact_info_submission', false);

	const openContactForm = useCallback(() => {
		setView('contact-form', false);
	}, [setView]);

	const closeContactForm = useCallback(() => {
		setView('prompt');
	}, [setView]);

	useEffect(() => {
		promptRepository.getPrompt().then(p => {
			setPromptText(p.text);
			setPromptId(p.id);
		});
	}, [setPromptText]);

	const onSubmitContributionForm = useCallback(async (submission: ContributionFormSubmission) => {
		const captchaToken = await getPromptFormToken();
		const submissionWithToken = {
			...submission,
			captchaToken,
		};
		await promptRepository.submitResponse(promptId, submissionWithToken);
	}, [promptRepository, promptId, getPromptFormToken]);

	const onSubmitContactForm = useCallback(async (submission: ContactFormSubmission) => {
		const captchaToken = await getContactFormToken();
		const submissionWithToken = {
			...submission,
			captchaToken,
		};
		await promptRepository.submitContactInfo(submissionWithToken);
	}, [promptRepository, getContactFormToken]);

	return (
		<ThemeProvider value={endTheme}>
			<Head />
			<CenteredPage>
				<Header>The Prompt Page</Header>
				<ColumnLayout
					maxWidth={900}
					columnSpacing={12}
				>
					<Column padding="0 18px">
						<BodyText>
							Welcome to the Prompt Page! This will be updated biweekly with new prompts. Each submission can be written works, visual projects, or anything that shows your creativity.
						</BodyText>
						<BodyText>
							All you need to do in order to contribute is to either: upload a file of your work (PNG or PDF) or use the text box below to write in your work. Do whatever fits best with your contribution. Everything will be accepted and considered as part of the Land of Emunah.
						</BodyText>
						<StyledPromptBox
							prompt={promptText}
						/>
						<ButtonContainer>
							<Button onClick={openContactForm}>How to stay in contact!</Button>
						</ButtonContainer>
					</Column>
					<Column>
						<ContributionForm
							onSubmit={onSubmitContributionForm}
							isDisabled={!promptId}
						/>
					</Column>
				</ColumnLayout>
				{shouldRenderView('contact-form') && (
					<AnimatedContactInfoForm
						inView={isInView('contact-form')}
						animationDuration={duration}
						onClose={closeContactForm}
						onSubmit={onSubmitContactForm}
					/>
				)}
			</CenteredPage>
		</ThemeProvider>
	);
}
