import { useTheme } from '@/hooks/useTheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

// Tiap blob punya posisi, ukuran, warna, dan opacity sendiri
type BlobConfig = {
  color: string;
  width: number;
  height: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  opacity: number;
};

export default function DecoBlobBackground() {
  const { colors, isDark } = useTheme();
  const { width } = useWindowDimensions();

  const blobs: BlobConfig[] = [
    {
      color: colors.primary,        // olive
      width: 200,
      height: 200,
      top: -60,
      left: -50,
      opacity: isDark ? 0.2 : 0.38,
    },
    {
      color: colors.amber,          // amber
      width: 150,
      height: 150,
      top: 10,
      right: -20,
      opacity: isDark ? 0.15 : 0.32,
    },
    {
      color: colors.sage,           // sage
      width: 110,
      height: 110,
      top: 130,
      left: width * 0.3,
      opacity: isDark ? 0.12 : 0.45,
    },
  ];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {blobs.map((blob, index) => (
        <BlobItem key={index} blob={blob} isDark={isDark} />
      ))}
    </View>
  );
}

// Blob individual — pakai BlurView untuk efek blur
function BlobItem({
  blob,
  isDark,
}: {
  blob: BlobConfig;
  isDark: boolean;
}) {
  return (
    <View
      style={[
        styles.blobOuter,
        {
          width: blob.width,
          height: blob.height,
          top: blob.top,
          bottom: blob.bottom,
          left: blob.left,
          right: blob.right,
        },
      ]}
    >
      {/* Layer 1: warna utama */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: blob.color,
            borderRadius: blob.width / 2,
            opacity: blob.opacity,
          },
        ]}
      />

      {/* Layer 2: blur overlay */}
      <BlurView
        intensity={isDark ? 60 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: blob.width / 2,
            filter: 'blur(50px)',
          },
        ]}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  blobOuter: {
    position: 'absolute',
    overflow: 'hidden',
  },
});