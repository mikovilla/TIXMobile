import React from 'react';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';

export function SettingsScreen( { navigation } : { navigation : any } )
{
    const [oldPassword, onOldPasswordChange] = React.useState('');
    const [confirmPassword, onConfirmPasswordChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');

    AsyncStorage.getItem('App:Basic').then(x => {
        if(x === null) navigation.navigate('TIX Mobile')
    });

    return (
        <View style={styles.container}>
                <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
                <Text>{"\r\n"}</Text>
                <TextInput
                    style={styles.credentialsText}
                    secureTextEntry={true}
                    onChangeText={(text) => onOldPasswordChange(text)}
                    value = {oldPassword}
                    placeholder="Old Password" 
                />
                <Text>{" "}</Text>
                <TextInput
                    style={styles.credentialsText}
                    secureTextEntry={true}
                    onChangeText={(text) => onPasswordChange(text)}
                    value = {password}
                    placeholder="New Password" 
                />
                <Text>{" "}</Text>
                <TextInput
                    style={styles.credentialsText}
                    secureTextEntry={true}
                    onChangeText={(text) => onConfirmPasswordChange(text)}
                    value = {confirmPassword}
                    placeholder="Confirm Password" 
                />
                <Text>{" "}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            //() => navigation.navigate("Login")
                            () => {
                                changePassword(oldPassword, password, confirmPassword, navigation);
                            }
                        }
                        title="Change Password" />
                </View>
                <Text>{" "}</Text>
            </View>
      );
}

async function changePassword(oldPassword : string, newPassword: string, confirmPassword : string, navigation : any){
    
    if(oldPassword === '' || newPassword === '' || confirmPassword === ''){
        alert("Some fields are missing. Please make sure that all fields are properly filled in.");
        return;
    }

    if(newPassword !== confirmPassword){
        alert("The new password and the confirm password should match.");
        return;
    }

    await AsyncStorage.getItem('App:Basic').then(auth => {
        if(auth !== null){
            AsyncStorage.getItem('App:Username').then(username => {
                if(username != null){
                    const response = fetch("https://tip.mikovilla.com/tix/api/User/Modify", {
                        method: "POST",
                        headers:{
                            "Content-Type" : "application/json",
                            "Authorization" : "Basic " + auth
                        },
                        body: JSON.stringify({
                            "Username" : username,
                            "FirstName" : oldPassword,
                            "Password" : confirmPassword
                        })
                    }).then(response => response.json())
                    .then(data => 
                        {
                            if(data.ExceptionType === 'System.Exception'){
                                alert("The old password is incorrect.")
                            }
                        }
                    ).catch(error => {
                        if(error.message === 'JSON Parse error: Unexpected EOF'){
                            let activeSessions : string[] = new Array();
                            activeSessions.push('App:Basic');
                            activeSessions.push('App:Email');
                            activeSessions.push('App:Fullname');
                            AsyncStorage.multiRemove(activeSessions);
                            alert("Your password has been changed.\r\nYou will be logged out from the system.")
                            navigation.navigate("TIX Mobile");
                        }
                    });
                }
            })
        }
    })
}