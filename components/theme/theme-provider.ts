import { createContext, useContext } from 'react';
import { ITheme } from '../../types/ITheme';
import { defaultTheme } from './default-theme';

const ThemeContext = createContext<ITheme>(defaultTheme);

export const Provider = ThemeContext.Provider;

export function useTheme(): ITheme {
	return useContext(ThemeContext);
}
