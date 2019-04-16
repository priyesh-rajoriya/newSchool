import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
  Platform
} from 'react-native';

import ImagePicker from 'react-native-image-picker';

import futch from './api'

export default class RNImagePicker extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null,
    progress: 0,
  };

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;

        // You can display the image using either:
        //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        //Or:
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }
        const data = new FormData();
        const photos = []
        data.append('userId', '1');
        data.append('driverName', 'Priyesh')
        photos.forEach((photo, index) => {
            data.append('rc', {
              uri: photo.uri,
              type: 'image/jpeg/png'.toString(),
              name: 'image'+index
            });
          });
        const url = 'http://shieldcrypt.com:8091/svm-web/userDetails' // genymotion's localhost is 10.0.3.2
        futch(url , {
          method: 'POST',
          body: data
        }, (e) => {
          const progress = e.loaded / e.total;
          console.log(progress);
          this.setState({
            progress: progress
          });
        }).then((res) => console.log(res), (e) => console.log(e))

        this.setState({
          avatarSource: source
        });
      }
    });
  }

 

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.progress}</Text>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150
  }
});