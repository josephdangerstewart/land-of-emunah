import React, { useMemo, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Head } from '../components/head';
import { ThemeProvider, endTheme } from '../components/theme';
import { CenteredPage } from '../components/basic-styled/centered-page';
import { Header } from '../components/basic-styled/header';
import { ColumnLayout, Column } from '../components/basic-styled/column-layout';
import { BodyText } from '../components/basic-styled/body-text';
import { PromptBox } from '../components/prompt-box';
import { ContributionForm } from '../components/contribution-form';
import { getClientPromptRepository } from '../components/utility';
import { ContributionFormSubmission } from '../types/ContributionFormSubmission';
import { useCaptcha } from '../components/hooks/use-captcha';

const StyledPromptBox = styled(PromptBox)`
	margin-top: 40px;
`;

export default function Prompt() {
	const promptRepository = useMemo(() => getClientPromptRepository(), []);
	const [promptText, setPromptText] = useState('Loading prompt...');
	const [promptId, setPromptId] = useState(null);
	const { getToken } = useCaptcha('prompt_submission', false);

	useEffect(() => {
		promptRepository.getPrompt().then(p => {
			setPromptText(p.text);
			setPromptId(p.id);
		});
	}, [setPromptText]);

	const onSubmitForm = useCallback(async (submission: ContributionFormSubmission) => {
		const captchaToken = await getToken();
		const submissionWithToken = {
			...submission,
			captchaToken,
		};
		await promptRepository.submitResponse(promptId, submissionWithToken);
	}, [promptRepository, promptId, getToken]);

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
					</Column>
					<Column>
						<ContributionForm
							onSubmit={onSubmitForm}
							isDisabled={!promptId}
						/>
					</Column>
				</ColumnLayout>
			</CenteredPage>
		</ThemeProvider>
	);
}
