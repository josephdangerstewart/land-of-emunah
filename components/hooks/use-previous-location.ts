import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

export interface UsePreviousLocationHook {
	getPreviousLocation: () => string;
	setPreviousLocation: (location: string) => void;
}

export function usePreviousLocation<UsePreviousLocationHook>() {
	const getPreviousLocation = useCallback(() => {
		if (typeof window === 'undefined') {
			return null;
		}

		return window.localStorage.getItem('previousLocation') ?? null;
	}, []);

	const setPreviousLocation = useCallback((location: string) => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem('previousLocation', location);
	}, []);

	return {
		getPreviousLocation,
		setPreviousLocation,
	};
};

export function useSaveLocation() {
	const { setPreviousLocation } = usePreviousLocation();
	const router = useRouter();

	useEffect(() => {
		setPreviousLocation(router.route);
	}, [setPreviousLocation, router]);
}
