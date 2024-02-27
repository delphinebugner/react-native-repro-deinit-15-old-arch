import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { ComponentWithToggle } from './ComponentWithToggle';

const RootStack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name={'Screen1'} component={Screen1} />
      <RootStack.Screen name={'Screen2'} component={Screen2} />
    </RootStack.Navigator>
  );
};

const Screen1 = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        title={'Navigate to screen 2'}
        // @ts-ignore
        onPress={() => navigate('Screen2')}
      />
      <ComponentWithToggle color="#48C7AA" />
    </View>
  );
};

const Screen2 = () => {
  return (
    <View style={styles.container}>
      <ComponentWithToggle color="#48C7FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
