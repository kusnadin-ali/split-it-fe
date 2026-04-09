import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { registerUser } from "@/services/authService";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import { useRouter } from "expo-router";
import FormInput from "../ui/InputFieldsForm";
import PrimaryButton from "../ui/PrimaryButton";
import { AuthTab } from "./AuthTabSwitcher";

type Props = {
    style?: ViewStyle;
    onChange: (tab: AuthTab) => void;
};

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function SignUpForm({ style, onChange }: Props) {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>(
        {
            defaultValues: {
                email: '',
                password: '', 
                confirmPassword: '',
            },
        }
    );
    const router = useRouter();
    const [isErrorLength, setIsErrorLength] = useState(true);
    const [isErrorCapital, setIsErrorCapital] = useState(true);
    const [isErrorNumber, setIsErrorNumber] = useState(true);
    const [isErrorSpecial, setIsErrorSpecial] = useState(true);
    const [isErrorLower, setIsErrorLower] = useState(true);
    const [isPasswordTouched, setIsPasswordTouched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const { colors } = useTheme();
    const styles = createStyles(colors);

    useEffect(() => {
        if (!isPasswordTouched && watch('password')) {
            setIsPasswordTouched(true);
        }
        watchPassword(watch('password') || '');
    }, [watch('password')])

    const validatePassword = (password: string): boolean => {

        var minLength = 8;
        var hasUpperCase = /[A-Z]/.test(password);
        var hasLowerCase = /[a-z]/.test(password);
        var hasNumbers = /\d/.test(password);
        var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }

    const watchPassword = (password: string) => {
        var minLength = 8;
        var hasUpperCase = /[A-Z]/.test(password);
        var hasLowerCase = /[a-z]/.test(password);
        var hasNumbers = /\d/.test(password);
        var hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setIsErrorLength(password.length < minLength);
        setIsErrorCapital(!hasUpperCase);
        setIsErrorNumber(!hasNumbers);
        setIsErrorSpecial(!hasSpecialChar);
        setIsErrorLower(!hasLowerCase);
    }

    const handleSigninButton = () => {
        onChange('login');
    }

    const onSubmit = async (data: RegisterFormData) => {
        console.log(data);
        setApiError(null);
        setIsLoading(true);
        try {
            const result = await registerUser({
                email: data.email,
                password: data.password,
            });

            console.log('Register success:', result);
            // Simpan token, navigate ke home, dll.
            Toast.show({
                type: 'success',
                text1: 'Account created successfully!',
                text2: 'Welcome to SplitIt 🎉',
            });
            router.push('/(auth)/onboarding');

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Failed to create account',
                text2: error.message || 'Try again in a few moments.',
                autoHide: false,
                swipeable: true,
            });
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <View style={style}>
            {/* <View style={styles.fullNameContainer}>
                <FormInput
                    control={control}
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    rules={{
                        required: 'First name is required',
                        minLength: { value: 2, message: 'First name must be at least 2 characters' },
                        pattern: { value: /^[A-Za-z]+$/, message: 'First name can only contain letters' },
                    }}
                    style={styles.subFullNameContainer}
                    leftIcon="person-outline"
                    error={errors.firstName?.message}
                />
                <FormInput
                    control={control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    rules={{
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Last name must be at least 2 characters' },
                        pattern: { value: /^[A-Za-z]+$/, message: 'Last name can only contain letters' },
                    }}
                    style={styles.subFullNameContainer}
                    leftIcon="person-outline"
                    error={errors.lastName?.message}
                />
            </View> */}
            <FormInput
                control={control}
                name="email"
                label="Email"
                placeholder="john.doe@example.com"
                rules={{
                    required: 'Email is required',
                    pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Email is not valid',
                    },
                }}
                leftIcon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email?.message}
            />

            <FormInput
                control={control}
                name="password"
                label="Password"
                placeholder="Enter password"
                rules={{
                    required: 'Password is required',
                    minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    validate: (value) => validatePassword(value),
                }}
                secureText={true}
                leftIcon="lock-closed-outline"
                error={errors.password?.message}
            />
            {isPasswordTouched && (
                <View style={styles.passwordRequirements}>
                    <Text style={styles.passwordRequirementsLabel}>Password must contain</Text>
                    <View>
                        <Text style={isErrorLength ? styles.passwordRequirementItemMuted : styles.passwordRequirementItem}><Ionicons name={isErrorLength ? "close" : "checkmark"} size={16} style={isErrorLength ? styles.passwordRequirementsIconMuted : styles.passwordRequirementsIcon} /> At least 8 characters</Text>
                        <Text style={isErrorCapital ? styles.passwordRequirementItemMuted : styles.passwordRequirementItem}><Ionicons name={isErrorCapital ? "close" : "checkmark"} size={16} style={isErrorCapital ? styles.passwordRequirementsIconMuted : styles.passwordRequirementsIcon} /> At least one uppercase letter</Text>
                        <Text style={isErrorLower ? styles.passwordRequirementItemMuted : styles.passwordRequirementItem}><Ionicons name={isErrorLower ? "close" : "checkmark"} size={16} style={isErrorLower ? styles.passwordRequirementsIconMuted : styles.passwordRequirementsIcon} /> At least one lowercase letter</Text>
                        <Text style={isErrorNumber ? styles.passwordRequirementItemMuted : styles.passwordRequirementItem}><Ionicons name={isErrorNumber ? "close" : "checkmark"} size={16} style={isErrorNumber ? styles.passwordRequirementsIconMuted : styles.passwordRequirementsIcon} /> At least one number</Text>
                        <Text style={isErrorSpecial ? styles.passwordRequirementItemMuted : styles.passwordRequirementItem}><Ionicons name={isErrorSpecial ? "close" : "checkmark"} size={16} style={isErrorSpecial ? styles.passwordRequirementsIconMuted : styles.passwordRequirementsIcon} /> At least one special character</Text>
                    </View>
                </View>
            )}

            <FormInput
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm password"
                rules={{
                    required: 'Confirm password is required',
                    validate: (value) => value === watch('password') || 'Passwords do not match',
                }}
                secureText={true}
                leftIcon="lock-closed-outline"
                error={errors.confirmPassword?.message}
            />
            <PrimaryButton label="Buat Akun Gratis ✦" onPress={handleSubmit(onSubmit)} style={{ marginTop: 16 }} variant="amber" fullWidth />

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
                <Text>Sudah punya akun? </Text>
                <TouchableOpacity onPress={handleSigninButton}>
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const createStyles = (color: any) => StyleSheet.create({
    fullNameContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    subFullNameContainer: {
        flex: 1,
    },
    passwordRequirements: {
        marginBottom: 12,
    },
    passwordRequirementsLabel: {
        fontWeight: 'bold',
        color: color.textMuted,
    },
    passwordRequirementItemMuted: {
        color: color.amber,
        fontSize: 13,
    },
    passwordRequirementItem: {
        color: color.primary,
        fontSize: 13,
    },
    passwordRequirementsIconMuted: {
        color: color.amber,
    },
    passwordRequirementsIcon: {
        color: color.primary,
    },
})