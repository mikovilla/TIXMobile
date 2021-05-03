import { StyleSheet, Text, View, Button, Image, AsyncStorage } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 30
    },
    tagLine:{
        fontSize: 12, 
        paddingLeft: 25, 
        paddingRight: 25, 
        textAlign: "center", 
        color: "rgb(64, 112, 209)"
    },
    credentialsText:{
        width: "80%",
        padding: 5,
        borderWidth: 1,
        borderRadius: 5
    },
    formButton:{
        width: "80%",
    },
    formCommentButton:{
        width: 300,
    },
    spanWithLink: {
        width: "80%",
        alignItems: "center"
    },
    linkButton: {
        color: "#0275d8"
    },
    backgroundImageContact: {
        height: "27.5%",
        width: "50%",
        borderRadius: 200,
        marginTop: 50,
        marginBottom: 30
    },
    backgroundImage: {
        height: "30%",
        width: "100%",
        marginBottom: 20
    },
    backgroundImageWelcomeAndTac: {
        height: "30%",
        width: "100%",
        marginBottom: -20
    },
    splashImage: {
        height: "45%",
        width: "100%",
        marginBottom: 30
    },
    MessageTextArea:{
        width: "80%",
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        height: 150,
        justifyContent: "flex-start"
    },
    CommentTextArea:{
        width: 300,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        height: 100,
        justifyContent: "flex-start"
    },
    header:{
        fontSize: 18, 
        fontWeight: 'bold'
    },
    footer:{ 
        fontSize: 9, 
        paddingTop: 10 
    },
    footerTwo:{ fontSize: 9 },
    messageTextArea:{
        width: "80%",
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        height: 150,
        justifyContent: "flex-start"
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 0,
        marginTop: -15
    },
    tacLabel: {
        margin: 5,
    },
    tacScrollView:{
        marginLeft: 50,
        marginRight: 50,
        height: 50
    },
    subContainer:{
        paddingHorizontal : 50
    },
    subContainerTwo:{
        alignItems: "center"
    },
    requestScrollView:{
        alignSelf : 'stretch',
        width: 400,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    requestIdScrollView:{
        alignSelf : 'auto',
        width: 320,
        paddingRight: 20,
    },
    listRequest:{
        borderBottomWidth: 1,
        borderColor: "black",
        fontStyle: "italic",
        fontSize: 10,
        paddingVertical: 5
    }
  });
