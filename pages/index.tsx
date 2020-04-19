import { Head } from '../components/head';
import styled from 'styled-components';

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: contain;
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
