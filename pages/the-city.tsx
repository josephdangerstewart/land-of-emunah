import { Head } from '../components/head';
import { Location } from '../components/location';

export default function TheCity() {
	return (
		<>
			<Head />
			<Location
				title="The City"
				coverImageUrl="/images/locations/city.png"
				bodyText="Your journey starts with leaving the city in the center of the land of Emunah. This city is always bustling and busy with many people constantly moving around and continuing through life at their own pace. You have grown to wonder what is further beyond this crowded, nosy city and have decided to set out on a new adventure to explore the Land of Emunah."
				onContinue={() => {}}
				encounter={{
					description: 'As you are heading out of the city gates, ready to embark on a new adventure, you see that there are four different paths in front of you. Which direction do you go?',
					coverImageUrl: '/images/locations/city.png'
				}}
			/>
		</>
	)
}
