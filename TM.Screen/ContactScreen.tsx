import React from 'react';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';

export function ContactScreen( { navigation } : { navigation : any } )
{
    const [email, onEmailChange] = React.useState('');
    const [subject, onSubjectChange] = React.useState('');
    const [message, onMessageChange] = React.useState('');
    
    AsyncStorage.getItem('App:Email').then(x => {
        if(x !== null) onEmailChange(x ?? '')
    });
    
    return (
        <View style={styles.container}>
                <Image source={require('./../assets/Singleton.png')} style={ styles.backgroundImageContact }/>
                <Text style={styles.header}>{"Contact Us"}</Text>
                <Text>{" "}</Text>
                <TextInput
                    style={styles.credentialsText}
                    onChangeText={(text) => onEmailChange(text)}
                    value = {email}
                    placeholder="Email" 
                />
                <Text>{" "}</Text>
                <TextInput
                    style={styles.credentialsText}
                    onChangeText={(text) => onSubjectChange(text)}
                    value = {subject}
                    placeholder="Subject"
                    maxLength = {64}
                />
                <Text>{" "}</Text>
                <TextInput
                    style={styles.MessageTextArea}
                    onChangeText={(text) => onMessageChange(text)}
                    value = {message}
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder="Message"
                />
                <Text>{" "}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            () => {
                                contactSupport(email, subject, message);
                                onSubjectChange('');
                                onMessageChange('');
                                alert("Our support team will be in touch with you within the next 3-5 business days.");
                            }
                        }
                        title="Send" />
                </View>
                <Text>{" "}</Text>
                <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
                <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
            </View>
      );
}

async function contactSupport(sender: string, subject: string, message: string){

    var mail ={
        "Sender" : sender,
        "Subject" : subject,
        "Message" : message
    };

    if(sender === '' || subject === '' || message === ''){
        alert("Some fields are missing. Please make sure that all fields are properly filled in.")
        return;
    }

    if(!validateEmail(sender)){
        alert("The email address format is incorrect.");
        return;
    }

    const response = await fetch("https://tip.mikovilla.com/tix/api/User/Support", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(mail)
        });
}

function validateEmail(emailAddress : string){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
  }
