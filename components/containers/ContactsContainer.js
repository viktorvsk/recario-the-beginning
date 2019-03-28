import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DataProvider, LayoutProvider} from "recyclerlistview";
import {Permissions, Contacts} from "expo";
import {Dimensions} from "react-native";

import * as ActionTypes from "../../actions/actionTypes.js";

import {updateContacts, getContacts} from "../../actions/contactsActions";
import {showModal, hideModal, signIn, requestCode} from "../../actions/sessionsActions";
import {loadAd} from "../../actions/adsActions";

import ContactsScreen from "../screens/ContactsScreen";

import AdCar from "../AdCar";

class ContactsContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io", headerBackTitle: null
  }

  render() {
      const {permissionsGiven, showModal, hideModal, sessionModalVisible, token, navigation, postUpdatedContacts, getContacts, fAds, fofAds, isLoading, settingsFilters, loadAd} = this.props;
      const dataProvider = new DataProvider((r1, r2) => r1.key !== r2.key);
      const rowRenderer = (type, data) => <AdCar withTitle={true} filters={settingsFilters} ad={data} nav={navigation} onPress={() => {
          loadAd(data.id);
          navigation.navigate("Ad");
      }
      }/>;
      const layoutProvider = new LayoutProvider(
          () => 0,
          (type, dim) => {
              dim.width = Dimensions.get("window").width;
              dim.height = 520;
          }
      );

      const onRequest = (phone) => {
          this.props.requestCode(phone);
      };

      const onSignIn = async (phone, code) => {
          await this.props.signIn(phone, code);
          this.props.getContacts();
      };

      return(
          <ContactsScreen postUpdatedContacts={postUpdatedContacts}
              token={token}
              settingsFilters={settingsFilters}
              getContacts={getContacts}
              fAds={fAds}
              fofAds={fofAds}
              isLoading={isLoading}
              rowRenderer={rowRenderer}
              layoutProvider={layoutProvider}
              dataProvider={dataProvider}
              showModal={showModal}
              hideModal={hideModal}
              sessionModalVisible={sessionModalVisible}
              onSignIn={onSignIn}
              onRequest={onRequest}
              nav={navigation}
              permissionsGiven={permissionsGiven}
          />

      );
  }
}

function mapStateToProps(state) {
    return {
        token: state.settings.accessToken,
        fAds: state.contacts.fAds,
        fofAds: state.contacts.fofAds,
        isLoading: state.contacts.isLoading,
        settingsFilters: state.settings.filters,
        sessionModalVisible: state.settings.sessionModalVisible,
        permissionsGiven: state.contacts.permissionsGiven
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModal: () => dispatch(showModal()),
        hideModal: () => dispatch(hideModal()),
        signIn: (phone, code) => dispatch(signIn(phone, code)),
        requestCode: (phone) => dispatch(requestCode(phone)),
        getContacts: () => dispatch(getContacts()),
        loadAd: (id) => dispatch(loadAd(id)),
        postUpdatedContacts: async () => {
            const {status} = await Permissions.askAsync(Permissions.CONTACTS);
            if (status === "granted") {
                const contacts = await Contacts.getContactsAsync({fields: [Contacts.PHONE_NUMBERS]});
                const contactsNormalizer = c => { return { name: c.name, phoneNumbers: c.phoneNumbers.map(p => p.digits)}; };
                const normalizedContacts = contacts.data.filter(c => c.phoneNumbers).map(contactsNormalizer);
                dispatch(updateContacts(normalizedContacts));
            } else {
                dispatch({type: ActionTypes.CONTACTS_PERMISSIONS_DENIED});
            }

        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);

ContactsContainer.propTypes = {
    token: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    settingsFilters: PropTypes.object.isRequired,
    postUpdatedContacts: PropTypes.func.isRequired,
    loadAd: PropTypes.func.isRequired,
    getContacts: PropTypes.func.isRequired,
    fofAds: PropTypes.array.isRequired,
    fAds: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    showModal: PropTypes.func.isRequired,
    hideModal: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    requestCode: PropTypes.func.isRequired,
    sessionModalVisible: PropTypes.bool.isRequired,
    permissionsGiven: PropTypes.bool.isRequired
};

