import { Typography } from '@/constants/Typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle
} from 'react-native';

type Variant = 'olive' | 'amber' | 'secondary';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export default function PrimaryButton({
  label,
  onPress,
  variant = 'olive',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
}: Props) {
  const { colors } = useTheme();

  const getBgColor = () => {
    if (disabled) return colors.muted;
    switch (variant) {
      case 'olive':     return colors.primary;
      case 'amber':     return colors.amber;
      case 'secondary': return colors.muted;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    switch (variant) {
      case 'olive':     return '#FFFFFF';
      case 'amber':     return '#2A1F00';
      case 'secondary': return colors.text;
    }
  };

  const getBorderColor = () => {
    if (variant === 'secondary') return colors.border;
    return 'transparent';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.82}
      style={[
        styles.base,
        {
          backgroundColor: getBgColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'secondary' ? 1.5 : 0,
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'amber' ? '#2A1F00' : '#FFFFFF'}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            { color: getTextColor() },
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  label: {
    fontFamily: Typography.instrumentBold,
    fontSize: 15,
    letterSpacing: 0.2,
  },
});