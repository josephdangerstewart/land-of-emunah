import { popIn, popOut } from './pop-in-out';
import { Keyframes, css, FlattenSimpleInterpolation } from 'styled-components';

export enum Animations {
	PopIn = 'pop-in',
	PopOut = 'pop-out',
}

const animationMap: Record<Animations, Keyframes> = {
	[Animations.PopIn]: popIn,
	[Animations.PopOut]: popOut,
}

export function generateAnimation(animation: Animations, duration: number, delay = 0): FlattenSimpleInterpolation {
	return css`
		animation: ${animationMap[animation]} ${duration}s cubic-bezier(0.390, 0.575, 0.565, 1.000) both ${delay}s;
	`;
}
