import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export function useTheme() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;
  return { colors, isDark };
}