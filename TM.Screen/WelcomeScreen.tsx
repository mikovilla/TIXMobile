import React from 'react';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';
import { styles } from '../styles';

export function WelcomeScreen( { navigation } : { navigation : any } )
{
    return (
        <View style={styles.container}>
                <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImageWelcomeAndTac}/>
                <Text style={styles.tagLine}>{"Your client-side project management integrated ticketing solution."}</Text>
                <Text>{" "}</Text>
                <Image source={require('./../assets/ticket.gif')} style={styles.splashImage}/>
                <Text>{" "}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            () => {
                                AsyncStorage.getItem('App:Basic').then(x => {
                                    if(x !== null){
                                        navigation.navigate('Home')
                                    }else{
                                        navigation.navigate('Login')
                                    };
                                });
                            }
                        }
                        title="Get Started" />
                </View>
                <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
                <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
            </View>
      );
}
