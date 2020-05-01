import React from 'react';
import { Container, Title, Text } from './styled';

export interface PromptBoxProps {
	prompt: string;
	className?: string;
}

export const PromptBox: React.FC<PromptBoxProps> = ({ prompt, className }) => {
	return (
		<Container className={className}>
			<Title>Prompt</Title>
			<Text>{prompt}</Text>
		</Container>
	);
};
