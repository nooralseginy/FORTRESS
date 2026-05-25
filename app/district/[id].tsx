import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette } from '@/src/art/palette';
import { DISTRICTS, DistrictId } from '@/src/game/districts';

export default function DistrictDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const district = (id && (DISTRICTS as Record<string, (typeof DISTRICTS)[DistrictId]>)[id]) || null;

  if (!district) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <Stack.Screen options={{ title: 'Unknown' }} />
        <View style={styles.unknown}>
          <Text style={styles.unknownText}>This district has not been founded yet.</Text>
          <Link href="/" style={styles.link}>
            ← Return to the fortress
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Stack.Screen
        options={{
          title: '',
          headerStyle: { backgroundColor: district.color },
          headerTintColor: palette.ink,
        }}
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Hero strip */}
        <View style={[styles.hero, { backgroundColor: district.color }]}>
          <Text style={[styles.heroPillar, { color: district.colorDark }]}>
            {district.pillar.toUpperCase()}
          </Text>
          <Text style={[styles.heroName, { color: palette.ink }]}>{district.building}</Text>
          <Text style={[styles.heroTagline, { color: district.colorDark }]}>
            {district.tagline}
          </Text>
        </View>

        {/* Stats card */}
        <View style={styles.statCard}>
          <View>
            <Text style={styles.statSmall}>LEVEL</Text>
            <Text style={styles.statBig}>1</Text>
          </View>
          <View>
            <Text style={styles.statSmall}>{district.resource.toUpperCase()}</Text>
            <Text style={styles.statBig}>0</Text>
          </View>
          <View>
            <Text style={styles.statSmall}>STREAK</Text>
            <Text style={styles.statBig}>—</Text>
          </View>
        </View>

        {/* Advisor card */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>YOUR ADVISOR</Text>
          <View style={styles.advisorCard}>
            <View style={[styles.advisorBadge, { backgroundColor: district.color }]}>
              <Text style={styles.advisorBadgeText}>
                {district.advisor.title.split(' ').slice(-1)[0][0]}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.advisorTitle}>{district.advisor.title}</Text>
              <Text style={styles.advisorVoice}>{district.advisor.voice}</Text>
              <Text style={styles.advisorComing}>
                The Council convenes in Step 3 — your advisor will speak then.
              </Text>
            </View>
          </View>
        </View>

        {/* Example actions */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>WHAT FEEDS THIS DISTRICT</Text>
          <View style={styles.examples}>
            {district.examples.map((ex) => (
              <View key={ex} style={styles.exampleChip}>
                <Text style={styles.exampleText}>{ex}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Log placeholder */}
        <Pressable style={[styles.logBtn, { borderColor: district.color }]} disabled>
          <Text style={[styles.logBtnText, { color: district.color }]}>
            + Log to the {district.name}
          </Text>
          <Text style={styles.logBtnSub}>Wired up in Step 2.</Text>
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.uiBg },
  scroll: { paddingBottom: 24 },

  hero: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 36,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroPillar: { fontSize: 12, letterSpacing: 2, fontWeight: '700' },
  heroName: { fontSize: 32, fontWeight: '800', marginTop: 4, letterSpacing: -0.5 },
  heroTagline: { fontSize: 14, marginTop: 6, fontStyle: 'italic' },

  statCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: palette.uiBgRaised,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 14,
    padding: 16,
  },
  statSmall: { color: palette.uiDim, fontSize: 10, letterSpacing: 1.5, textAlign: 'center' },
  statBig: { color: palette.ui, fontSize: 24, fontWeight: '800', textAlign: 'center', marginTop: 2 },

  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionLabel: {
    color: palette.uiDim,
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
  },

  advisorCard: {
    flexDirection: 'row',
    backgroundColor: palette.uiBgRaised,
    borderRadius: 14,
    padding: 14,
    gap: 12,
    alignItems: 'flex-start',
  },
  advisorBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  advisorBadgeText: { color: palette.ink, fontWeight: '800', fontSize: 18 },
  advisorTitle: { color: palette.ui, fontSize: 16, fontWeight: '700' },
  advisorVoice: { color: palette.uiDim, fontSize: 13, marginTop: 4, fontStyle: 'italic' },
  advisorComing: { color: palette.gold, fontSize: 12, marginTop: 8 },

  examples: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  exampleChip: {
    backgroundColor: palette.uiBgRaised,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  exampleText: { color: palette.ui, fontSize: 13 },

  logBtn: {
    marginTop: 24,
    marginHorizontal: 16,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    opacity: 0.75,
  },
  logBtnText: { fontSize: 16, fontWeight: '700' },
  logBtnSub: { color: palette.uiDim, fontSize: 12, marginTop: 4 },

  unknown: { padding: 24, alignItems: 'center' },
  unknownText: { color: palette.ui, fontSize: 16 },
  link: { color: palette.gold, fontSize: 14, marginTop: 16 },
});
