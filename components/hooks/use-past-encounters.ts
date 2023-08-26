import { useCallback } from 'react';

export interface UsePastEncountersHook {
	getPastEncounters: () => string[];
	addEncounterToHistory: (encounter: string) => string[];
	clearEncounters: () => void;
}

export function usePastEncounters(): UsePastEncountersHook {
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
		let wrapped = {
			pastEncounters: [ ...previousPastEncounters, encounter ],
		};

		if (previousPastEncounters.includes(encounter)) {
			wrapped = {
				pastEncounters: [encounter],
			};
		}

		window.localStorage.setItem('pastEncounters', JSON.stringify(wrapped));
		return [ ...previousPastEncounters, encounter ];
	}, [getPastEncounters]);

	const clearEncounters = useCallback(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.removeItem('pastEncounters');
	}, []);

	return {
		getPastEncounters,
		addEncounterToHistory,
		clearEncounters,
	};
}
