import React from 'react';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';
import { styles } from '../styles';
import * as b64 from '../Base64';

export function HomeScreen( { navigation } : { navigation : any } )
{
    const [fullName, onFullNameChange] = React.useState('');
    const [tickets, getTickets] = React.useState('');

    AsyncStorage.getItem('App:Basic').then(x => {
        if(x === null) navigation.navigate('TIX Mobile')
    });
    AsyncStorage.getItem('App:Fullname').then(x => onFullNameChange(x ?? ""));

    let activeSessions : string[] = new Array();
    activeSessions.push('App:Basic');
    activeSessions.push('App:Email');
    activeSessions.push('App:Fullname');

    const _btoa = b64.default.btoa("devs.qas@gmail.com:xweqkfsrmsINuVplyyLQ6C01");
    React.useEffect(()=>{
        async function fetchTickets(username : string, _btoa : string){
            fetch('https://mikovilla.atlassian.net/rest/api/2/search?jql=requestor~' + username, {
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Basic " + _btoa
            }
            }).then(response => response.json() ).then(data => { getTickets(JSON.stringify(data)) }).catch(error => console.log(error))
            return tickets;
        }
        AsyncStorage.getItem('App:Username').then(username => {
            fetchTickets(username ?? "", _btoa);
        });
    },[tickets])

    return (
        <View style={styles.container}>
                <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
                <Text>{"Welcome back, " + fullName + "!"}</Text>
                <Text>{"\r\n"}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            () => navigation.navigate("New Request")
                        }
                        title="Submit a new request" />
                    <Text>{" "}</Text>
                    <Button
                        onPress={
                            () => {
                                AsyncStorage.setItem('App:Issues', tickets)
                                setTimeout(function(){
                                    navigation.navigate("View Requests");
                                }, 3000);
                            }
                        }
                        title="View requests" />
                    <Text>{" "}</Text>
                    <Button
                        onPress={
                            () => navigation.navigate("Settings")
                        }
                        title="Change Password" />
                    <Text>{" "}</Text>
                    <Button
                        onPress={
                            () => {
                                AsyncStorage.multiRemove(activeSessions).finally(() =>{
                                    setTimeout(function(){
                                        navigation.navigate("TIX Mobile");
                                    }, 2000);
                                })
                            }
                        }
                        title="Logout" />
                    <Text>{" "}</Text>
                </View>
                <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
                <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
            </View>
      );
}
