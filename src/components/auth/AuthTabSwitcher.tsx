import { Typography } from '@/constants/Typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export type AuthTab = 'login' | 'register';

type Props = {
  active: AuthTab;
  onChange: (tab: AuthTab) => void;
  style?: ViewStyle;
};

const TABS: { key: AuthTab; label: string }[] = [
  { key: 'login',    label: 'Masuk' },
  { key: 'register', label: 'Daftar' },
];

export default function AuthTabSwitcher({ active, onChange, style }: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.muted,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.75}
            style={[
              styles.tab,
              isActive && {
                backgroundColor: colors.card,
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? colors.primaryDark : colors.textMuted,
                  fontFamily: isActive
                    ? Typography.instrumentBold
                    : Typography.instrumentMedium,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1.5,
    gap: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
    letterSpacing: 0.1,
  },
});