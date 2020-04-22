import React from 'react';
import {
	CardContainer,
	Title,
	BodyText,
	Button,
	Overlay,
	CoverImage,
} from './card-elements';
import { FlexSpacer } from '../basic-styled/flex-spacer';
import { CenteredPage } from '../basic-styled/centered-page';
import { useImageLoader } from '../hooks/use-image-loader';

export interface CardFaceProps {
	title: string;
	bodyText?: string;
	onContinue: () => void;
	coverImageUrl?: string;
}

export const CardFace: React.FC<CardFaceProps> = ({
	title,
	bodyText,
	onContinue,
	coverImageUrl,
}) => {
	return (
		<>
			<Title>{title}</Title>
			{coverImageUrl && <CoverImage src={coverImageUrl} />}
			{bodyText && <BodyText>{bodyText}</BodyText>}
			<FlexSpacer />
			<Button onClick={onContinue}>Continue</Button>
		</>
	)	
}

export interface CardProps {
	title: string;
	bodyText?: string;
	onContinue: () => void;
	className?: string;
	coverImageUrl?: string;
}

export const Card: React.FC<CardProps> = ({
	title,
	bodyText,
	onContinue,
	className,
	coverImageUrl,
}) => {
	const loadedCoverImageSrc = useImageLoader(coverImageUrl);

	if (coverImageUrl && !loadedCoverImageSrc) {
		return null;
	}

	return (
		<Overlay>
			<CenteredPage minHeight="min(80%, 880px)">
				<CardContainer className={className}>
					<Title>{title}</Title>
					{loadedCoverImageSrc && <CoverImage src={loadedCoverImageSrc} />}
					{bodyText && <BodyText>{bodyText}</BodyText>}
					<FlexSpacer />
					<Button onClick={onContinue}>Continue</Button>
				</CardContainer>
			</CenteredPage>
		</Overlay>
	);
}
