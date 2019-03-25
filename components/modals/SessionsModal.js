import React from "react";
import PropTypes from "prop-types";
import {Modal, View, StyleSheet} from "react-native";
import {Icon} from "native-base";

import Login from "../Login";

export default class SessionsModal extends React.PureComponent {

    render () {
        const {onSignIn, onRequest, sessionModalVisible, hideModal} = this.props;

        return(
            <View style={styles.container}>
                <Modal animationType="slide"
                    transparent={true}
                    visible={sessionModalVisible}
                >
                    <View style={styles.modal}>
                        <Icon name="ios-close" onPress={hideModal} style={styles.close}/>
                        <Login onSignIn={onSignIn} onRequest={onRequest}/>
                    </View>


                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {


        marginTop:5
    },
    modal: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        padding: 5
    },
    close: {
        textAlign: "right",
        marginBottom: 30
    }
});

SessionsModal.propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    sessionModalVisible: PropTypes.bool.isRequired
};
