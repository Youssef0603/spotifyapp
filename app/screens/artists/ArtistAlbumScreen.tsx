import React, { useEffect, useState } from 'react';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { FlatGrid } from 'react-native-super-grid';
import ArrowBackSVG from '../../assets/svg/ArrowBackSVG.svg';
import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { RepositoryFactory } from '../../repository/RepositoryFactory';

const artistsRepository = RepositoryFactory.get('artists');

const ArtistAlbumScreen = (props: any) => {
  const { data } = props.route.params;
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    getArtistAlbums();
  }, []);

  const getArtistAlbums = () => {
    artistsRepository
      .getArtistAlbums(data.id)
      .then((response: any) => {
        setAlbums(response.data.items);
        setLoading(false); // Hide loader after fetching data
      })
      .catch((e: object) => {
        console.error('Error while fetching artist albums', e);
        setLoading(false); // Hide loader even if there's an error
      });
  };

  const renderAlbum = ({ item }: any) => (
    <View style={styles.albumContainer}>
      <TouchableOpacity onPress={() => Linking.openURL(item.external_urls.spotify)}>
        <Image source={{ uri: item.images[0]?.url }} style={styles.albumImage} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.albumName}>{item.name}</Text>
        <Text style={styles.artistName}>{data.name}</Text>
        <Text style={styles.releaseDate}>{item.release_date}</Text>
        <Text style={styles.trackCount}>{item.total_tracks} tracks</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ paddingHorizontal: 12 }} onPress={() => props.navigation.goBack()}>
        <ArrowBackSVG height={25} width={25} />
      </TouchableOpacity>
      <View style={{ paddingHorizontal: 25, paddingVertical: 12 }}>
        <Text style={{ fontSize: 22, fontFamily: Fonts.bold, color: Colors.white }}>{data.name}</Text>
        <Text style={{ fontSize: 15, fontFamily: Fonts.regular, color: Colors.gray }}>Albums</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
      ) : (
        <FlatGrid
          data={albums}
          renderItem={renderAlbum}
          spacing={10}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    backgroundColor: Colors.black,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumContainer: {
    alignItems: 'center',
  },
  albumImage: {
    height: 130,
    width: 130,
    borderRadius: 8,
  },
  textContainer: {
    maxWidth: 130,
    paddingTop: 8,
  },
  albumName: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: Fonts.medium,
    textAlign: 'left',
  },
  artistName: {
    color: Colors.gray,
    fontFamily: Fonts.medium,
    fontSize: 12,
  },
  releaseDate: {
    color: Colors.gray,
    fontFamily: Fonts.medium,
    fontSize: 12,
  },
  trackCount: {
    color: Colors.gray,
    fontFamily: Fonts.medium,
    fontSize: 12,
  },
});

export default ArtistAlbumScreen;
