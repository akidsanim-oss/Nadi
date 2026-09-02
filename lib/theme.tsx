import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Mode = 'system' | 'light' | 'dark';

export type Palette = {
  scheme: 'light' | 'dark';
  bg: string;
  bgElevated: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  muted: string;
  faint: string;
  primary: string;
  primarySoft: string;
  accent: string;
  warm: string;
  success: string;
  star: string;
  danger: string;
  overlay: string;
  tabBar: string;
};

const dark: Palette = {
  scheme: 'dark',
  bg: '#07080C',
  bgElevated: '#0D0F16',
  surface: '#12141C',
  surfaceAlt: '#191C26',
  border: '#242835',
  text: '#F3F5FA',
  muted: '#9AA3B5',
  faint: '#5C6478',
  primary: '#5B7CFF',
  primarySoft: 'rgba(91,124,255,0.16)',
  accent: '#22D3EE',
  warm: '#FF7A59',
  success: '#34D399',
  star: '#FFC55C',
  danger: '#FF5D5D',
  overlay: 'rgba(0,0,0,0.62)',
  tabBar: 'rgba(10,12,18,0.96)',
};

const light: Palette = {
  scheme: 'light',
  bg: '#F5F7FC',
  bgElevated: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#EFF2F9',
  border: '#E2E7F1',
  text: '#0B1020',
  muted: '#5D6980',
  faint: '#95A0B4',
  primary: '#3D5AFE',
  primarySoft: 'rgba(61,90,254,0.10)',
  accent: '#0EA5B7',
  warm: '#F05A34',
  success: '#12A970',
  star: '#F5A623',
  danger: '#E0343F',
  overlay: 'rgba(10,14,25,0.45)',
  tabBar: 'rgba(255,255,255,0.97)',
};

export const radius = { sm: 10, md: 16, lg: 22, xl: 30, pill: 999 };
export const space = { xs: 6, sm: 10, md: 16, lg: 22, xl: 30, xxl: 44 };

export const brandGradient = ['#5B7CFF', '#7C4DFF', '#22D3EE'] as const;
export const warmGradient = ['#FF7A59', '#FF4D8D'] as const;

type Ctx = {
  c: Palette;
  mode: Mode;
  setMode: (m: Mode) => void;
  isDark: boolean;
};

const ThemeCtx = createContext<Ctx>({ c: dark, mode: 'system', setMode: () => {}, isDark: true });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<Mode>('dark');

  useEffect(() => {
    AsyncStorage.getItem('hw.theme').then((v) => {
      if (v === 'light' || v === 'dark' || v === 'system') setModeState(v);
    });
  }, []);

  const setMode = (m: Mode) => {
    setModeState(m);
    AsyncStorage.setItem('hw.theme', m);
  };

  const scheme = mode === 'system' ? (system === 'light' ? 'light' : 'dark') : mode;
  const value = useMemo(
    () => ({ c: scheme === 'light' ? light : dark, mode, setMode, isDark: scheme === 'dark' }),
    [scheme, mode]
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

export function shadow(c: Palette, level: 1 | 2 | 3 = 1) {
  const conf = {
    1: { o: c.scheme === 'dark' ? 0.35 : 0.06, r: 12, h: 4, e: 3 },
    2: { o: c.scheme === 'dark' ? 0.45 : 0.1, r: 20, h: 8, e: 6 },
    3: { o: c.scheme === 'dark' ? 0.55 : 0.14, r: 30, h: 14, e: 12 },
  }[level];
  return {
    shadowColor: c.scheme === 'dark' ? '#000' : '#0B1020',
    shadowOpacity: conf.o,
    shadowRadius: conf.r,
    shadowOffset: { width: 0, height: conf.h },
    elevation: conf.e,
  };
}
