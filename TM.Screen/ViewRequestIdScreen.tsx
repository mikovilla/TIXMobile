import React from 'react';
import { Text, View, Image, AsyncStorage, FlatList, ScrollView, TextInput, Button } from 'react-native';
import { styles } from '../styles';
import * as b64 from '../Base64';

export function ViewRequestIdScreen ( { navigation } : { navigation : any } )
{
    const [issue, getIssue] = React.useState('');
    const [comment, onCommentChange] = React.useState('');

    AsyncStorage.getItem('App:Basic').then(x => {
        if(x === null) navigation.navigate('TIX Mobile')
    });

    const _btoa = b64.default.btoa("devs.qas@gmail.com:xweqkfsrmsINuVplyyLQ6C01");
    React.useEffect(()=>{
        AsyncStorage.getItem('App:IssueKey').then(appIssueKey => {
            fetch('https://mikovilla.atlassian.net/rest/api/2/issue/' + appIssueKey, {
            method: "GET",
            headers:{
                "Content-Type" : "application/json",
                "Authorization" : "Basic " + _btoa
            }
            }).then(response => response.json() ).then(data => { 
                setTimeout(()=>{
                    getIssue(JSON.stringify(data)) 
                }, 3000)                
            }).catch(error => console.log(error))
        });
    },[])

    return (
        <View style={styles.container}>
            <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
            <View style={styles.subContainer}>
            <Text style={styles.header}>{issue && (JSON.parse(issue).key + ": " + JSON.parse(issue).fields.summary)}</Text>
            <Text>{issue &&  JSON.parse(issue).fields.description}</Text><Text>{" "}</Text>
                <Text>{"[New Message]\r\n"}</Text>
                <TextInput
                    style={styles.CommentTextArea}
                    onChangeText={(text) => onCommentChange(text)}
                    value = {comment}
                    multiline = {true}
                    numberOfLines = {10}
                    placeholder="Message"
                /><Text>{" "}</Text>
                <View style={styles.formCommentButton}>
                    <Button
                        onPress={
                            //() => navigation.navigate("Login")
                            () => {
                                writeComment(JSON.parse(issue).key, _btoa, comment);
                                onCommentChange('');
                                alert('Your message has been submitted.')
                            }
                        }
                        title="SEND" />
                </View>
                <Text>{" "}</Text>
                <Text>{"[Message]\r\n"}</Text>
                <FlatList
                    style={{ flexGrow: 0, height: 120 }}
                    data={issue && JSON.parse(issue).fields.comment.comments}
                    ListEmptyComponent = {renderNoStateMessage()}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <ScrollView style={styles.requestIdScrollView} persistentScrollbar = { true }>
                            <View>
                                {/*// @ts-ignore */}
                                <Text>{(item.updateAuthor.displayName === 'Tix Automation' ? 'Me' : item.updateAuthor.displayName) + " [ " + timeSplit(item.created)  + " ]: \r\n" + item.body + "\r\n"}</Text>
                            </View>
                        </ScrollView>
                    )}
                />
            </View>
            <View style={styles.subContainerTwo}>
                <Text>{"\r\n"}</Text>
                <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
                <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
                <Text>{"\r\n\r\n"}</Text>
            </View>
        </View>
      );
}


function timeSplit(dateTime : string){
    const dt = dateTime.split('T');
    const date = dt[0];
    const time = dt[1].split('.')[0];
    return date + " " + time;
}

function renderNoStateMessage(){
    return (
        <View>
            <Text>There are no messages associated with this request.</Text>
        </View>
    );
}

async function writeComment(key : string, _btoa : string, comment : string){
    await fetch('https://mikovilla.atlassian.net/rest/api/2/issue/' + key + "/comment", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
            "Authorization" : "Basic " + _btoa
        },
        body: JSON.stringify({
                "body" : comment
            })
        }).then(response => response.json() ).then(data => { 
        
        }).catch(error => console.log(error))
}
