import { Dimensions, View, StyleSheet, Image } from 'react-native';
import data from '../data';
import Carousel from 'react-native-reanimated-carousel';

const SLIDER_WIDTH = Dimensions.get('window').width;

export default function CarouselHome({ movies }) {
  const CarouselCardItem = ({ item, index }) => {
    return (
      <View
        style={styles.container}
        key={index}
      >
        <Image
          source={{ uri: item.imgUrl }}
          style={styles.image}
        />
      </View>
    );
  };

  return (
    <Carousel
      loop
      width={SLIDER_WIDTH}
      height={250}
      autoPlay={true}
      data={movies}
      scrollAnimationDuration={3000}
      autoPlayInterval={10000}
      renderItem={CarouselCardItem}
    />
  );
}

const styles = StyleSheet.create({
  // carousel
  container: {
    width: '100%',
    height: 250,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    backgroundColor: 'yellow',
  },
  bodyCarousel: {
    color: '#222',
  },
});
