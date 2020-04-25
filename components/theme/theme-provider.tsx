import { createContext, useContext } from 'react';
import { ITheme } from '../../types/ITheme';
import { defaultTheme } from './default-theme';
import { IPartialTheme } from '../../types/IPartialTheme';

const ThemeContext = createContext<IPartialTheme>({});

export const ThemeProvider = ThemeContext.Provider;

export function useTheme(): ITheme {
	const partialTheme = useContext(ThemeContext);
	return {
		...defaultTheme,
		...partialTheme,
	};
}
