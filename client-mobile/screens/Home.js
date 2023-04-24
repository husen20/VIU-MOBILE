import 'react-native-gesture-handler';
import CarouselHome from '../components/CarouselHome';
import BodyCard from '../components/BodyCard';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { ActivityIndicator, MD2Colors, ToggleButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { GET_GENRES, GET_MOVIES } from '../query';

const HEIGHT_FULL = Dimensions.get('window').height;

export default function Home() {
  const [value, setValue] = useState('left');

  const { loading, data } = useQuery(GET_MOVIES);
  const { loading: genresLoading, data: dataGenres } = useQuery(GET_GENRES);

  if (loading || genresLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: HEIGHT_FULL }}>
        <ActivityIndicator
          animating={loading}
          color={MD2Colors.red800}
        />
      </View>
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.body}>
        {/* Navbar */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <ToggleButton.Group
              onValueChange={(value) => setValue(value)}
              varlue={value}
            >
              <ToggleButton
                icon="format-align-left"
                value="left"
              />
            </ToggleButton.Group>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Viu_logo.svg/1280px-Viu_logo.svg.png',
              }}
            />
          </View>
        </View>
        {/* content */}
        <View style={styles.content}>
          <ScrollView style={{}}>
            <CarouselHome movies={data.movies} />
            {/* card Top 10 */}
            {dataGenres.genres.map((el) => {
              return (
                <BodyCard
                  key={el.id}
                  movies={data.movies}
                  genre={el}
                />
              );
            })}
            {/* end card */}
          </ScrollView>
        </View>
        {/* end content */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'start',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 11,
  },
  tinyLogo: {
    width: 80,
    height: 50,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
