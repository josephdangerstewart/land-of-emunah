import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { getClientLocationRepository, getClientEncounterRepository } from '../../components/utility';
import { Location as ILocation } from '../../types/Location';
import { Head } from '../../components/head';
import { Location } from '../../components/location';
import { useRouter } from 'next/router';
import { Encounter } from '../../types/Encounter';
import { getLocationRepository } from '../../api/type-registry';

interface PageContext {
	params: {
		[key: string]: string;
	};
}

export async function getServerSideProps(context: PageContext) {
	const { path, location } = context.params;

	const repository = await getLocationRepository();
	const currentLocation = await repository.getLocation(path, location);

	return {
		props: { currentLocation }
	};
}

interface LocationProps {
	currentLocation: ILocation;
}

export default function LocationPage({ currentLocation }: LocationProps) {
	const router = useRouter();
	const locationRepository = useMemo(() => getClientLocationRepository(), []);
	const encounterRepository = useMemo(() => getClientEncounterRepository(), []);

	const [encounter, setEncounter] = useState<Encounter>(null);

	const handleOnContinue = useCallback(async () => {
		const nextLocation = await locationRepository.getNextLocation(currentLocation.path, currentLocation.id);
		router.push(`/${nextLocation.path}/${nextLocation.id}`);
	}, []);

	useEffect(() => {
		encounterRepository
			.getRandomEncounter([], currentLocation.path)
			.then(encounter => {
				setEncounter(encounter);
			});
	}, []);

	return (
		<>
			<Head />
			<Location
				title={currentLocation.name}
				bodyText={currentLocation.description}
				coverImageUrl={currentLocation.coverImage}
				onContinue={handleOnContinue}
				expectingEncounter
				encounter={encounter}
			/>
		</>
	);
}
