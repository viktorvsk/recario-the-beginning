import React from "react";
import PropTypes from "prop-types";
import {Text, Input, InputGroup, Icon, Button, Form} from "native-base";

export default class Login extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            phone: "",
            password: ""
        };
    }

    onSubmit () {
        this.props.onSignIn(this.state.phone, this.state.password);
    }

    render () {
        return(
            <Form>
                <InputGroup>
                    <Icon name="ios-search" />
                    <Input placeholder="Телефон" onChange={(event) => this.setState({phone: event.nativeEvent.text})}/>
                </InputGroup>
                <InputGroup>
                    <Icon name="ios-search" />
                    <Input placeholder="Пароль" onChange={(event) => this.setState({password: event.nativeEvent.text})}/>
                </InputGroup>
                <Button onPress={this.onSubmit.bind(this)}>
                    <Text>Продолжить</Text>
                </Button>
            </Form>
        );
    }
}

Login.propTypes = {
    onSignIn: PropTypes.func.isRequired
};
