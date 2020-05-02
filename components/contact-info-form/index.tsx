import React from 'react';
import { FaceContainer, CardContainer, Title, Overlay, Button as ButtonCore } from '../card';
import { CenteredPage } from '../basic-styled/centered-page';
import styled from 'styled-components';
import { Input } from '../forms';

const Button = styled(ButtonCore)`
	font-size: 18px;
`;

const CloseButton = styled(Button)`
	margin-right: 6px;
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
`;

export interface ContactInfoFormProps {
	className?: string;
	onClose: () => void;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ className, onClose }) => {
	return (
		<Overlay zIndex={100}>
			<CenteredPage>
				<CardContainer className={className}>
					<FaceContainer visible>
						<Title>CONTACT INFO</Title>
						<BodyText>
							By providing your contact information, we can keep you posted with news and updates regarding the Land of Emunah.
						</BodyText>
						<BodyText>
							We will not give away your contact information or spam you with emails or messages. We will just send updates and news whenever they come!
						</BodyText>
						<Input placeholder="Name" required />
						<Input placeholder="Email" required />
						<Input placeholder="Phone" />
						<BodyText>
							Make sure to follow our instagram page as another way to stay posted and to check out submissions from anyone who has contributed to the Land of Emunah.
						</BodyText>
						<ButtonContainer>
							<InstaContainer>
								<img src="/images/instagram-logo.svg" />
								<a
									rel="noopener noreferrer"
									target="_blank"
									href="https://instagram.com/landofemunah"
								>
									@landofemunah
								</a>
							</InstaContainer>
							<CloseButton onClick={onClose}>Cancel</CloseButton>
							<Button>Submit</Button>
						</ButtonContainer>
					</FaceContainer>
				</CardContainer>
			</CenteredPage>
		</Overlay>
	);
};
