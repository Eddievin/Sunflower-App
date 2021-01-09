import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { Book } from "react-native-feather";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("journal-entries-test", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("journal-entries-test");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

function JournalHome() {
  const [screen, setScreen] = useState("home");
  const [text, setJournalText] = useState("placeholder value");

  if (screen === "home") {
    // Journal Homepage Screen
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column-reverse",
          backgroundColor: "#fff",
        }}
      >
        <View style={{ height: 80 }}></View>
        <View
          style={{
            height: 165,
            backgroundColor: "#F0F4FA",
          }}
        >
          <TouchableHighlight
            onPress={() => {
              console.log("press me");
              setScreen("journal-entry");
              Haptics.selectionAsync();
            }}
            underlayColor=""
            style={{}}
          >
            <View style={styles.exerciseContainer}>
              <View style={styles.exerciseTitleContainer}>
                <Text
                  style={{ fontSize: 16, fontWeight: "900", color: "#313853" }}
                >
                  Add Sober Journal Entry
                </Text>
                <Text style={{ fontSize: 14, marginTop: 6, color: "#8892AB" }}>
                  Rewire your brain to associate sobriety with reward.
                </Text>
              </View>

              <View style={styles.iconContainer}>
                <Book stroke="#6A49E8" width={22} height={22} />
              </View>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.feedContainer}>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
          <Text>THIS IS JOURNALLLL</Text>
        </View>
      </View>
    );
  } else {
    // Exercise Screen
    return (
      <View
        style={{
          backgroundColor: "#fff",
          height: "100%",
          zIndex: 100,
          paddingTop: 60,
        }}
      >
        <View style={styles.entryExerciseTitleContainer}>
          <Text style={{ fontSize: 20, fontWeight: "900", color: "#313853" }}>
            What did you accomplish today, because you were sober?
          </Text>
        </View>

        <TextInput
          style={{
            height: 160,
            borderColor: "gray",
            borderWidth: 1,
            padding: 12,
            margin: 12,
          }}
          onChangeText={(inputText) => setJournalText(inputText)}
          value={text}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableHighlight
            onPress={() => {
              console.log("press me");
              setScreen("home");
              Haptics.selectionAsync();
            }}
            underlayColor=""
            style={{}}
          >
            <View style={styles.cancelButtonContainer}>
              <Text style={{ fontSize: 18, fontWeight: "900", color: "white" }}>
                delete
              </Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setScreen("home");

              async function handleStorage() {
                let currentDate = new Date();
                let storedData = await getData();
                if (storedData !== null) {
                  storedData[currentDate] = text;
                } else {
                  storedData = {};
                  storedData[currentDate] = text;
                }

                storeData(storedData);
                let newStoredData = await getData();
                console.log(newStoredData);
              }

              handleStorage();

              Haptics.selectionAsync();
            }}
            underlayColor=""
          >
            <View style={styles.finishButtonContainer}>
              <Text style={{ fontSize: 18, fontWeight: "900", color: "white" }}>
                finish
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedContainer: {},
  exerciseContainer: {
    height: 120,
    backgroundColor: "#fff",
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderColor: "#EDEFFB",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBFCFE",
    width: "20%",
  },
  exerciseTitleContainer: {
    width: "80%",
    padding: 18,
    display: "flex",
    justifyContent: "center",
  },
  entryExerciseTitleContainer: {
    backgroundColor: "#f2f2f2",
    padding: 18,
  },
  cancelButtonContainer: {
    width: 100,
    height: 45,
    backgroundColor: "#FA344C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
  finishButtonContainer: {
    height: 45,
    width: 220,
    backgroundColor: "#6A49E8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 4,
  },
});

export default JournalHome;
