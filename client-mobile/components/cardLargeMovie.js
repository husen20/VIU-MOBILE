import { StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function CardLargeMovie({ movie }) {
  const navigation = useNavigation();
  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate('Detail', { id: movie.id });
      }}
    >
      <Image
        style={styles.cardImage}
        source={{ uri: movie.imgUrl }}
      />
      <Card.Title
        title={movie.title}
        titleStyle={{ color: 'white' }}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  //card
  card: {
    width: 200,
    backgroundColor: '#141414',
    resizeMode: 'cover',
    borderRadius: 0,
    marginLeft: 10,
  },
  cardImage: {
    borderRadius: 0,
    width: '100%',
    height: 111,
    resizeMode: 'contain',
  },
});
