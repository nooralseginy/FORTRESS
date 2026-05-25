import { View, Text, ScrollView, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { FortressHero } from '@/src/art/FortressHero';
import { palette } from '@/src/art/palette';
import { DISTRICT_ORDER, DISTRICTS, DistrictId } from '@/src/game/districts';

export default function Home() {
  const { width } = useWindowDimensions();
  const fortressWidth = Math.min(width - 32, 520);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Top strip — house identity */}
        <View style={styles.topStrip}>
          <View>
            <Text style={styles.house}>HOUSE OF NOOR</Text>
            <Text style={styles.era}>The Founding Era · Day 1</Text>
          </View>
          <View style={styles.levelPill}>
            <Text style={styles.levelLabel}>LV</Text>
            <Text style={styles.levelNum}>1</Text>
          </View>
        </View>

        {/* Hero: the fortress */}
        <View style={styles.fortressWrap}>
          <FortressHero width={fortressWidth} />
          <View style={styles.bannerOverlay} pointerEvents="none">
            <View style={styles.bannerPlate}>
              <Text style={styles.bannerText}>HIGHKEEP</Text>
            </View>
          </View>
        </View>

        {/* Day stats strip */}
        <View style={styles.statsRow}>
          <Stat label="Decrees" value="0 / 0" />
          <Stat label="Streak" value="—" />
          <Stat label="Crown" value="0" />
        </View>

        {/* Districts */}
        <Text style={styles.sectionLabel}>THE FOUR DISTRICTS</Text>
        <View style={styles.grid}>
          {DISTRICT_ORDER.map((id) => (
            <DistrictCard key={id} id={id} />
          ))}
        </View>

        {/* Quick Log placeholder */}
        <Pressable style={styles.quickLog} disabled>
          <Text style={styles.quickLogText}>+ Quick Log</Text>
          <Text style={styles.quickLogSub}>Coming next: tap to log a meal, rep, page, or call.</Text>
        </Pressable>

        {/* Council placeholder */}
        <View style={styles.councilCard}>
          <Text style={styles.councilTitle}>The Council awaits</Text>
          <Text style={styles.councilBody}>
            Four advisors — Quartermaster, General, Sage, Diplomat — will gather here each morning
            once the kingdom stirs.
          </Text>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function DistrictCard({ id }: { id: DistrictId }) {
  const d = DISTRICTS[id];
  return (
    <Link href={`/district/${id}`} asChild>
      <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
        <View style={[styles.cardStripe, { backgroundColor: d.color }]} />
        <View style={styles.cardBody}>
          <Text style={styles.cardName}>{d.name}</Text>
          <Text style={styles.cardPillar}>{d.pillar.toUpperCase()}</Text>
          <View style={styles.xpRowOuter}>
            <View style={[styles.xpRowInner, { backgroundColor: d.color, width: '6%' }]} />
          </View>
          <Text style={styles.cardLevel}>Lv 1 · 0 {d.resource}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.uiBg },
  scroll: { paddingHorizontal: 16 },

  topStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  house: { color: palette.ui, fontSize: 16, fontWeight: '700', letterSpacing: 2 },
  era: { color: palette.uiDim, fontSize: 12, marginTop: 2 },
  levelPill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: palette.uiBgRaised,
    borderColor: palette.gold,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 6,
  },
  levelLabel: { color: palette.uiDim, fontSize: 11, letterSpacing: 1 },
  levelNum: { color: palette.gold, fontSize: 18, fontWeight: '700' },

  fortressWrap: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 14,
    position: 'relative',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bannerPlate: {
    backgroundColor: 'rgba(26, 20, 40, 0.55)',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: palette.gold,
  },
  bannerText: {
    color: palette.parchment,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
    textAlign: 'center',
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    marginBottom: 22,
  },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { color: palette.ui, fontSize: 18, fontWeight: '700' },
  statLabel: { color: palette.uiDim, fontSize: 11, letterSpacing: 1, marginTop: 2 },

  sectionLabel: {
    color: palette.uiDim,
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 10,
    marginLeft: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  card: {
    width: '48%',
    backgroundColor: palette.uiBgRaised,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 4,
  },
  cardPressed: { opacity: 0.7 },
  cardStripe: { width: 6 },
  cardBody: { flex: 1, padding: 12 },
  cardName: { color: palette.ui, fontSize: 16, fontWeight: '700' },
  cardPillar: { color: palette.uiDim, fontSize: 10, letterSpacing: 1.5, marginTop: 2 },
  xpRowOuter: {
    marginTop: 10,
    height: 4,
    backgroundColor: palette.uiBg,
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpRowInner: { height: 4 },
  cardLevel: { color: palette.uiDim, fontSize: 11, marginTop: 6 },

  quickLog: {
    marginTop: 22,
    backgroundColor: palette.uiBgRaised,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: palette.gold,
    borderStyle: 'dashed',
    alignItems: 'center',
    opacity: 0.7,
  },
  quickLogText: { color: palette.gold, fontSize: 16, fontWeight: '700' },
  quickLogSub: { color: palette.uiDim, fontSize: 12, marginTop: 4, textAlign: 'center' },

  councilCard: {
    marginTop: 16,
    backgroundColor: palette.uiBgRaised,
    borderRadius: 12,
    padding: 16,
  },
  councilTitle: { color: palette.ui, fontSize: 15, fontWeight: '700' },
  councilBody: { color: palette.uiDim, fontSize: 13, marginTop: 6, lineHeight: 18 },
});
