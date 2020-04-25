import { popIn, popOut } from './pop-in-out';
import { fadeIn, fadeOut } from './fade-in-out';
import { Keyframes, css, FlattenSimpleInterpolation } from 'styled-components';

export enum AnimationKind {
	PopIn = 'pop-in',
	PopOut = 'pop-out',
	FadeIn = 'fade-in',
	FadeOut = 'fade-out',
}

const animationMap: Record<AnimationKind, Keyframes> = {
	[AnimationKind.PopIn]: popIn,
	[AnimationKind.PopOut]: popOut,
	[AnimationKind.FadeIn]: fadeIn,
	[AnimationKind.FadeOut]: fadeOut,
};

export function generateAnimation(animation: AnimationKind, duration: number, delay = 0): FlattenSimpleInterpolation {
	return css`
		animation: ${animationMap[animation]} ${duration}s cubic-bezier(0.390, 0.575, 0.565, 1.000) both ${delay}s;
	`;
}