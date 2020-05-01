import { generateAnimation, AnimationKind } from './animations';
import styled from 'styled-components';
import { AnimatableComponent } from '../types/AnimatableComponent';

export const FadeIn = styled.div<AnimatableComponent>`
	${({ inView, animationDuration, delay }) => inView
		? generateAnimation(AnimationKind.FadeIn, animationDuration, delay)
		: generateAnimation(AnimationKind.FadeOut, animationDuration, delay)}
`;
