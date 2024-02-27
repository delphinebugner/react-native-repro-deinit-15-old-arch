import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { ReproDeinit15OldArchView } from 'react-native-repro-deinit-15-old-arch';

export const ComponentWithToggle = ({ color }: { color: string }) => {
  const [isVisible, setVisible] = React.useState(true);
  return (
    <>
      <Button
        title={isVisible ? 'Destroy Component' : 'Mount component'}
        onPress={() => setVisible(!isVisible)}
      />
      {isVisible && (
        <ReproDeinit15OldArchView color={color} style={styles.box} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
