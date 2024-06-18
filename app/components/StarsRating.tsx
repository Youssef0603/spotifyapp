import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const StarsRating = ({popularity}) => {
  // Convert popularity (0-100) to a star rating (0-5)
  const rating = Math.round((popularity / 100) * 5);

  // Create an array with 5 elements to represent the stars
  const stars = Array(5).fill(0);

  return (
    <View style={styles.starContainer}>
      {stars.map((_, index) => (
        <Icon
          key={index}
          name={index < rating ? 'star' : 'star-outline'}
          size={12}
          color={Colors.white}
          style={styles.star}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: 1,
  },
});

export default StarsRating;
