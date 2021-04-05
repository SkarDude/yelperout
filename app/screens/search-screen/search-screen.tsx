import React, { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, ViewStyle, TextStyle, StyleSheet, Pressable, FlatList, TouchableOpacity, Modal, Switch } from "react-native"
import { SearchBar } from "react-native-elements"
import { observer } from "mobx-react-lite"
import { Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { useLazyQuery, useQuery, gql } from "@apollo/client"
import MapView from "react-native-maps"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  color: "#BAB6C8",
  fontSize: 30,
  textAlign: "center",
  letterSpacing: 1.5,
}
const HEADER: TextStyle = {
  position: 'absolute',
  width: "100%",
  alignItems: 'center',
  justifyContent: 'center',
  top: "5%",
}

const FLAT_LIST: TextStyle = {
  paddingLeft: 15,
  marginTop: 15,
  paddingBottom: 15,
  fontSize: 20,
  borderBottomColor: "#26a69a",
  borderBottomWidth: 1,
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    elevation: 2,
    padding: 10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  modalHeader: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalView: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },
  switch: {
    alignItems: "flex-end",
    flexWrap: "nowrap",
    justifyContent: "flex-end"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
})

export const SearchScreen = observer(function SearchScreen() {
  const SEARCH = gql`
    query Search {
        search(term: "burrito", latitude: 33.470210, longitude: -112.179780, limit: 5) {
            business {
                name
                display_phone
                location {
                  formatted_address
                }
                coordinates {
                  latitude
                  longitude
                }
                rating
            }
        }
    }
  `

  const [query, setQuery] = useState("")
  const [values, setValues] = useState([])
  const [sel, setSel] = useState("")
  const [des, setDesc] = useState("")
  const [vis, setVis] = useState(false)
  const { loading, error, data } = useQuery(SEARCH)
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const initPage = async () => {
    //
  }

  useEffect(() => {
    if (data) setValues(data.search.business)
  }, [data])

  const updateQuery = (input) => {
    setQuery(input)
    console.log("here")
  }

  const handleSelect = (item) => {
    setSel(`${item.name} \n Rating: ${item.rating}`)
    setDesc(`Phone: ${item.display_phone} \n Address: ${String(item.location.formatted_address)}`)
    setVis(true)
  }
  if (loading) console.log("loading")
  if (error) console.log(error)
  return (
    <View testID="SearchScreen" style={FULL}>
      <Wallpaper />
      <View style={HEADER}>
        {query ? <Text style={HEADER_TITLE}>{query}</Text> : <Icon name="search" size={30} color={"#BAB6C8"}/>}
      </View>
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={vis}
          onRequestClose={() => {
            setVis(false)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalHeader}>{sel}</Text>
              <Text style={styles.modalText}>{des}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVis(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {isEnabled
          ? <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: 33.470210,
              longitude: -112.179780,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05
            }}
          />
          : <FlatList
            style={{ marginTop: "10%" }}
            data={values}
            keyExtractor={(i, index) => 'key' + index}
            renderItem={({ item }) => (<TouchableOpacity onPress={ () => handleSelect(item)}><Text style={FLAT_LIST}>{`${item.name}`}</Text></TouchableOpacity>)}
          />
        }
      </Screen>
      <View style={styles.switch}>
        <Text style={styles.modalHeader}>{isEnabled ? "Map" : "List"}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <SearchBar onChangeText={updateQuery} value={query} placeholder="Type Here..." lightTheme={true} round={true}/>
    </View>
  )
})
