import { Head } from '../components/head';
import styled from 'styled-components';
import { generateAnimation, Animations } from '../components/animations';

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
	${generateAnimation(Animations.PopIn, 1.5)}
`;

const Container = styled.div`
	height: calc(100% - 30px);
	padding: 15px 0;
`;

export default function Index() {
	return (
		<Container>
			<Head title="The Land of Emunah" />
			<Image src="/images/homepage-logo.png" />
		</Container>
	)
}
