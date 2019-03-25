import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DataProvider, LayoutProvider} from "recyclerlistview";
import {Permissions, Contacts} from "expo";
import {Dimensions} from "react-native";


import {updateContacts, getContacts} from "../../actions/contactsActions";
import {showModal, hideModal, signIn} from "../../actions/sessionsActions";
import {loadAd} from "../../actions/adsActions";

import ContactsScreen from "../screens/ContactsScreen";

import AdCar from "../AdCar";

class ContactsContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io",
      headerBackTitle: "Друзья"
  }

  // componentDidMount() {
  //   this._sub = this.props.navigation.addListener(
  //     'didFocus',
  //     () => { if (!this.props.token) { this.props.showModal() } }
  //   );
  // }

  // componentWillUnmount() {
  //   this._sub.remove();
  // }

  render() {
      const {signIn, showModal, hideModal, sessionModalVisible, token, navigation, postUpdatedContacts, getContacts, fAds, fofAds, isLoading, settingsFilters, loadAd} = this.props;
      const dataProvider = new DataProvider((r1, r2) => r1.key !== r2.key);
      const rowRenderer = (type, data) => <AdCar filters={settingsFilters} ad={data} nav={navigation} onPress={() => {
          loadAd(data.id);
          navigation.push("Ad");
      }
      }/>;
      const layoutProvider = new LayoutProvider(
          () => 0,
          (type, dim) => {
              dim.width = Dimensions.get("window").width;
              dim.height = 470;
          }
      );
      const onSignIn = async (phone, pass) => {
          await signIn(phone, pass);
          getContacts();
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
              nav={navigation}
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
        sessionModalVisible: state.settings.sessionModalVisible
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showModal: () => dispatch(showModal()),
        hideModal: () => dispatch(hideModal()),
        signIn: (phone, pass) => dispatch(signIn(phone, pass)),
        getContacts: () => dispatch(getContacts()),
        loadAd: (id) => dispatch(loadAd(id)),
        postUpdatedContacts: async () => {
            Permissions.askAsync(Permissions.CONTACTS).then(async response => {
                if (response.permissions.status === "denied") {
                    // TODO: Implement redirect with message here
                    return false;
                }
                const contacts = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.PHONE_NUMBERS
                    ]
                });
                const normalizedContacts = contacts.data.filter(c => c.phoneNumbers).map(c => {
                    return { name: c.name, phoneNumbers: c.phoneNumbers.map(p => p.digits)};
                });
                dispatch(updateContacts(normalizedContacts));
            });
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
    sessionModalVisible: PropTypes.bool.isRequired
};

