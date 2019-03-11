import React from "react";
import { NavigationEvents } from "react-navigation";
import { Title, Container, Content, Text } from "native-base";

export default class ModelContainer extends React.PureComponent {

    render() {
        return (
            <Container padder>
                <Content>
                    <Title><Text>Model</Text></Title>
                </Content>

            </Container>
        );
    }
}
