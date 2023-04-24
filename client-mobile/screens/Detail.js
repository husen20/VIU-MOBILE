import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import DetailMovie from '../components/DetailMovie';
import Episode from '../components/Episode';
import Similar from '../components/Similar';
import { GET_MOVIES_DETAIL } from '../query';

const SLIDER_WIDTH = Dimensions.get('window').width;
const HEIGHT_FULL = Dimensions.get('window').height;

export default function Detail({ route }) {
  const { id: detailMovieId } = route.params;

  const [pages, setPage] = useState({
    page: 'Detail',
  });

  const { loading, data } = useQuery(GET_MOVIES_DETAIL, { variables: { detailMovieId } });

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: HEIGHT_FULL }}>
        <ActivityIndicator
          animating={loading}
          color={MD2Colors.red800}
        />
      </View>
    );

  return (
    <ScrollView style={styles.body}>
      <View style={styles.header}>
        <Image
          style={{ width: SLIDER_WIDTH, height: 200 }}
          source={{ uri: data.detailMovie.imgUrl }}
        />
        <Text style={{ color: 'yellow', fontSize: 30, marginTop: 15 }}>{data.detailMovie.title}</Text>
        <View style={{ width: 315, marginTop: 20 }}>
          <Text style={{ color: 'white', flexWrap: 'wrap' }}>{data.detailMovie.synopsis}</Text>
        </View>
        <View style={styles.judul}>
          <Text
            style={pages.page === 'Detail' ? { color: 'yellow', fontSize: 20 } : { color: 'white', fontSize: 20 }}
            onPress={() => {
              const changePage = {
                page: 'Detail',
              };
              setPage(changePage);
            }}
          >
            DETAIL
          </Text>
          <Text
            style={pages.page === 'Episode' ? { color: 'yellow', fontSize: 20 } : { color: 'white', fontSize: 20 }}
            onPress={() => {
              const changePage = {
                page: 'Episode',
              };
              setPage(changePage);
            }}
          >
            EPISODE
          </Text>
          <Text
            style={pages.page === 'Similar' ? { color: 'yellow', fontSize: 20 } : { color: 'white', fontSize: 20 }}
            onPress={() => {
              const changePage = {
                page: 'Similar',
              };
              setPage(changePage);
            }}
          >
            SIMILAR
          </Text>
        </View>
        <View>
          {pages.page === 'Detail' ? <DetailMovie movie={data} /> : <></>}
          {pages.page === 'Episode' ? <Episode movie={data} /> : <></>}
          {pages.page === 'Similar' ? <Similar movie={data} /> : <></>}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  judul: {
    flex: 1,
    flexDirection: 'row',
    gap: 28,
    marginTop: 20,
  },
});
