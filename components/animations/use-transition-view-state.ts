import { useState, useCallback, useRef, useEffect } from 'react';
import { useWait } from '../hooks/use-wait';

export interface UseTransitionStateHook<T> {
	shouldRenderView: (view: T) => boolean;
	isInView: (view: T) => boolean;
	setView: (nextView: T, hasAnimation?: boolean, delay?: number) => void;
	addView: (nextView: T) => void;
}

export function useTransitionViewState<T>(defaultView: T, duration: number): UseTransitionStateHook<T> {
	const wait = useWait();
	const [viewState, setViewState] = useState([defaultView]);
	const [nextViewState, setNextViewState] = useState([defaultView]);
	const currentTimeouts = useRef<number[]>([]);

	const setView = useCallback(async (nextView: T, hasAnimation = true, delay = 0) => {
		currentTimeouts.current.forEach(clearTimeout);

		while (viewState.length > 1) {
			const prevView = viewState[viewState.length - 1];

			const prevNextViewIndex = nextViewState.findIndex((x) => x === prevView);
			nextViewState.splice(prevNextViewIndex, 1);

			setNextViewState([...nextViewState]);

			await wait(duration * 1000);

			viewState.pop();
			setViewState(viewState);
		}

		setNextViewState([nextView]);

		if (hasAnimation) {
			await wait((duration + delay) * 1000);
		}
		
		setViewState([nextView]);
	}, [viewState]);

	const addView = useCallback((nextView: T) => {
		setNextViewState([...nextViewState, nextView]);
		setViewState([...viewState, nextView]);
	}, []);

	const shouldRenderView = useCallback((view: T) => viewState.includes(view), [viewState]);
	const isInView = useCallback(
		(view: T) => viewState.includes(view) && nextViewState.includes(view),
		[viewState, nextViewState]
	);

	useEffect(() => () => currentTimeouts.current.forEach(clearTimeout), []);

	return {
		setView,
		shouldRenderView,
		isInView,
		addView,
	};
}
