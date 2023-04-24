import { useQuery } from '@apollo/client';
import { Text, StyleSheet, View } from 'react-native';
import { GET_MOVIES } from '../query';
import BodyCard from './BodyCard';

export default function Similar() {
  const { loading, data } = useQuery(GET_MOVIES);

  if (loading) return <Text>Loading ...</Text>;

  return (
    <View style={styles.body}>
      <BodyCard movies={data.movies} />
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginTop: 3,
  },
  body: {
    height: 200,
  },
});
