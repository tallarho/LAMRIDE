import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles/RatingBlock.styles";

type Achievement = {
  id: string;
  title: string;
  condition: boolean;
};

type RatingProps = {
  level: string;
  points: number;
  achievements: Achievement[];
};

export default function RatingBlock({ level, points, achievements }: RatingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.levelText}>Уровень {level}</Text>
      <Text style={styles.pointsText}>🏅 Очки: {points}</Text>

      <View style={styles.divider} />

      <Text style={styles.achievementsTitle}>Достижения</Text>
      {achievements.length === 0 && (
        <Text style={styles.noAchievements}>Пока нет достижений</Text>
      )}
      {achievements.map(
        (ach) =>
          ach.condition && (
            <View key={ach.id} style={styles.achievementItem}>
              <Text style={styles.achievementBullet}>•</Text>
              <Text style={styles.achievementText}>{ach.title}</Text>
            </View>
          )
      )}
    </View>
  );
}
