import React from "react";
import { Button, Card, ListItem } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Icon,
  ScrollView
} from "react-native";

export default class App extends React.Component {
  state = {
    searchTerm: "",
    data: []
  };

  submitForm = () => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
        this.state.searchTerm
      }`
    )
      .then(res => res.json())
      .then(data => this.setState({ data }));
    //console.log(this.state.data.drinks);
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ padding: 10 }}>
          <TextInput
            style={{ height: 40 }}
            placeholder="Type here to search for a drink"
            onChangeText={text => this.setState({ searchTerm: text })}
          />
          <Button
            onPress={this.submitForm}
            title="Get Drinks"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          {!this.state.data.drinks ? (
            <Text>Please Search for a Drink</Text>
          ) : (
            this.state.data.drinks.map(drink => {
              return (
                <View key={drink.idDrink}>
                  <Card
                    title={drink.strDrink}
                    image={{ uri: drink.strDrinkThumb }}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      {drink.strInstructions}
                    </Text>
                    <Button
                      icon={{ name: "code" }}
                      backgroundColor="#03A9F4"
                      buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                      }}
                      title="VIEW NOW"
                    />
                  </Card>
                </View>

                // <View key={drink.idDrink}>
                //   <Text style={{ fontSize: 20 }}>{drink.strDrink}</Text>
                //   <Image
                //     style={{ width: 400, height: 400 }}
                //     source={{ uri: drink.strDrinkThumb }}
                //   />
                //   <Text>{drink.strInstructions}</Text>
                // </View>
              );
            })
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
