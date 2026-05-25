import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  Easing,
  ImageSourcePropType,
} from 'react-native';
import { palette } from './palette';

const HERO: ImageSourcePropType = require('../../assets/fortress-hero.png');
const ASPECT = 1536 / 1024;

type Props = { width: number };

// Particle (firefly / sparkle) drifting upward inside the fortress frame.
function Particle({
  width,
  height,
  delay,
  duration,
  startX,
  size,
  color,
}: {
  width: number;
  height: number;
  delay: number;
  duration: number;
  startX: number;
  size: number;
  color: string;
}) {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(t, {
          toValue: 1,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(t, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [t, delay, duration]);

  const translateY = t.interpolate({
    inputRange: [0, 1],
    outputRange: [height * 0.85, height * 0.15],
  });
  const translateX = t.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 8, -4],
  });
  const opacity = t.interpolate({
    inputRange: [0, 0.1, 0.85, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        left: startX,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateY }, { translateX }],
        shadowColor: color,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: size,
      }}
    />
  );
}

export function FortressHero({ width }: Props) {
  const height = width / ASPECT;

  // Gentle float of the whole fortress (very subtle).
  const float = useRef(new Animated.Value(0)).current;
  // Throne pulse (the gold star at center).
  const pulse = useRef(new Animated.Value(0)).current;
  // Sun shimmer.
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 4200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 4200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 3500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [float, pulse, shimmer]);

  const floatY = float.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });

  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.85],
  });
  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.85, 1.15],
  });

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.18, 0.42],
  });
  const shimmerScale = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.08],
  });

  // The throne (gold star) sits roughly center-right in the image.
  // Image is 1536x1024; throne is around (770, 520) in image coords.
  const throneCx = width * 0.51;
  const throneCy = height * 0.51;
  const throneR = width * 0.11;

  // Sun is in upper-left at around (140, 280).
  const sunCx = width * 0.09;
  const sunCy = height * 0.27;
  const sunR = width * 0.16;

  // Particles around the throne (3 fireflies)
  const particles = [
    { delay: 0,    duration: 5200, x: throneCx + width * 0.02, size: 4, color: '#fff5d4' },
    { delay: 1500, duration: 4400, x: throneCx - width * 0.04, size: 3, color: '#ffd47a' },
    { delay: 2800, duration: 6000, x: throneCx + width * 0.06, size: 3, color: '#fff5d4' },
  ];

  return (
    <View style={[styles.wrap, { width, height }]} pointerEvents="box-none">
      <Animated.View
        style={{
          width,
          height,
          transform: [{ translateY: floatY }],
        }}
      >
        <Image
          source={HERO}
          style={{ width, height }}
          resizeMode="cover"
          accessible
          accessibilityLabel="Highkeep — your fortress"
        />

        {/* Sun shimmer overlay */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: sunCx - sunR,
            top: sunCy - sunR,
            width: sunR * 2,
            height: sunR * 2,
            borderRadius: sunR,
            backgroundColor: palette.sun,
            opacity: shimmerOpacity,
            transform: [{ scale: shimmerScale }],
            shadowColor: palette.sun,
            shadowOpacity: 0.9,
            shadowRadius: sunR,
            shadowOffset: { width: 0, height: 0 },
          }}
        />

        {/* Throne pulse glow */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: throneCx - throneR,
            top: throneCy - throneR,
            width: throneR * 2,
            height: throneR * 2,
            borderRadius: throneR,
            backgroundColor: palette.gold,
            opacity: pulseOpacity,
            transform: [{ scale: pulseScale }],
            shadowColor: palette.gold,
            shadowOpacity: 0.9,
            shadowRadius: throneR,
            shadowOffset: { width: 0, height: 0 },
          }}
        />

        {/* Drifting particles around the throne */}
        {particles.map((p, i) => (
          <Particle
            key={i}
            width={width}
            height={height}
            delay={p.delay}
            duration={p.duration}
            startX={p.x}
            size={p.size}
            color={p.color}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    overflow: 'hidden',
    borderRadius: 18,
    backgroundColor: palette.uiBg,
  },
});
