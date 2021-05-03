import React from 'react';
import { Text, View, Button, Image, ScrollView, AsyncStorage } from 'react-native';
import tac from '../tac.json';
import Highlighter from 'react-native-highlight-words';
import { styles } from '../styles';

export function TacScreen( { navigation } : { navigation : any } )
{
    AsyncStorage.getItem('App:Basic').then(x => {
        if(x !== null)navigation.navigate('Home');
    });

    return (
        <View style={styles.container}>
                <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImageWelcomeAndTac}/>
                <Text style={styles.tagLine}>{"Your client-side project management integrated ticketing solution."}</Text>
                <Text>{" "}</Text>
                <Text style={styles.header}>{"TERMS AND CONDITIONS"}</Text>
                <Text>{" "}</Text>
                <ScrollView style={styles.tacScrollView} persistentScrollbar={ true }>
                    <Highlighter
                        highlightStyle={{fontWeight: 'bold', fontSize: 14}}
                        autoEscape = {true}
                        searchWords={['[Introduction]', '[Intellectual Property Rights]', '[Restrictions]', '[Content]', '[No warranties]', '[Limitation of liability]', '[Indemnification]', '[Severability]', '[Variation of Terms]', '[Assignment]', '[Entire Agreement]', '[Governing Law & Jurisdiction']}
                        textToHighlight={tac.message}
                    />
                </ScrollView>
                <Text>{" "}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            () => navigation.navigate("Register")
                        }
                        title="Go Back" />
                </View>
                <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
                <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
                <Text>{" "}</Text>
                <Text>{" "}</Text>
            </View>
      );
}


