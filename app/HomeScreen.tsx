import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Fonts from './constants/Fonts';
import Colors from './constants/Colors';
import SearchSVG from './assets/svg/SearchSVG.svg';
import {FlatGrid} from 'react-native-super-grid';
import StarsRating from './components/StarsRating';
import {RepositoryFactory} from './repository/RepositoryFactory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userRepository = RepositoryFactory.get('user');
const artistsRepository = RepositoryFactory.get('artists');

const HomeScreen = (props: any) => {
  const [userData, setUserData] = useState({display_name: '', images: []});
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUserProfile();
    getTopArtists();
  }, []);

  const getUserProfile = () => {
    userRepository
      .getProfile()
      .then((response: any) => {
        setUserData(response.data);
      })
      .catch((e: object) => {
        console.error('Error while fetching user profile', e);
      });
  };

  const getTopArtists = () => {
    const artistIds =
      '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6';
    artistsRepository
      .getArtists(artistIds)
      .then((response: any) => {
        setArtists(response.data.artists);
      })
      .catch((e: object) => {
        console.error('Error while fetching artists', e);
      });
  };

  const searchArtists = (query: string) => {
    artistsRepository
      .searchArtists(query)
      .then((response: any) => {
        setArtists(response.data.artists.items);
      })
      .catch((e: object) => {
        console.error('Error while searching for artists', e);
      })
      .finally(() => {
      });
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    if (text) {
      searchArtists(text);
    } else {
      getTopArtists();
    }
  };

  const handleArtistPress = (data: object) => {
    props.navigation.navigate('ArtistAlbumScreen', {data});
  };

  const renderArtistCard = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{alignSelf: 'center', paddingVertical: 6}}
        onPress={() => handleArtistPress(item)}>
        <Image source={{uri: item.images[0]?.url}} style={styles.artistImage} />
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>{item.name}</Text>
          <Text style={styles.artistType}>
            {item.followers.total} followers
          </Text>
        </View>
        <StarsRating popularity={item.popularity} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        {userData.images.length > 0 && (
          <Image
            style={styles.userImage}
            source={{uri: userData.images[0].url}}
          />
        )}
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>{userData.display_name}</Text>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <SearchSVG height={20} width={20} />
        <TextInput
          placeholder="Search for an artist.."
          placeholderTextColor={Colors.primary_text}
          style={styles.input}
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      <View style={{paddingTop: 6, paddingBottom: 200}}>
        <Text style={styles.artistsTitle}>Artists you may like</Text>
        <FlatGrid
          itemDimension={130}
          data={artists}
          spacing={10}
          renderItem={renderArtistCard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 18,
    paddingHorizontal: 18,
    backgroundColor: Colors.black,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  userNameContainer: {
    paddingHorizontal: 12,
  },
  userName: {
    fontSize: 20,
    color: Colors.white,
    fontFamily: Fonts.bold,
    textAlign: 'left',
  },
  searchContainer: {
    backgroundColor: Colors.white,
    borderRadius: 100,
    height: 50,
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: Colors.black,
    fontFamily: Fonts.medium,
    paddingLeft: 12,
  },
  artistsTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.bold,
    marginBottom: 10,
  },
  artistImage: {
    height: 125,
    width: 125,
    borderRadius: 999,
  },
  artistInfo: {
    paddingVertical: 6,
  },
  artistName: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: Fonts.medium,
  },
  artistType: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Fonts.medium,
  },
});

export default HomeScreen;
