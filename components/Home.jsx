import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Modal, ScrollView , Linking} from 'react-native';
import { CheckBox } from 'react-native-elements';
// import { Video } from 'expo-av';
import * as Speech from 'expo-speech';
import Markdown from 'react-native-markdown-display';

import logo from './logo.png';
import yoga from './yoga.png';

export default function Home() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [heartRate, setHeartRate] = useState('');
    const [others, setOthers] = useState('');
    const [bloodPressure, setBloodPressure] = useState(false);
    const [diabetes, setDiabetes] = useState(false);
    const [heartPatient, setHeartPatient] = useState(false);
    const [arthritis, setArthritis] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = async () => {

        const api_key = " <-------- ADD YOUR API KEY (Here) ----------->";
        
        const userInput = `Name: ${name}, Age: ${age}, Weight: ${weight}, Height: ${height}, HeartRate ${heartRate},
            Conditions: ${bloodPressure ? 'Blood Pressure, ' : ''}${diabetes ? 'Diabetes, ' : ''}
            ${heartPatient ? 'Heart Patient, ' : ''}${arthritis ? 'Arthritis' : ''} ${others ? others : ''}`;

        const prompt = `Based on this user input: ${userInput}, suggest a yoga routine and provide a link to a relevant YouTube yoga video. Format your response in good rich markdown. and check whether the youtube link is working or not. `;
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${api_key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const aiMessage = data.candidates[0].content.parts[0].text;
            setAiResponse(aiMessage);

            const youtubeUrlMatch = aiMessage.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([^\s&]+)/);
            if (youtubeUrlMatch) {
                setVideoUrl(youtubeUrlMatch[0]);
                console.log('YouTube URL:', youtubeUrlMatch[0]);
            }

            setModalVisible(true);
        } catch (error) {
            console.error('Error calling Gemini API:', error);
            setAiResponse('Sorry, there was an error processing your request.');
            setModalVisible(true);
        }
    };

    const speakMessage = () => {
        Speech.speak(aiResponse);
    };

    const openYoutubeVideo = () => {
        if (videoUrl) {
            Linking.openURL(videoUrl);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.appHeadingContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.appHeading}>Yoga App</Text>
                <Text style={styles.appHeadingIntro}>Please fill out the form to get personalized help</Text>
            </View>

            <ScrollView style={styles.formBox}>
                <View style={styles.formOne}>
                    <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                        <TextInput style={styles.inputHalf} placeholder="Age (in Years)" value={age} onChangeText={setAge} keyboardType="numeric" />
                        <TextInput style={styles.inputHalf} placeholder="Heart Rate" value={heartRate} onChangeText={setHeartRate} keyboardType="numeric" />
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                        <TextInput style={styles.inputHalf} placeholder="Weight (in Kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
                        <TextInput style={styles.inputHalf} placeholder="Height (in cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
                    </View>
                </View>
                <View style={styles.formTwo}>
                    <View style={styles.diseaseHeading}>
                        <Text style={styles.diseaseHeadingText}>Diseases</Text>
                    </View>
                    <View style={styles.diseaseBox}>
                        <CheckBox
                            title="Blood Pressure"
                            checked={bloodPressure}
                            onPress={() => setBloodPressure(!bloodPressure)}
                            containerStyle={styles.CheckBox}
                            textStyle={{color: '#3d43f5'}}
                        />
                        <CheckBox
                            title="Diabetes"
                            checked={diabetes}
                            onPress={() => setDiabetes(!diabetes)}
                            containerStyle={styles.CheckBox}
                            textStyle={{color: '#3d43f5'}}
                        />
                        <CheckBox
                            title="Heart Patient"
                            checked={heartPatient}
                            onPress={() => setHeartPatient(!heartPatient)}
                            containerStyle={styles.CheckBox}
                            textStyle={{color: '#3d43f5'}}
                        />
                        <CheckBox
                            title="Arthritis"
                            checked={arthritis}
                            onPress={() => setArthritis(!arthritis)}
                            containerStyle={styles.CheckBox}
                            textStyle={{color: '#3d43f5'}}
                        />
                    </View>
                </View>
                <View style={styles.others}>
                    <TextInput style={styles.input} placeholder="Other Diseases" value={others} onChangeText={setOthers} />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
                <Text style={styles.submitButton}>Submit</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <ScrollView style={styles.modalContainer}>
                    <Image source={yoga} style={styles.yogaImage} />
                    <Markdown>{aiResponse}</Markdown>
                    
                    <TouchableOpacity style={styles.speakButton} onPress={speakMessage}>
                        <Text style={styles.speakButtonText}>Speak Message</Text>
                    </TouchableOpacity>

                    {videoUrl && (
                        <TouchableOpacity style={styles.videoButton} onPress={openYoutubeVideo}>
                            <Text style={styles.videoButtonText}>Watch Yoga Video on YouTube</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    appHeadingContainer: {
        width: '100%',
        paddingVertical: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 150,
        width: 150,
        marginTop: 10,
        marginBottom: 10,
    },
    appHeading: {
        color: '#3d43f5',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    appHeadingIntro: {
        marginTop: 6,
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center',
    },
    formBox: {
        width: '100%',
        marginVertical: 20,
    },
    formOne: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    input: {
        width: '90%',
        borderColor: '#3d43f5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
    },
    inputHalf: {
        width: '45%',
        borderColor: '#3d43f5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
    },
    formTwo: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    diseaseHeading:{
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        flexWrap: 'wrap',
        marginTop: 12,
        marginLeft: 10,
    },
    diseaseHeadingText:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    diseaseBox: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
        flexWrap: 'wrap',
    },
    CheckBox: {
        borderColor: '#3d43f5',
    },
    others: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: 12,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
    submitButton: {
        width: '90%',
        borderRadius: 16,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#3d43f5',
        paddingVertical: 12,
        marginTop: 10,
        marginBottom: 15,
        fontSize: 18,
        letterSpacing: 1,
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        // backgroundColor: "lightblue"
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3d43f5',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    speakButton: {
        backgroundColor: '#3d43f5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    speakButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginBottom: 20,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        backgroundColor: '#3d43f5',
        padding: 10,
        borderRadius: 5,
        marginBottom: 50,
    },
    closeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    videoButton: {
        backgroundColor: '#FF0000',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    videoButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    yogaImage: {
        display: 'flex',
        alignSelf: 'center',
        width: 200,
        height: 200,
        marginBottom: 20,
    },
});