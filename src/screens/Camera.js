import React, { Fragment, useState } from 'react';
import * as ImagePicker from 'react-native-image-picker'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

const Camera = () => {
    const [uri, setUri] = useState('')

    const launchCamera = () => {
        let options = {
            title: 'Take Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5
        };
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                console.log('response', JSON.stringify(response));
                setUri(response.assets[0].base64)
            }
        });
    }

    const launchImageLibrary = () => {
        let options = {
            title: 'Select Picture',
            storageOptions: {
                skipBackup: true,
                path: 'images',

            },
            includeBase64: true,
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.5
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                console.log('response', JSON.stringify(response));
                setUri(response.assets[0].base64)
                //const formdata = new FormData()
                // formdata.append('file', {
                //     uri: response.assets[0].uri,
                //     type: response.assets[0].type,
                //     name: response.assets[0].fileName
                // })
                // console.log(formdata._parts[0])
            }
        });

    }

    function renderFileUri() {
        if (uri) {
            return <Image
                source={{ uri: 'data:image/jpeg;base64,' + uri }}
                style={styles.images}
            />
        } else {
            return <Image source={{ uri: 'https://pbs.twimg.com/profile_images/486929358120964097/gNLINY67_400x400.png' }}
                style={styles.images}
            />
        }
    }

    return (
        <Fragment>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.body}>
                    <Text style={{ textAlign: 'center', fontSize: 20, paddingBottom: 10 }} >Pick Images from Camera & Gallery</Text>
                    <View style={styles.ImageSections}>
                        <View>
                            {renderFileUri()}
                            <Text style={{ textAlign: 'center' }}>File Uri</Text>
                        </View>
                    </View>

                    <View style={styles.btnParentSection}>

                        <TouchableOpacity onPress={launchCamera} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Directly Launch Camera</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={launchImageLibrary} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Directly Launch Image Library</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </Fragment>
    )
}

export default Camera

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white',
    },

    body: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        height: Dimensions.get('screen').height - 20,
        width: Dimensions.get('screen').width
    },
    ImageSections: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 8,
        justifyContent: 'center'
    },
    images: {
        width: 150,
        height: 150,
        borderColor: 'black',
        borderWidth: 1,
        marginHorizontal: 3
    },
    btnParentSection: {
        alignItems: 'center',
        marginTop: 10
    },
    btnSection: {
        width: 225,
        height: 50,
        backgroundColor: '#DCDCDC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        marginBottom: 10
    },
    btnText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 14,
        fontWeight: 'bold'
    }
});