import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {DataProvider, LayoutProvider} from "recyclerlistview";
import {Permissions, Contacts} from "expo";
import {Text} from "native-base";
import {Dimensions} from "react-native";

import {updateContacts, getContacts} from "../../actions/contactsActions";
import {loadAd} from "../../actions/adsActions";

import ContactsScreen from "../screens/ContactsScreen";

import AdCar from "../AdCar";

class ContactsContainer extends React.PureComponent {
  static navigationOptions = {
      title: "reCar.io",
      headerBackTitle: "Друзья"
  }

  render() {
      const {token, navigation, postUpdatedContacts, getContacts, fAds, fofAds, isLoading, settingsFilters, loadAd} = this.props;
      const onPress = () => navigation.push("Sessions");
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

      if (!token) {
          return <Text onPress={onPress}>Войдите в систему, чтобы увидеть, кто из ваших друзей продает машину</Text>;
      }

      return(
          <ContactsScreen postUpdatedContacts={postUpdatedContacts}
              settingsFilters={settingsFilters}
              getContacts={getContacts}
              fAds={fAds}
              fofAds={fofAds}
              isLoading={isLoading}
              rowRenderer={rowRenderer}
              layoutProvider={layoutProvider}
              dataProvider={dataProvider}
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
        settingsFilters: state.settings.filters
    };
}

function mapDispatchToProps(dispatch) {
    return {
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
    isLoading: PropTypes.bool.isRequired
};

