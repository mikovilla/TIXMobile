import React from 'react';
import { Text, View, Button, Image, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as b64 from '../Base64';
import { styles } from '../styles';

export function NewRequestScreen ( { navigation } : { navigation : any } )
{
    const [summary, onSummaryChange] = React.useState('');
    const [description, onDescriptionChange] = React.useState('');

    AsyncStorage.getItem('App:Basic').then(x => {
        if(x === null) navigation.navigate('TIX Mobile')
    });

    return (
        <View style={styles.container}>
                <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
                <Text style={styles.header}>{"NEW REQUEST"}</Text>
                <Text>{" "}</Text>
                <TextInput
                    style={styles.credentialsText}
                    onChangeText={(text) => onSummaryChange(text)}
                    value = {summary}
                    placeholder="Summary" 
                />
                <Text>{" "}</Text>
                <TextInput
                    style={styles.messageTextArea}
                    multiline = {true}
                    numberOfLines = {10}
                    onChangeText={(text) => onDescriptionChange(text)}
                    value = {description}
                    placeholder="Description" 
                />
                <Text>{" "}</Text>
                <View style={styles.formButton}>
                    <Button
                        onPress={
                            () => {
                                submitNewAtlassianTicket(summary, description);
                                onSummaryChange('');
                                onDescriptionChange('');
                            }
                        }
                        title="Submit" />
                </View>
                <Text>{" "}</Text>
                <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
                <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
            </View>
      );
}

function submitNewAtlassianTicket(summary : string, description : string){
    const _btoa : string = b64.default.btoa("devs.qas@gmail.com" + ":" + "xweqkfsrmsINuVplyyLQ6C01");
    
    if(summary === '' || description === ''){
        alert("Some fields are missing. Please make sure that all fields are properly filled in.");
        return;
    }

    AsyncStorage.getItem('App:Username').then(username => {
       
        var payload = {
            "fields": {
                "project" : {
                    "key" : "TIPTEST"
                },
                "summary" : summary,
                "description" : description,
                "customfield_10029" : username,
                "issuetype" : {
                    "name" : "Story"
                }
            }
        }
        fetch("https://mikovilla.atlassian.net/rest/api/2/issue", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Basic " + _btoa
            },
            body: JSON.stringify(payload)
        }).then(response => response.json()).then(
            data => {
                alert("[" + data.key + "] Ticket has been created successfully.")
            }
        );
        
    });
}

