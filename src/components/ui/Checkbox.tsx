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

type Props = {
  checked: boolean;
  onToggle: () => void;
  label?: React.ReactNode;  // bisa string atau JSX (untuk link di tengah teks)
  style?: ViewStyle;
};

export default function Checkbox({
  checked,
  onToggle,
  label,
  style,
}: Props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.7}
      style={[styles.row, style]}
    >
      {/* Box */}
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked ? colors.primary : colors.input,
            borderColor: checked ? colors.primary : colors.border,
          },
        ]}
      >
        {checked && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>

      {/* Label */}
      {label && (
        <View style={styles.labelWrap}>
          {typeof label === 'string' ? (
            <Text
              style={[
                styles.labelText,
                { color: colors.textMuted },
              ]}
            >
              {label}
            </Text>
          ) : (
            label
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkmark: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 14,
  },
  labelWrap: {
    flex: 1,
  },
  labelText: {
    fontFamily: Typography.instrument,
    fontSize: 12.5,
    lineHeight: 19,
  },
});