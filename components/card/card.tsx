import React from 'react';
import {
	CardContainer,
	Title,
	BodyText,
	Button,
	Overlay,
	CoverImage,
	ButtonsContainer,
	ChoiceButton,
	FaceContainer,
} from './card-elements';
import { FlexSpacer } from '../basic-styled/flex-spacer';
import { CenteredPage } from '../basic-styled/centered-page';
import { useImageLoader } from '../hooks/use-image-loader';

export interface ChoiceButton {
	text: string;
	backgroundColor?: string;
	onClick: () => void;
}

export interface CardFaceProps {
	title: string;
	bodyText?: string;
	onContinue?: () => void;
	coverImageUrl?: string;
	buttons?: ChoiceButton[];
	visible: boolean;
	isBack?: boolean;
	flipped?: boolean;
}

export const CardFace: React.FC<CardFaceProps> = ({
	title,
	bodyText,
	onContinue,
	coverImageUrl,
	buttons,
	visible,
	isBack,
	flipped,
}) => {
	return (
		<FaceContainer visible={visible} isBack={isBack} flipped={flipped}>
			<Title>{title}</Title>
			{coverImageUrl && <CoverImage src={coverImageUrl} />}
			{bodyText ? <BodyText>{bodyText}</BodyText> : <FlexSpacer />}
			{buttons
				? (
					<ButtonsContainer>
						{buttons.map((button) => (
							<ChoiceButton
								onClick={button.onClick}
								backgroundColor={button.backgroundColor}
								key={button.text}
							>
								{button.text}
							</ChoiceButton>
						))}
					</ButtonsContainer>
				)
				: (
					<Button onClick={onContinue}>Continue</Button>
				)
			}
		</FaceContainer>
	);	
};

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
			<CenteredPage minHeight="min(80%, 880px)" responsiveMargins={false}>
				<CardContainer className={className}>
					<CardFace
						title={title}
						coverImageUrl={loadedCoverImageSrc}
						bodyText={bodyText}
						onContinue={onContinue}
						visible
					/>
				</CardContainer>
			</CenteredPage>
		</Overlay>
	);
};
