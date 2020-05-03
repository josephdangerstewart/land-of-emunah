import { ITheme } from '../../types/ITheme';
import { darken } from 'polished';

export const defaultTheme: ITheme = {
	background: '#A4B494',
	buttonBackground: '#E0D2A8',
	buttonHoverBackground: darken(0.1, '#E0D2A8'),
	buttonDisabledBackground: '#E0D2A8',

	headerColor: '#375147',
	bodyColor: '#375147',
	buttonColor: '#375147',

	headerFont: '50px \'Averia Serif Libre\', cursive',
	bodyFont: '18px \'Averia Serif Libre\', cursive',
	buttonFont: '20px \'Averia Serif Libre\', cursive',
};
