import { Typography } from '@/constants/Typography';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';

// Data avatar statis — nanti bisa dari props kalau dynamic
const AVATARS = [
  { initial: 'R', color: '#8AA624' },
  { initial: 'A', color: '#FEA405', textColor: '#2A1F00' },
  { initial: 'S', color: '#6B8A1A' },
  { initial: 'B', color: '#4A6010' },
];

type Props = {
  userCount?: string;
  rating?: string;
  style?: ViewStyle;
};

export default function SocialProof({
  userCount = '2.400+',
  rating = '4.9',
  style,
}: Props) {
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
      {/* Stacked avatars — urutan dibalik agar overlap ke kanan */}
      <View style={styles.avatarStack}>
        {[...AVATARS].reverse().map((av, i) => (
          <View
            key={i}
            style={[
              styles.avatar,
              {
                backgroundColor: av.color,
                borderColor: colors.muted,
                // Tiap avatar overlap ke kiri
                marginLeft: i === 0 ? 0 : -8,
                zIndex: AVATARS.length - i,
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                { color: av.textColor ?? '#FFFFFF' },
              ]}
            >
              {av.initial}
            </Text>
          </View>
        ))}
      </View>

      {/* Teks proof */}
      <View style={styles.textWrap}>
        <Text style={[styles.mainText, { color: colors.textMuted }]}>
          <Text style={[styles.boldText, { color: colors.text }]}>
            {userCount}
          </Text>
          {' '}pengguna join bulan ini
        </Text>
        <Text style={[styles.ratingText, { color: colors.textMuted }]}>
          <Text style={styles.stars}>⭐</Text>
          {' '}{rating} rating
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    padding: 13,
    borderWidth: 1,
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 10,
    fontFamily: Typography.instrumentBold,
  },
  textWrap: {
    flex: 1,
  },
  mainText: {
    fontFamily: Typography.instrument,
    fontSize: 12,
    lineHeight: 17,
  },
  boldText: {
    fontFamily: Typography.instrumentBold,
  },
  ratingText: {
    fontFamily: Typography.instrument,
    fontSize: 12,
    marginTop: 1,
  },
  stars: {
    fontSize: 11,
  },
});