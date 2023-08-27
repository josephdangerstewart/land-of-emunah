import React from 'react';
import { Location } from '../components/location';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Head } from '../components/head';
import { useCaptcha } from '../components/hooks/use-captcha';

export default function Home() {
	const router = useRouter();
	useCaptcha('home_page');

	const onContinue = useCallback(() => {
		router.push('/the-city');
	}, [router]);

	return (
		<>
			<Head />
			<Location
				locationId="TheCity"
				title="Welcome to the Land of Emunah"
				coverImageUrl="/images/locations/map.png"
				bodyText="The Land of Emunah is a world where imagination and collaboration flow together. You are invited to embark on a journey of self-discovery and exploration of a world that exists outside of our own. In this land, you will follow a path that will show not just your own personality and consciousness, but also something deeper within you: your soul and creativity. Emunah is a place where you will be able to explore as well as contribute with your own imagination and worlds within your own head. For now, enter and explore what’s set before you in the land of Emunah."
				buttonText="Enter"
				onContinue={onContinue}
			/>
		</>
	);
}
