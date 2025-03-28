import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraComponent = () => {
    // State for the camera ref and captured image
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);

    // Request camera permissions on mount
    useEffect(() => {
        (async () => {
            const { status } = await RNCamera.requestPermissions();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // Function to take a picture
    const takePicture = async () => {
        console.log('takePicture function called'); // First log to confirm function entry
        if (!camera) {
            console.log('Camera ref is null');
            return;
        }
        try {
            const options = { quality: 0.5, base64: true };
            const data = await camera.takePictureAsync(options);
            console.log('Picture taken at:', data.uri);
            setImage(data.uri); // Store the image URI to display it
        } catch (error) {
            console.error('Error taking picture:', error);
        }
    };

    // Handle permission states
    if (hasPermission === null) {
        return <View><Text>Requesting camera permission...</Text></View>;
    }
    if (hasPermission === false) {
        return <View><Text>No access to camera</Text></View>;
    }

    // Main render
    return (
        <View style={styles.container}>
            {image ? (
                // Display the captured image
                <View style={styles.resultContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TouchableOpacity
                        onPress={() => setImage(null)} // Reset to take another picture
                        style={styles.retakeButton}
                    >
                        <Text style={styles.buttonText}>Retake Picture</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                // Display the camera preview with a capture button
                <RNCamera
                    ref={(ref) => setCamera(ref)}
                    style={styles.camera}
                    type={RNCamera.Constants.Type.back}
                    captureAudio={false}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Button pressed'); // Log to confirm button click
                                takePicture();
                            }}
                            style={styles.captureButton}
                        >
                            <Text style={styles.buttonText}>Take Picture</Text>
                        </TouchableOpacity>
                    </View>
                </RNCamera>
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    captureButton: {
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 16,
        marginBottom: 40,
    },
    resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    image: { width: '100%', height: '80%' },
    retakeButton: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
    },
    buttonText: { fontSize: 18, color: '#447055' },
});

export default CameraComponent;