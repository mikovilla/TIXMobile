import React from 'react';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as b64 from '../Base64';
import { styles } from '../styles';

export function LoginScreen( { navigation } : { navigation : any } )
{
    const [username, onUsernameChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');

    AsyncStorage.getItem('App:Basic').then(x => {
        if(x !== null)navigation.navigate('Home');
    });

    return (
        <View style={styles.container}>
                <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
                <TextInput
                    style={styles.credentialsText}
                    onChangeText={(text) => onUsernameChange(text)}
                    value = {username}
                    placeholder="Username" 
                />
                <Text>{" "}</Text>
                <TextInput
                    style={styles.credentialsText}
                    secureTextEntry={true}
                    onChangeText={(text) => onPasswordChange(text)}
                    value = {password}
                    placeholder="Password" 
                />
                <Text>{" "}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            //() => navigation.navigate("Login")
                            () => {
                                ValidateLogin(username, password, navigation);
                            }
                        }
                        title="Login" />
                </View>
                <Text>{" "}</Text>
                <View style={styles.spanWithLink}>
                    <Text>Not yet a member? Click
                        <Text
                            style={styles.linkButton}
                            onPress={() => navigation.navigate("Register")}
                        > here</Text>.
                    </Text>
                </View>
            </View>
      );
}

async function ValidateLogin(username: string, password : string, navigation : any){
    if(username === '' || password === ''){
        alert("The username and password fields should be filled in with values.");
        return;
    }
    else{
        const _btoa : string = b64.default.btoa(username + ":" + password);
        var validateUsernameAndPassword = await fetch("https://tip.mikovilla.com/tix/api/User", {
            method: "GET",
            headers:{
                "Authorization" : "Basic " + _btoa
            }
        }).then(response => response.json()).then(data => { return data; });
        if(validateUsernameAndPassword === 'Authorization has been denied for this request.'){
            alert("Incorrect username and password.");
        }else{
            var checkLock = await fetch("https://tip.mikovilla.com/tix/api/User/Lock?username=" + username + "").then(response => response.json()).then(data => { return data; });
            if(checkLock.IsValidated){
                alert(checkLock.Message);
            }
            else{
                alert("Login successful");
                await AsyncStorage.setItem('App:Fullname', validateUsernameAndPassword.FirstName + " " + validateUsernameAndPassword.LastName);
                await AsyncStorage.setItem('App:Username', validateUsernameAndPassword.Username);
                await AsyncStorage.setItem('App:Email', validateUsernameAndPassword.Email);
                await AsyncStorage.setItem('App:Basic', _btoa);
                navigation.navigate("Home");
            }
        }
    }
    
}
