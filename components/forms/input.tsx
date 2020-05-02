import React from 'react';
import styled, { css } from 'styled-components';
import { lighten } from 'polished';
import { FormInputToken } from './form-input-token';

export interface InputProps {
	required?: boolean;
	invalid?: boolean;
}

const inputCss = css<InputProps>`
	border: none;
	background: #FDF6E3;
	padding: 10px;
	color: #375147;
	border-radius: 4px;
	outline: none;
	font: 18px 'Averia Serif Libre';
	width: 100%;

	${({ invalid }) => invalid ? `
		color: #CD4750;
	` : ''}
	
	&::placeholder {
		color: ${lighten(0.1, '#375147')};
		font-style: italic;

		${({ invalid }) => invalid ? `
			color: #CD4750;
		` : ''}
	}

	${FormInputToken}
`;

export const InputCore = styled.input<InputProps>`
	${inputCss}
`;

export const Input: React.FC<InputProps & React.HTMLProps<HTMLInputElement>> = ({
	placeholder,
	required,
	// Dirty typescript hack :(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	as,
	// Dirty typescript hack :(
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	ref,
	...rest
}) => (
	<InputCore
		{...rest}
		placeholder={required && placeholder ? `${placeholder}*` : placeholder}
		required={required}
	/>
);

export const TextArea = styled.textarea<InputProps>`
	${inputCss}
	resize: vertical;
	min-height: 150px;
`;
