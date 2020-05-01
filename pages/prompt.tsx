import React from 'react';
import styled from 'styled-components';
import { Head } from '../components/head';
import { ThemeProvider, endTheme } from '../components/theme';
import { CenteredPage } from '../components/basic-styled/centered-page';
import { Header } from '../components/basic-styled/header';
import { ColumnLayout, Column } from '../components/basic-styled/column-layout';
import { BodyText } from '../components/basic-styled/body-text';
import { PromptBox } from '../components/prompt-box';

const StyledPromptBox = styled(PromptBox)`
	margin-top: 40px;
`;

export default function Prompt() {
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
							prompt="Create a character that can cause a sandstorm in the desert."
						/>
					</Column>
					<Column>
						<p>This is another column</p>
					</Column>
				</ColumnLayout>
			</CenteredPage>
		</ThemeProvider>
	);
}