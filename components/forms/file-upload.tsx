import React, { useRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import { lighten, darken } from 'polished';
import { FormInputToken } from './form-input-token';

const Button = styled.button`
	background-color: #A4B494;
	color: #375147;
	font: 18px 'Averia Serif Libre';
	padding: 6px 12px;
	border: none;
	border-radius: 25px;
	outline: none;
	cursor: pointer;
	margin-right: 9px;

	&:hover {
		background-color: ${lighten(0.1, '#A4B494')}
	}
`;

const ClearButton = styled.button`
	outline: none;
	cursor: pointer;
	background: none;
	border: none;
	color: ${darken(0.25, '#E0D2A8')};
	margin-left: 4px;
	margin-top: 3px;

	&:hover {
		color: ${darken(0.35, '#E0D2A8')};
	}
`;

const Text = styled.p`
	color: #375147;
	font: 18px 'Averia Serif Libre';
	font-style: italic;
	margin: 0;
`;

const Container = styled.div`
	display: flex;
	width: 100%;
	align-items: center;

	${FormInputToken}
`;

const FileInput = styled.input`
	display: none;
`;

export interface FileUploadProps {
	onChange?: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
	const input = useRef(null);
	const [file, setFile] = useState(null);

	const handleButtonClick = useCallback(() => {
		input.current?.click();
	}, []);

	const clear = useCallback(() => {
		setFile(null);
		onChange && onChange(null);
	}, [onChange]);

	const handleFileChange = useCallback((e) => {
		setFile(e.target.files[0]);
		onChange && onChange(e.target.files[0] as File);
	}, [onChange]);

	return (
		<Container>
			<FileInput ref={input} type="file" onChange={handleFileChange} />
			<Button onClick={handleButtonClick}>Upload File</Button>
			{file && (
				<>
					<Text>{file.name}</Text>
					<ClearButton onClick={clear}>X</ClearButton>
				</>
			)}
		</Container>
	);
};
