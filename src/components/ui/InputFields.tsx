import { Typography } from '@/constants/Typography';
import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  leftIcon?: IoniconName;
  secureText?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoComplete?: string;
  error?: string;
  hint?: string;
  editable?: boolean;
  style?: ViewStyle;
  labelIcon?: IoniconName;
};

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  leftIcon,
  secureText = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  hint,
  editable = true,
  style,
  labelIcon,
}: Props) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = secureText;
  const borderColor = error
    ? '#E05252'
    : focused
      ? colors.borderFocus
      : colors.border;

  const shadowStyle = focused
    ? {
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 3,
    }
    : {};

  return (
    <View style={[styles.wrapper, style]}>
      {/* Label */}
      <View style={styles.label}>
        {labelIcon && <Ionicons name={labelIcon} size={15} color={colors.textMuted} style={{ marginRight: 6 }} />}
        <Text style={[styles.labelText, { color: colors.textMuted }]}>{label}</Text>
      </View>

      {/* Input row */}
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: editable ? colors.input : colors.muted,
            borderColor,
          },
          shadowStyle,
        ]}
      >
        {/* Left icon */}
        {leftIcon && (
          <View style={styles.iconLeft}>
            <Ionicons name={leftIcon} size={18} color={colors.textMuted} />
          </View>
        )}

        {/* Text input */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.input,
            {
              color: colors.text,
              fontFamily: Typography.instrument,
              paddingLeft: leftIcon ? 0 : 14,
              paddingRight: isPassword ? 44 : 14,
              opacity: editable ? 1 : 0.6,
            },
          ]}
        />

        {/* Eye toggle — hanya muncul kalau password */}
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {showPassword ? (
              <Ionicons name="eye-off-outline" size={20} color={colors.textMuted} />
            ) : (
              <Ionicons name="eye-outline" size={20} color={colors.textMuted} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Error message */}
      {error && (
        <Text style={[styles.errorText, { color: '#E05252' }]}>
          {error}
        </Text>
      )}

      {/* Hint text */}
      {hint && !error && (
        <Text style={[styles.hintText, { color: colors.textMuted }]}>
          {hint}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  labelText: {
    fontFamily: Typography.instrumentBold,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    minHeight: 50,
    overflow: 'hidden',
  },
  iconLeft: {
    paddingLeft: 13,
    paddingRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 13,
  },
  eyeBtn: {
    position: 'absolute',
    right: 13,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 4,
  },
  errorText: {
    fontFamily: Typography.instrument,
    fontSize: 12,
    marginTop: 5,
  },
  hintText: {
    fontFamily: Typography.instrument,
    fontSize: 11,
    marginTop: 5,
    lineHeight: 16,
  },
});