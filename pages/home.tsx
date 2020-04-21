import { Location } from '../components/location';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Head } from '../components/head';

export default function Home() {
	const router = useRouter();

	const onContinue = useCallback(() => {
		router.push('/');
	}, [router]);

	return (
		<>
			<Head />
			<Location
				title="Welcome to the Land of Emunah"
				coverImageUrl="/images/map.png"
				bodyText="The Land of Emunah is a world where imagination and collaboration flow together. You are invited to embark on a journey of self-discovery and exploration of a world that exists outside of our own. In this land, you will follow a path that will show not just your own personality and consciousness, but also something deeper within you: your soul and creativity. Emunah is a place where you will be able to explore as well as contribute with your own imagination and worlds within your own head. For now, enter and explore what’s set before you in the land of Emunah."
				buttonText="Enter"
				onContinue={onContinue}
			/>
		</>
	)
}
