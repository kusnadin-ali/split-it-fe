import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {

    value: string;

};

export default function DividerWithText({ value }: Props) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.container}>
            {/* Garis Kiri */}
            <View style={styles.line} />

            {/* Teks Tengah */}
            <Text style={styles.text}>{value}</Text>

            {/* Garis Kanan */}
            <View style={styles.line} />
        </View>
    );
};

const createStyles = (colors: any) =>StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20, 
        paddingHorizontal: 10,
    },
    line: {
        flex: 1,           
        height: 1,         
        backgroundColor: colors.border, 
    },
    text: {
        marginHorizontal: 10,
        color: colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 1,  
    },
});