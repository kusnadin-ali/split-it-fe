import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import InputField from "../ui/InputFields";
import PrimaryButton from "../ui/PrimaryButton";
import { AuthTab } from "./AuthTabSwitcher";

type Props = {
    style?: ViewStyle;
    onchange: (tab: AuthTab) => void;
};

export default function SignInForm({ style, onchange }: Props) {
    const { colors } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<{ email?: string, password?: string }>({});
    const [loading, setLoading] = useState(false);

    const handleSignupButton = () => {
        onchange('register');
    }

    return (
        <View style={style}>
            <InputField
                label="Email"
                placeholder="john@email.com"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    const validation = validateEmail(text);
                    setError(prev => ({ ...prev, email: validation.error }));
                }}
                labelIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                error={error.email}
            />
            <InputField
                label="Password"
                placeholder="Masukkan password"
                value={password}
                onChangeText={setPassword}
                labelIcon="lock-closed-outline"
                secureText={true}
            />

            <PrimaryButton label="Masuk" onPress={() => console.log("Login")} style={{ marginTop: 16 }} loading={loading} fullWidth />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                <Text>Belum punya akun? </Text>
                <TouchableOpacity onPress={handleSignupButton}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

function validateEmail(email: string): { isValid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
        isValid: emailRegex.test(email),
        error: emailRegex.test(email) ? undefined : 'Enter a valid email address',
    };
};
