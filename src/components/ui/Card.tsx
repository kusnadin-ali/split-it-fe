import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
    StyleSheet,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';

type Props = ViewProps & {
  children: React.ReactNode;
  style?: ViewStyle;

  // customization
  padding?: number;
  radius?: number;
  withBorder?: boolean;
  withShadow?: boolean;
};

export default function Card({
  children,
  style,
  padding = 12,
  radius = 12,
  withBorder = false,
  withShadow = false,
  ...rest
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      {...rest}
      style={[
        styles.base,
        {
          backgroundColor: colors.card,
          padding,
          borderRadius: radius,
        },
        withBorder && {
          borderWidth: 1,
          borderColor: colors.border,
        },
        withShadow && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
  },
});