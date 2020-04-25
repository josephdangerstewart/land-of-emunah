import { useCallback } from 'react';

export interface UsePastEncountersHook {
	getPastEncounters: () => string[];
	addEncounterToHistory: (encounter: string) => string[];
}

export function usePastEncounters() {
	const getPastEncounters = useCallback(() => {
		if (typeof window === 'undefined') {
			return [];
		}

		const rawData = window.localStorage.getItem('pastEncounters');
		if (!rawData) {
			return [];
		}

		const { pastEncounters } = JSON.parse(rawData) as { pastEncounters: string[] };

		return pastEncounters;
	}, []);

	const addEncounterToHistory = useCallback((encounter: string) => {
		if (typeof window === 'undefined') {
			return;
		}

		const previousPastEncounters = getPastEncounters();

		const wrapped = {
			pastEncounters: [ ...previousPastEncounters, encounter ],
		};

		window.localStorage.setItem('pastEncounters', JSON.stringify(wrapped));
		return [ ...previousPastEncounters, encounter ];
	}, [getPastEncounters]);

	return {
		getPastEncounters,
		addEncounterToHistory,
	};
}
