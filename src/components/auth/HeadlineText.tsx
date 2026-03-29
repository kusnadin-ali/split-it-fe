import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type AuthTab = 'login' | 'register';

type Props = {
    tab: AuthTab;
    style?: ViewStyle;
};

export default function HeadlineText({ tab, style }: Props) {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    const config = {
        login: {
            title: "Selamat",
            secondTitle: "datang",
            subtitle: "Masuk untuk lanjut split tagihan bareng teman",
        },
        register: {
            title: "Buat akun",
            secondTitle: "baru",
            subtitle: "Bergabung dan mulai split tagihan dengan mudah",
        },
    };

    const { title, secondTitle, subtitle } = config[tab];

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title} <Text style={styles.secondTitle}>{secondTitle}</Text></Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            marginBottom: 24,
            alignItems: "center",
        },
        title: {
            fontSize: 28,
            fontFamily: "Fraunces_600SemiBold",
            color: colors.textPrimary,
        },
        secondTitle: {
            color: colors.textSecond,
        },
        subtitle: {
            fontSize: 14,
            color: colors.textSecond,
            marginTop: 6,
        },
    });