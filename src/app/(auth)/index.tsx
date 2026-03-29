import AuthTabSwitcher from "@/components/auth/AuthTabSwitcher";
import DecoBlobBackground from "@/components/auth/DecoBlobBackground";
import GoogleButton from "@/components/auth/GoogleButton";
import HeadlineText from "@/components/auth/HeadlineText";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import LogoMark from "@/components/common/LogoMark";
import Card from "@/components/ui/Card";
import DividerWithText from "@/components/ui/DividerWithText";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AuthScreen() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    console.log("Current tab:", tab);
  }, [tab]);

  const handleLogin = () => {
    console.log("Login");
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <DecoBlobBackground />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <View style={styles.logoHero}>
            <LogoMark style={{ marginBottom: 24 }} />
            <HeadlineText tab={tab} />
          </View>

          <AuthTabSwitcher active={tab} onChange={setTab} style={styles.tabSwitcher} />

          <Card style={styles.cardForm} withBorder>
            <GoogleButton onPress={handleLogin}></GoogleButton>
            <DividerWithText value="ATAU DENGAN EMAIL" />
            {tab === 'login' ? (
              <SignInForm onchange={setTab}/>
            ) : (
              <SignUpForm onChange={setTab}/>
            )
            }
          </Card>

        </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    marginTop: 6,
    marginHorizontal: 24,
    marginBottom: 0,
    alignItems: "center",
  },
  logoHero: {
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 24,
    paddingBottom: 6,
  },
  tabSwitcher: {
    width: '100%',
    marginBottom: 4,
    marginHorizontal: 24,
  },
  cardForm: {
    width: '100%',
    marginTop: 6,
    paddingVertical: 24,
    paddingHorizontal: 22,
  },

});
