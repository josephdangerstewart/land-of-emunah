import { useRef, useCallback, useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SetTimeoutType = (handler: (...args: any[]) => void, duration: number) => void;

export function useSetTimeout(): SetTimeoutType {
	const timeouts = useRef<number[]>([]);

	const wrappedSetTimeout = useCallback<SetTimeoutType>((handler, duration) => {
		const timeout = setTimeout(handler, duration);
		timeouts.current.push(timeout);
	}, []);

	useEffect(() => () => timeouts.current.forEach(clearTimeout), []);
	
	return wrappedSetTimeout;
}
