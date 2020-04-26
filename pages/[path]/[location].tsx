import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { getClientLocationRepository, getClientEncounterRepository } from '../../components/utility';
import { Location as ILocation } from '../../types/Location';
import { Head } from '../../components/head';
import { Location } from '../../components/location';
import { useRouter } from 'next/router';
import { Encounter } from '../../types/Encounter';
import { getLocationRepository } from '../../api/type-registry';
import { usePastEncounters } from '../../components/hooks/use-past-encounters';
import { usePreviousLocation } from '../../components/hooks/use-previous-location';
import {
	desertTheme,
	seaTheme,
	mountainsTheme,
	forestTheme,
	ThemeProvider,
} from '../../components/theme';
import { IPartialTheme } from '../../types/IPartialTheme';

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
	const { getPastEncounters, addEncounterToHistory } = usePastEncounters();
	const { setPreviousLocation } = usePreviousLocation();
	const locationRepository = useMemo(() => getClientLocationRepository(), []);
	const encounterRepository = useMemo(() => getClientEncounterRepository(), []);

	const [encounter, setEncounter] = useState<Encounter>(null);

	const handleOnContinue = useCallback(async () => {
		if (currentLocation.isLastInPath) {
			router.push('/asleep');
			return;
		}

		const nextLocation = await locationRepository.getNextLocation(currentLocation.path, currentLocation.id);
		router.push(`/${nextLocation.path}/${nextLocation.id}`);
	}, []);

	useEffect(() => {
		setPreviousLocation(`/${currentLocation.path}/${currentLocation.id}`);
	}, []);

	useEffect(() => {
		const encounterPromise = currentLocation.isLastInPath
			? encounterRepository.getFinalEncounter(currentLocation.path)
			: encounterRepository.getRandomEncounter(getPastEncounters(), currentLocation.path);
		
		encounterPromise.then(encounter => {
			setEncounter(encounter);
		});
	}, []);

	const onOpenEncounter = useCallback(() => {
		addEncounterToHistory(encounter.encounterId);
	}, [encounter]);

	const theme = useMemo<IPartialTheme>(() => {
		switch (currentLocation.path) {
			case 'forest':
				return forestTheme;
			case 'desert':
				return desertTheme;
			case 'mountains':
				return mountainsTheme;
			case 'sea':
				return seaTheme;
			default:
				return {};
		}
	}, [currentLocation.path]);

	return (
		<ThemeProvider value={theme}>
			<Head />
			<Location
				title={currentLocation.name}
				bodyText={currentLocation.description}
				coverImageUrl={currentLocation.coverImage}
				onContinue={handleOnContinue}
				expectingEncounter
				encounter={encounter}
				onOpenEncounter={onOpenEncounter}
			/>
		</ThemeProvider>
	);
}
