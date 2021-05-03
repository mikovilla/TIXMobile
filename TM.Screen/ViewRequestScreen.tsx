import React from 'react';
import { Text, View, Image, AsyncStorage, FlatList, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';
import * as b64 from '../Base64';

export function ViewRequestScreen ( { navigation } : { navigation : any } )
{
    const [issues, getIssues] = React.useState('');   
    let obj : any; 
    AsyncStorage.getItem('App:Basic').then(x => {
        if(x === null) navigation.navigate('TIX Mobile')
    });

    setTimeout(()=>{
        AsyncStorage.getItem('App:Issues').then(appIssues => {
            if(appIssues){
                getIssues(appIssues ?? "");
            }
        });
    }, 3000)

    return (
        <View style={styles.container}>
            <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
            <Text style={styles.header}>{"MY (" + (issues && JSON.parse(issues).issues.length) + ") REQUESTS"}</Text>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={issues && JSON.parse(issues).issues}
                    keyExtractor={({ key }, index) => key}
                    renderItem={({ item }) => (
                        <ScrollView style={ styles.requestScrollView }  persistentScrollbar={ true }>
                            <TouchableWithoutFeedback onPress={() => {
                                    storeTicket(item.key); 
                                    navigation.navigate("View Request");
                                }}>
                                <View>
                                    {/*// @ts-ignore */}
                                    <Text>{"[ " + item.key + " ]: " + item.fields.summary}</Text>
                                    <Text style={styles.listRequest}>{"Assigned To: " + (item.fields.assignee === null ? "Unassigned" : item.fields.assignee.displayName) + "\r\nStatus: " + item.fields.status?.name + "\r\n" + "Created on: " + item.fields.created}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </ScrollView>
                    )}
                />
            <Text>{"\r\n"}</Text>
            <Text style={styles.footer}>{"Copyright © " + new Date().getFullYear() + " Singleton."}</Text>
            <Text style={styles.footerTwo}>{"All Rights Reserved."}</Text>
            <Text>{"\r\n\r\n"}</Text>
            </SafeAreaView>
        </View>
      );
}

async function storeTicket(data : string){
    await AsyncStorage.setItem("App:IssueKey", data);
}





