import { Typography } from '@/constants/Typography';
import { useTheme } from '@/hooks/useTheme';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  password: string;
};

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

function getScore(password: string): StrengthLevel {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8)          score++;
  if (/[A-Z]/.test(password))        score++;
  if (/[0-9]/.test(password))        score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score as StrengthLevel;
}

const STRENGTH_CONFIG: Record<StrengthLevel, { label: string; emoji: string; color: string }> = {
  0: { label: 'Ketik untuk cek kekuatan sandi', emoji: '',   color: 'transparent' },
  1: { label: 'Lemah',                          emoji: '😬', color: '#E05252' },
  2: { label: 'Lumayan',                        emoji: '👌', color: '#FEA405' },
  3: { label: 'Kuat',                           emoji: '💪', color: '#8AA624' },
  4: { label: 'Sangat kuat',                    emoji: '🔒', color: '#4E6612' },
};

export default function PasswordStrengthBar({ password }: Props) {
  const { colors } = useTheme();
  const score = useMemo(() => getScore(password), [password]);
  const config = STRENGTH_CONFIG[score];

  const getSegmentColor = (index: number) => {
    // index 0–3, hanya warnai segmen sampai score
    if (index < score) return config.color;
    return colors.muted;
  };

  return (
    <View style={styles.wrapper}>
      {/* 4 segmen bar */}
      <View style={styles.barRow}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.segment,
              { backgroundColor: getSegmentColor(i) },
            ]}
          />
        ))}
      </View>

      {/* Label */}
      <Text style={[styles.label, { color: colors.textMuted }]}>
        {score > 0
          ? `${config.emoji}  ${config.label}`
          : config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
  },
  barRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 5,
  },
  segment: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  label: {
    fontFamily: Typography.instrument,
    fontSize: 11,
  },
});