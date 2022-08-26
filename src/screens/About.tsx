import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export default function About({ navigation }: { navigation: NavigationProp<any, any> }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="info" onPress={() => alert("You've press here")} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
