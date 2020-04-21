import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseTransitionStateHook<T> {
	shouldRenderView: (view: T) => boolean;
	isInView: (view: T) => boolean;
	setView: (nextView: T, hasAnimation?: boolean) => void;
}

export function useTransitionViewState<T>(defaultView: T, duration: number): UseTransitionStateHook<T> {
	const [viewState, setViewState] = useState(defaultView);
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

	const shouldRenderView = useCallback((view: T) => viewState === view, [viewState]);
	const isInView = useCallback(
		(view: T) => viewState === view && viewState === nextViewState,
		[viewState, nextViewState]
	);

	useEffect(() => () => clearTimeout(currentTimeout.current), []);

	return {
		setView,
		shouldRenderView,
		isInView,
	};
}
