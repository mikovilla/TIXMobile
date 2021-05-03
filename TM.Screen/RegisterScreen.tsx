import React from "react";
import { StyleSheet, Text, View, Button, Image, CheckBox, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles';

export function RegisterScreen( { navigation } : { navigation : any } ){
    const [firstName, onFirstNameChange] = React.useState('');
    const [lastName, onLastNameChange] = React.useState('');
    const [email, onEmailChange] = React.useState('');
    const [username, onUsernameChange] = React.useState('');
    const [password, onPasswordChange] = React.useState('');
    const [confirmPassword, onConfirmPasswordChange] = React.useState('');
    const [isTacSelected, setTac] = React.useState(false);

    AsyncStorage.getItem('App:Basic').then(x => {
        if(x !== null)navigation.navigate('Home');
    });

    return (
    <View style={styles.container}>
        <Image source={require('./../assets/tixbanner.png')} style={styles.backgroundImage}/>
        <TextInput
            style={styles.credentialsText}
            onChangeText={(text) => onFirstNameChange(text)}
            value = {firstName}
            placeholder="First Name"
        />
        <Text>{" "}</Text>
        <TextInput
            style={styles.credentialsText}
            onChangeText={(text) => onLastNameChange(text)}
            value = {lastName}
            placeholder="Last Name"
        />
        <Text>{" "}</Text>
        <TextInput
            style={styles.credentialsText}
            onChangeText={(text) => onEmailChange(text)}
            value = {email}
            placeholder="Email Address" 
        />
        <Text>{" "}</Text>
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
        <TextInput
            style={styles.credentialsText}
            secureTextEntry={true}
            onChangeText={(text) => onConfirmPasswordChange(text)}
            value = {confirmPassword}
            placeholder="Confirm Password" 
        />
        <Text>{""}</Text>
        <View style={styles.checkboxContainer}>
            <CheckBox
            value={isTacSelected}
            onValueChange={setTac}
            />
            <Text style={styles.tacLabel}>I accept the
                <Text
                    style={styles.linkButton}
                    onPress={() => navigation.navigate("Terms and Conditions")}
                > terms and conditions</Text>.
            </Text>
        </View>
        <View style={styles.formButton}>
            <Button
                onPress={
                    () => {
                        register(firstName, lastName, email, username, password, confirmPassword, isTacSelected, navigation);
                    }
                }
                title="Register" />
        </View>
    </View>
    );
  }

  async function register(firstName : string, lastName : string, email : string, username : string, password : string, confirmPassword : string, isTacSelected : boolean, navigation : any){
    let hasError : boolean = false;
    let errorMessage : string[] = new Array();

    if(firstName === '' || lastName === '' || email === '' || username === '' || password === '' || confirmPassword === '')    {
        hasError = true;
        alert("Some fields are missing. Please make sure that all fields are properly filled in.");
        return;
    }

    if(password !== confirmPassword){
        hasError = true;
        alert("The password and the confirm password should match.");
        return;
    }

    if(!validateEmail(email)){
        hasError = true;
        alert("Email address has an invalid format.");
        return;
    }

    if(!isTacSelected){
        hasError = true;
        alert("You must agree to the terms and conditions.");
        return;
    }

    const _username = await fetch("https://tip.mikovilla.com/tix/api/Users?username=" + username + "").then(response => response.json()).then(data => { return data; });
    const _email = await fetch("https://tip.mikovilla.com/tix/api/Users?username=" + email + "&validationType=2").then(response => response.json()).then(data => { return data; });
    let isUsernameAvailable : boolean = _username === null ? true : false;
    let isEmailAvailable : boolean = _email === null ? true : false;
    
    if(!isUsernameAvailable){
        hasError = true;
        errorMessage.push("The username has already been taken.");
    }

    if(!isEmailAvailable){
        hasError = true;
        errorMessage.push("The email has already been taken.");
    }
    
    if(!hasError){
        const profile = {
            "FirstName" : firstName,
            "LastName" : lastName,
            "Email" : email,
            "Username" : username,
            "Password" : password
        }
        const response = await fetch("https://tip.mikovilla.com/tix/api/Users", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(profile)
        });
        alert("Registration successful. Please check your email to complete the registration process.");
        navigation.navigate("Login")
    }else{
        alert(errorMessage.join("\r\n"))
    }
  }

  function validateEmail(emailAddress : string){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
  }

  