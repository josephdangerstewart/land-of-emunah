import React, { useContext, useCallback } from 'react';

export interface AnimationDurationContext {
	duration: number;
	delayIncrement: number;
}

export interface UseAnimationDurationHook {
	duration: number;
	delayIncrement: number;
	getDelay: (order: number) => number;
}

const AnimationDurationContext = React.createContext<AnimationDurationContext>({
	duration: 0.75,
	delayIncrement: 0.15,
});

export function useAnimationDuration(initialDelay?: number): UseAnimationDurationHook {
	const context = useContext(AnimationDurationContext);

	const getDelay = useCallback((order: number) => (order * context.delayIncrement) + initialDelay, [context.delayIncrement]);

	return {
		...context,
		getDelay,
	};
}

export const AnimationDurationProvider = AnimationDurationContext.Provider;
