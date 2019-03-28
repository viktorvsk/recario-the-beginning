import React from "react";
import {Animated, TouchableOpacity, StyleSheet} from "react-native";
import {Icon, Text} from "native-base";

export default class Notification extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            message: "",
            onPress: null
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onBodyPress = this.onBodyPress.bind(this);

        this.timeout = null;
        this.timeoutConst = 5000;

        this.animatedPosition = new Animated.Value(-100);
    }

    show({message, timeout, onPress}) {
        const timeoutValue = timeout ? timeout : this.timeoutConst;

        this.setState({show: true, message, onPress});

        Animated.timing(this.animatedPosition, {
            toValue: 25,
            duration: 200
        }).start();

        if (timeout !== 0) {
            this.timeout = setTimeout(this.hide, timeoutValue);
        }
    }

    hide() {
        Animated.timing(this.animatedPosition, {
            toValue: -100,
            duration: 200
        }).start(() => {
            this.setState({show: false});
        });
        clearTimeout(this.timeout);
    }

    onBodyPress() {
        const { onPress } = this.state;

        if (onPress) {
            onPress();
        }
        this.hide();
    }

    render() {
        const { show, message } = this.state;
        return show && (
            <Animated.View style={[styles.notificationWrapper, {top: this.animatedPosition}]}>
                <TouchableOpacity onPress={this.onBodyPress} style={styles.notificationBody}>
                    <Text style={{flex: 1, color: "#fff"}}>{message.message ? message.message : message}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.hide}>
                    <Icon name="ios-close" />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    notificationWrapper: {
        marginTop: 50,
        position: "absolute",
        left: 16,
        backgroundColor: "#ff7675",
        zIndex: 100000,
        width: "90%",
        paddingHorizontal: 16,
        paddingVertical: 21,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    notificationBody: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1
    }
});