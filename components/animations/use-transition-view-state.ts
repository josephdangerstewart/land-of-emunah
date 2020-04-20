import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseTransitionStateHook<T> {
	view: T;
	nextView: T;
	setView: (nextView: T, hasAnimation?: boolean) => void;
}

export function useTransitionViewState<T>(defaultView: T, duration: number): UseTransitionStateHook<T> {
	const [view, setViewState] = useState(defaultView);
	const [nextViewState, setNextViewState] = useState(defaultView);
	const currentTimeout = useRef(null);

	const setView = useCallback((nextView: T, hasAnimation = true) => {
		if (currentTimeout.current) {
			clearTimeout(currentTimeout.current);
		}

		setNextViewState(nextView);
		if (hasAnimation) {
			currentTimeout.current = setTimeout(() => {
				setViewState(nextView);
			}, duration * 1000);
		} else {
			setViewState(nextView);
		}
	}, []);

	useEffect(() => () => clearTimeout(currentTimeout.current), []);

	return {
		view,
		setView,
		nextView: nextViewState,
	};
}
