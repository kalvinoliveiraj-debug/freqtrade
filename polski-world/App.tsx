import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import RootNavigator from './src/navigation/RootNavigator';
import { useStore } from './src/engine/store';
import { activePack } from './src/packs';
import { theme } from './src/theme';

export default function App() {
  // Wait for persisted state (AsyncStorage) to rehydrate before rendering,
  // so the onboarding gate doesn't flash for returning users.
  const [hydrated, setHydrated] = useState(useStore.persist.hasHydrated());

  useEffect(() => {
    const unsub = useStore.persist.onFinishHydration(() => setHydrated(true));
    if (useStore.persist.hasHydrated()) setHydrated(true);
    return unsub;
  }, []);

  if (!hydrated) {
    return (
      <View style={styles.splash}>
        <Text style={styles.eagle}>🦅</Text>
        <Text style={styles.brand}>{activePack.meta.productName}</Text>
        <ActivityIndicator color={theme.colors.accent} style={{ marginTop: 16 }} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, backgroundColor: theme.colors.bg, alignItems: 'center', justifyContent: 'center' },
  eagle: { fontSize: 72 },
  brand: { color: theme.colors.text, fontSize: 32, fontWeight: '900', marginTop: 8 },
});
