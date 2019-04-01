import React from "react";
import {StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {Text, Input, Button, Form, ListItem, View, Body} from "native-base";

export default class Login extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            phone: "",
            code: "",
            step: 1
        };
    }

    onRequest () {
        if (this.state.phone.match(/^\d{9}$/)) {
            this.props.onRequest(this.state.phone);
            this.setState({step: 2});
            this.setState({phoneValidationError: undefined});
        } else {
            this.setState({phoneValidationError: "В номере телефона должно быть 9 цифр"});
        }
    }

    onSignIn () {
        if (this.state.code.match(/^\d{4}$/)) {
            this.props.onSignIn(this.state.phone, this.state.code);
            this.setState({codeValidationError: undefined});
        } else {
            this.setState({codeValidationError: "Код состоит из 4 цифр"});
        }
    }

    render () {
        const text = this.state.step === 1 ? "Войдите в систему, получив код в сообщении" : "Введите полученный код. Он должен прийти через несколько секунд";
        const requestButton = <Button onPress={this.onRequest.bind(this)} style={styles.button} rounded><Text>Получить код</Text></Button>;
        const signInButton = <Button onPress={this.onSignIn.bind(this)} style={styles.button} rounded><Text>Войти</Text></Button>;
        return(
            <Form style={styles.container}>
                <Text>{text}</Text>
                <ListItem style={styles.inputField}>
                    <Text style={{fontSize: 19, color: "#aaa"}}>+380</Text>
                    <Input style={{fontSize: 18}} placeholder="Телефон"
                        keyboardType="numeric"
                        onChange={(event) => this.setState({phone: event.nativeEvent.text})}
                    />
                    {this.state.phoneValidationError && <Body><Text style={{color: "red"}}>{this.state.phoneValidationError}</Text></Body>}
                </ListItem>
                {this.state.step === 2 &&
                    <ListItem style={styles.inputField}>
                        <Input placeholder="Код" keyboardType="numeric" onChange={(event) => this.setState({code: event.nativeEvent.text})}/>
                        {this.state.codeValidationError && <Text style={{color: "red"}}>{this.state.codeValidationError}</Text>}
                    </ListItem>
                }
                <View style={{margin: 20, justifyContent: "flex-end", flexDirection: "row"}}>
                    {this.state.step === 1 ? requestButton : signInButton}
                </View>
            </Form>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10,
        flex: 0,
        borderRadius: 7
    },
    inputField: {
        borderBottomWidth: 0
    },
    button: {
        marginTop: 10
    }
});

Login.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired
};
