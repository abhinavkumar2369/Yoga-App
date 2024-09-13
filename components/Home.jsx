import React from 'react';

import logo from './logo.png';
import { View, Text, StyleSheet, TextInput, TouchableOpacity , Image } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default function Home() {
    return (
        <View style={styles.container}>

            {/* App Heading */}
            <View style={styles.appHeadingContainer}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.appHeading}>Yoga App</Text>
                <Text style={styles.appHeadingIntro}>Please fill out the form to get personalized effect.</Text>
            </View>

            {/* Form */}
            <View style={styles.formBox}>
                <View style={styles.formOne}>
                    <TextInput style={styles.input} placeholder="Name" />
                    <TextInput style={styles.input} placeholder="Age" />
                    <TextInput style={styles.input} placeholder="Weight" />
                    <TextInput style={styles.input} placeholder="Height" />
                </View>
                <View style={styles.formTwo}>
                    <View style={styles.diseaseBox}>
                    <CheckBox
                        title="Blood Pressure"
                        checked={true}
                        containerStyle={styles.CheckBox}
                        textStyle={{color: '#3d43f5'}}
                    />
                    <CheckBox
                        title="Diabeties"
                        checked={true}
                        containerStyle={styles.CheckBox}
                        textStyle={{color: '#3d43f5'}}
                    />
                    <CheckBox
                        title="Heart Patient"
                        checked={true}
                        containerStyle={styles.CheckBox}
                        textStyle={{color: '#3d43f5'}}
                    />
                    <CheckBox
                        title="Arthritis"
                        checked={true}
                        containerStyle={styles.CheckBox}
                        textStyle={{color: '#3d43f5'}}
                    />
                    </View>
                </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.submitButton}>Submit</Text>
                </TouchableOpacity>
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
        // backgroundColor: '#33007d',
        // borderRadius: 10,
    },
    logo:{
        height: 60,
        width: 60,
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
        // color: '#3d43f5',
        fontSize: 14,
        textAlign: 'center',
    },


    formBox: {
        width: '100%',
        marginVertical: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // gap: 20,
    },
    formOne: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    input:{
        width: '90%',
        borderColor: '#3d43f5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
    },
    formTwo:{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    diseaseBox: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        flexWrap: 'wrap',
        marginTop: 20,
    },

    CheckBox: {
        borderColor: '#3d43f5',
    },


    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    submitButton :{
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
    }
});