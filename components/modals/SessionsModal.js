import React from "react";
import PropTypes from "prop-types";
import {Modal, View, StyleSheet} from "react-native";
import {Icon} from "native-base";

import Login from "../Login";

export default class SessionsModal extends React.PureComponent {

    render () {
        const {onSignIn, sessionModalVisible, hideModal} = this.props;

        return(
            <View style={styles.container}>
                <Modal animationType="slide"
                    transparent={true}
                    visible={sessionModalVisible}
                >
                    <View style={styles.modal}>
                        <Icon name="ios-close" onPress={hideModal}/>
                        <Login onSignIn={onSignIn}/>
                    </View>


                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        marginTop:30
    },
    modal: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#00ff00",
        padding: 5
    },
    text: {
        color: "#3f2949",
        marginTop: 10
    }
});

SessionsModal.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    sessionModalVisible: PropTypes.bool.isRequired
};
