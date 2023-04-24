import { Text, View, StyleSheet, Image } from 'react-native';
export default function DetailMovie({ movie }) {
  return (
    <>
      <View style={styles.body}>
        <View style={styles.bodyDetail}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Title:</Text>
            <Text style={styles.text}>{movie.detailMovie.title}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Author:</Text>
            <Text style={styles.text}>{movie.detailMovie.Author.email}</Text>
          </View>
        </View>
        <View style={styles.bodyDetail}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Rating:</Text>
            <Text style={styles.text}>{movie.detailMovie.rating}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Genre:</Text>
            <Text style={styles.text}>{movie.detailMovie.Genre.name}</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 250, marginTop: 15 }}>
        <Text style={styles.title}>Casts :</Text>
        <View style={{ flex: 1, flexDirection: 'row', gap: 10, marginTop: 10 }}>
          {movie.detailMovie.Casts.map((el) => {
            return (
              <Image
                source={{
                  uri: el.profilePict,
                }}
                style={styles.imageCasts}
                key={el.id}
              />
            );
          })}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageCasts: {
    width: 100,
    height: 150,
  },
  bodyDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    color: 'grey',
  },
  text: {
    color: 'white',
    marginTop: 3,
  },
  body: {
    width: 330,
    height: 125,
    paddingTop: 5,
    marginTop: 20,
    borderTopColor: 'grey',
    borderTopWidth: 1,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
});
