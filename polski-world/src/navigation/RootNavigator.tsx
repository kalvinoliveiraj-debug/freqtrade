import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useStore } from '../engine/store';
import { theme } from '../theme';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import LessonScreen from '../screens/LessonScreen';
import ResultsScreen from '../screens/ResultsScreen';
import TutorScreen from '../screens/TutorScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaywallScreen from '../screens/PaywallScreen';
import CertificateScreen from '../screens/CertificateScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Lesson: { dayNumber: number };
  Results: {
    dayNumber: number;
    xpGained: number;
    correct: number;
    total: number;
    newMilestone: number | null;
  };
  Tutor: undefined;
  Profile: undefined;
  Paywall: undefined;
  Certificate: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: theme.colors.bg, card: theme.colors.bg, text: theme.colors.text },
};

export default function RootNavigator() {
  const onboarded = useStore((s) => s.profile.onboarded);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.bg },
          headerTintColor: theme.colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.colors.bg },
        }}
      >
        {!onboarded ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Lesson" component={LessonScreen} options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Tutor" component={TutorScreen} options={{ title: 'Orzełek' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
            <Stack.Screen name="Paywall" component={PaywallScreen} options={{ title: 'Polski World Plus' }} />
            <Stack.Screen name="Certificate" component={CertificateScreen} options={{ title: 'Certificado' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
