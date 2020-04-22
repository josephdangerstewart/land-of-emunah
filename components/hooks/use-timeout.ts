import { useRef, useCallback, useEffect } from 'react';

export type SetTimeoutType = (handler: () => void, duration: number) => void;

export function useSetTimeout(): SetTimeoutType {
	const timeouts = useRef<number[]>([]);

	const wrappedSetTimeout = useCallback<SetTimeoutType>((handler, duration) => {
		const timeout = setTimeout(handler, duration);
		timeouts.current.push(timeout);
	}, []);

	useEffect(() => () => timeouts.current.forEach(clearTimeout), []);
	
	return wrappedSetTimeout;
}
