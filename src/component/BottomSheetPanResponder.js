import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef} from 'react';
import List from './List';

const screenHeight = Dimensions.get('window').height;
const sheetMaxHeight = screenHeight - 50;
const sheetMinHeight = 80;

const MAX_Y = sheetMinHeight - sheetMaxHeight;
const MID_Y = MAX_Y;
const MIN_Y = 0;

const THRESHOLD = 60;

const BottomSheetPanResponder = () => {
  const lastRef = useRef(0);
  const sheetRef = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sheetRef.setOffset(lastRef.current);
      },
      onPanResponderMove: (_, gesture) => {
        sheetRef.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        sheetRef.flattenOffset();

        if (gesture.dy > 0) {
          //dragging down
          if (gesture.dy <= THRESHOLD) {
            lastRef.current === MAX_Y ? autoSpring(MAX_Y) : autoSpring(MID_Y);
          } else if (lastRef.current === MAX_Y) {
            autoSpring(MIN_Y);
          } else {
            autoSpring(MIN_Y);
          }
        } else {
          //dragging up
          if (gesture.dy >= -THRESHOLD) {
            lastRef.current === MIN_Y ? autoSpring(MIN_Y) : autoSpring(MID_Y);
          } else {
            lastRef.current === MIN_Y ? autoSpring(MID_Y) : autoSpring(MAX_Y);
          }
        }
      },
    }),
  ).current;

  const autoSpring = value => {
    lastRef.current = value;
    Animated.spring(sheetRef, {
      toValue: lastRef.current,
      useNativeDriver: false,
    }).start();
  };
  const animatedStyles = {
    height: sheetRef.interpolate({
      inputRange: [MAX_Y, MIN_Y],
      outputRange: [sheetMaxHeight, sheetMinHeight],
      extrapolate: 'clamp',
    }),
  };

  const buttons = [
    'Direction',
    'Submit - ImageBase',
    'Spot - Errors',
    'Direction',
    'Submit - ImageBase',
    'Spot - Errors',
  ];
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sheetContainer, animatedStyles]}>
        <View style={styles.dragbarContainer} {...panResponder.panHandlers}>
          <View style={styles.dragBar} />
        </View>
        <ScrollView>
          <View>
            <Text style={styles.heading}>Near By Temples in Benguluru</Text>
          </View>
          <View>
            <Text style={styles.heading1}>Brahmalingeshwara</Text>
            <Text style={styles.text}>Jyotirlingas Temples</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'pink',
                      padding: 10,
                      marginLeft: 15,
                      marginVertical: 15,
                      borderRadius: 10,
                    }}>
                    <Text key={index}>{button}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginLeft: 15,
                      borderRadius: 10,
                    }}>
                    <Image
                      key={index}
                      source={{
                        uri: 'https://www.oyorooms.com/blog/wp-content/uploads/2017/10/Feature-Image-min-2-1.jpg',
                      }}
                      style={{height: 100, width: 140, borderRadius: 15}}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.heading1}>Brahmalingeshwara</Text>
            <Text style={styles.text}>Jyotirlingas Temples</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'pink',
                      padding: 10,
                      marginLeft: 15,
                      marginVertical: 15,
                      borderRadius: 10,
                    }}>
                    <Text key={index}>{button}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginLeft: 15,
                      borderRadius: 10,
                    }}>
                    <Image
                      key={index}
                      source={{
                        uri: 'https://media.istockphoto.com/id/508628776/photo/sunset-over-kandariya-mahadeva-temple.jpg?s=612x612&w=0&k=20&c=YOpVZmLiY4ccl_aoWRJhfqLpNEDgjyOGuTAKbobCO-U=',
                      }}
                      style={{height: 100, width: 140, borderRadius: 15}}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.heading1}>Brahmalingeshwara</Text>
            <Text style={styles.text}>Jyotirlingas Temples</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'pink',
                      padding: 10,
                      marginLeft: 15,
                      marginVertical: 15,
                      borderRadius: 10,
                    }}>
                    <Text key={index}>{button}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {buttons.map((button, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      marginLeft: 15,
                      borderRadius: 10,
                    }}>
                    <Image
                      key={index}
                      source={{
                        uri: 'https://t4.ftcdn.net/jpg/06/18/51/69/360_F_618516907_FzSe7BdORxgNeRSbA3sxMiUfglTHWNiV.jpg',
                      }}
                      style={{height: 100, width: 140, borderRadius: 15}}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default BottomSheetPanResponder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
  },
  sheetContainer: {
    backgroundColor: '#FFFF',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    elevation: 20,
    shadowColor: '#FFFF',
  },
  dragbarContainer: {
    width: '100%',
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
    backgroundColor: '#FFFF',
  },
  dragBar: {
    width: 40,
    height: 6,
    backgroundColor: 'grey',
    borderRadius: 12,
  },
  heading: {
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    marginTop: 10,
  },
  heading1: {
    fontSize: 16,
    color: '#000',
    marginLeft: 15,
    marginTop: 20,
  },
  text: {
    fontSize: 13,
    color: 'grey',
    marginLeft: 15,
    marginTop: 4,
  },
});
