import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CardLargeMovie from './cardLargeMovie';

export default function BodyCard({ movies, genre }) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: 'white', marginLeft: 10, marginBottom: 20, fontSize: 18, color: 'grey', marginTop: 10 }}>{genre ? genre.name : ''}</Text>
      <ScrollView
        style={{ flex: 1, flexDirection: 'row' }}
        horizontal={true}
      >
        {movies.map((el) => {
          return (
            <CardLargeMovie
              movie={el}
              key={el.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
