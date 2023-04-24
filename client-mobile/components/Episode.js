import { useCallback, useRef, useState } from 'react';
import { Text, StyleSheet, Button, View, Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function Episode({ movie }) {
  console.log(movie.detailMovie.trailerUrl);
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={styles.body}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={movie.detailMovie.trailerUrl}
        onChangeState={onStateChange}
      />
      <Button
        title={playing ? 'pause' : 'play'}
        onPress={togglePlaying}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: 330,
    height: 100,
    marginTop: 20,
  },
});
