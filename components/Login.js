import React from "react";
import {StyleSheet} from "react-native";
import PropTypes from "prop-types";
import {Text, Input, Button, Form, ListItem} from "native-base";

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
        this.props.onRequest(this.state.phone);
        this.setState({step: 2});
    }

    onSignIn () {
        this.props.onSignIn(this.state.phone, this.state.code);
    }

    render () {
        return(
            <Form style={styles.container}>
                {this.state.step === 1 &&
                    <React.Fragment>
                        <Text>Войдите в систему, получив код в сообщении</Text>
                        <ListItem>
                            <Text style={{fontSize: 19, color: "#aaa"}}>+380</Text>
                            <Input style={{fontSize: 18}} placeholder="Телефон" onChange={(event) => this.setState({phone: event.nativeEvent.text})}/>
                        </ListItem>
                        <Button onPress={this.onRequest.bind(this)} style={styles.submit} rounded><Text>Получить код</Text></Button>
                    </React.Fragment>
                }

                {this.state.step === 2 &&
                    <React.Fragment>
                        <Text>Введите полученный код. Он должен прийти через несколько секунд</Text>
                        <ListItem><Input placeholder="Код" onChange={(event) => this.setState({code: event.nativeEvent.text})}/></ListItem>
                        <Button onPress={this.onSignIn.bind(this)} style={styles.submit} rounded><Text>Войти</Text></Button>
                    </React.Fragment>
                }

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
    modal: {

        backgroundColor: "rgba(0,0,0,0.75)",
        padding: 5
    },
    submit: {
        marginTop: 10
    },
    input: {
        marginTop: 20,
        marginBottom: 20
    }
});

Login.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired
};
