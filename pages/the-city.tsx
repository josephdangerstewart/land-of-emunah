import React, { useCallback } from 'react';
import { Head } from '../components/head';
import { Location } from '../components/location';
import { EncounterChoice } from '../types/Encounter';
import { getClientLocationRepository } from '../components/utility';
import { useRouter } from 'next/router';

export default function TheCity() {
	const router = useRouter();

	const handleOnContinue = useCallback(async (result: EncounterChoice) => {
		const repository = getClientLocationRepository();
		const firstLocation = await repository.getNextLocation(result.choiceText.toLowerCase());
		router.push(`/${firstLocation.path}/${firstLocation.id}`);
	}, []);

	return (
		<>
			<Head />
			<Location
				title="The City"
				coverImageUrl="/images/locations/city.png"
				bodyText="Your journey starts with leaving the city in the center of the land of Emunah. This city is always bustling and busy with many people constantly moving around and continuing through life at their own pace. You have grown to wonder what is further beyond this crowded, nosy city and have decided to set out on a new adventure to explore the Land of Emunah."
				onContinue={handleOnContinue}
				encounter={{
					description: 'As you are heading out of the city gates, ready to embark on a new adventure, you see that there are four different paths in front of you. Which direction do you go?',
					coverImageUrl: '/images/locations/city.png',
					choices: [
						{
							choiceText: 'Mountains',
							buttonBackgroundColor: '#E8BBBD',
							result: 'You have chosen the Mountains',
						},
						{
							choiceText: 'Sea',
							buttonBackgroundColor: '#A7DAED',
							result: 'You have chosen the Sea',
						},
						{
							choiceText: 'Desert',
							buttonBackgroundColor: '#FFE9AC',
							result: 'You have chosen the Desert',
						},
						{
							choiceText: 'Forest',
							buttonBackgroundColor: '#B8E3CC',
							result: 'You have chosen the Forest',
						},
					],
					encounterId: 'initial',
				}}
			/>
		</>
	);
}
