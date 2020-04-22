import { useCallback } from 'react';
import { useSetTimeout } from './use-set-timeout';

export function useWait() {
	const setTimeout = useSetTimeout();
	const wait = useCallback(
		(duration) => new Promise((resolve) => setTimeout(resolve, duration)),
		[]
	);

	return wait;
}
