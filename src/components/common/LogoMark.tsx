import { Typography } from '@/constants/Typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

type Props = {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  style?: ViewStyle;
};

const SIZE_MAP = {
  sm: { box: 36, icon: 20, fontSize: 20 },
  md: { box: 48, icon: 26, fontSize: 26 },
  lg: { box: 60, icon: 32, fontSize: 32 },
};

export default function LogoMark({
  size = 'md',
  showWordmark = true,
  style,
}: Props) {
  const { colors } = useTheme();
  const dim = SIZE_MAP[size];

  return (
    <View style={[styles.row, style]}>
      {/* Icon box */}
      <View
        style={[
          styles.iconBox,
          {
            width: dim.box,
            height: dim.box,
            borderRadius: dim.box * 0.33,
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
          },
        ]}
      >
        <Svg
          width={dim.icon}
          height={dim.icon}
          viewBox="0 0 26 26"
          fill="none"
        >
          {/* Bill lines */}
          <Path
            d="M6 7h14M6 13h8M6 19h10"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Amber circle (split indicator) */}
          <Circle cx="20" cy="19" r="4" fill="#FEA405" />
          {/* Plus sign inside circle */}
          <Path
            d="M18.5 19H21.5M20 17.5V20.5"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </Svg>
      </View>

      {/* Wordmark */}
      {showWordmark && (
        <Text style={[styles.wordmark, { fontSize: dim.fontSize, color: colors.text }]}>
          Split
          <Text style={[styles.wordmarkItalic, { color: colors.primary }]}>
            It
          </Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  wordmark: {
    fontFamily: Typography.fraunces,
    letterSpacing: -0.5,
  },
  wordmarkItalic: {
    fontFamily: Typography.frauncesItalic,
  },
});