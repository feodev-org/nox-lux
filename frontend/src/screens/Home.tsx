import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

export default function Home({ navigation }: { navigation: NavigationProp<any, any> }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="See About"
        onPress={() => {
          navigation.navigate('About');
        }}
      />
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
