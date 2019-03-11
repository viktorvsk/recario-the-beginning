import React from "react";
import { NavigationEvents } from "react-navigation";
import { Title, Container, Content, Text } from "native-base";

export default class SearchContainer extends React.PureComponent {

    render() {
        return (
            <Container padder>
                <Content>
                    <Title><Text>Search</Text></Title>
                </Content>

            </Container>
        );
    }
}
