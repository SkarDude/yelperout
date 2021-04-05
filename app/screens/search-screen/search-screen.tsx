import React, { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, ViewStyle, TextStyle, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity, Modal, Switch } from "react-native"
import { SearchBar } from "react-native-elements"
import { observer } from "mobx-react-lite"
import { Screen, Text, Wallpaper } from "../../components"
import { color, spacing, typography } from "../../theme"
import { useLazyQuery, gql } from "@apollo/client"
import MapView, { Marker } from "react-native-maps"
import Geolocation from '@react-native-community/geolocation'
import debounce from 'lodash.debounce'
import ModalSelector from 'react-native-modal-selector'

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const MAP_CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
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
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22
  },
  filter: {
    justifyContent: "center"
  },
  formContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    borderWidth: 1,
    height: 40,
    margin: 12,
  },
  location: {
    justifyContent: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapCont: {
    alignItems: 'center',
    height: "90%",
    justifyContent: 'center',
    marginTop: "10%",
    width: "100%",
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
    justifyContent: "flex-end"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
})

export const SearchScreen = observer(function SearchScreen() {
  const SEARCH_COORD = gql`
    query Search ($term: String!, $latitude: Float!, $longitude: Float!, $categories: String!) {
        search(term: $term, latitude: $latitude, longitude: $longitude, categories: $categories, limit: 10) {
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

  const SEARCH_ADDR = gql`
    query Search ($term: String!, $location: String!, $categories: String!) {
        search(term: $term, location: $location, categories: $categories, limit: 10) {
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
  const [location, setLocation] = useState({ latitude: 33.470210, longitude: -112.179780 })
  const [address, setAddress] = useState("")
  const [addModal, setAddModal] = useState(false)
  const [category, setCategory] = useState("")
  const [sel, setSel] = useState("")
  const [des, setDesc] = useState("")
  const [vis, setVis] = useState(false)
  const [searchCoord, { data }] = useLazyQuery(SEARCH_COORD)
  const [searchAddress, { data: dataA }] = useLazyQuery(SEARCH_ADDR)
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  const initLocation = async () => {
    Geolocation.getCurrentPosition(info => setLocation({ latitude: info.coords.latitude, longitude: info.coords.longitude }))
  }

  const updateQuery = (input) => {
    setQuery(input)
    console.log(category)
    if (!address) {
      // highlight-starts
      const debouncedSave = debounce(() => searchCoord({ variables: { term: input, latitude: location.latitude, longitude: location.longitude, categories: category, } }), 400)
      debouncedSave()
      // highlight-ends
      setValues(data && data.search.business)
    } else {
      const debouncedSave = debounce(() => searchAddress({ variables: { term: input, location: address, categories: category, } }), 400)
      debouncedSave()
      // highlight-ends
      setValues(dataA && dataA.search.business)
      setLocation(dataA && dataA.search.business[0].coordinates)
      setIsEnabled(false)
    }
  }

  useEffect(() => {
    if (!address) initLocation()
    updateQuery(query)
  }, [address, category])

  const handleSelect = (item) => {
    setSel(`${item.name} \n Rating: ${item.rating}`)
    setDesc(`Phone: ${item.display_phone} \n Address: ${String(item.location.formatted_address)}`)
    setVis(true)
  }

  const updateLocation = () => {
    updateQuery(query)
    setAddModal(false)
  }
  let index = 0
  const categories = [
    { key: index++, section: true, label: 'Category' },
    { key: index++, label: '' },
    { key: index++, label: 'restaurants' },
    { key: index++, label: 'auto' },
    { key: index++, label: 'hotels' },
    { key: index++, label: 'homeservices' },
    { key: index++, label: 'shopping' },
    { key: index++, label: 'bars' },
  ]

  return (
    <View testID="SearchScreen" style={FULL}>
      <Wallpaper />
      <View style={HEADER}>
        {query ? <Text style={HEADER_TITLE}>{query}</Text> : <Icon name="search" size={30} color={"#BAB6C8"}/>}
      </View>
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
        ? <Screen style={MAP_CONTAINER} backgroundColor={color.transparent}>
          <View style={styles.mapCont}>
            <MapView
              style={styles.map}
              initialRegion={{
                ...location,
                latitudeDelta: 0.25,
                longitudeDelta: 0.25
              }}
            >
              {!address && <Marker
                coordinate={location}
                title={"Your Location"}
                pinColor={"green"}
              />}
              {values.map((biz, index) => (
                <Marker
                  key={index}
                  coordinate={biz.coordinates}
                  title={biz.name}
                  onPress={ () => handleSelect(biz)}
                />
              ))}
            </MapView>
          </View>
        </Screen>
        : <Screen style={CONTAINER} backgroundColor={color.transparent}>
          <FlatList
            style={{ marginTop: "10%" }}
            data={values}
            keyExtractor={(i, index) => 'key' + index}
            renderItem={({ item }) => (<TouchableOpacity onPress={ () => handleSelect(item)}><Text style={FLAT_LIST}>{`${item.name}`}</Text></TouchableOpacity>)}
          />

        </Screen>
      }
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModal}
        onRequestClose={() => {
          setAddModal(false)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHeader}>Address</Text>
            <Text style={styles.modalText}>Enter address or leave empty address to use current location.</Text>
            <TextInput style={styles.input} onChangeText={setAddress}
              value={address} placeholder="123 Rainbow Rd, Phoenix AZ 85035"/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => updateLocation()}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.formContainer}>
        <View style={styles.location}>
          <Icon.Button
            name="map-pin"
            backgroundColor="#F194FF"
            onPress={() => setAddModal(true)}>
              Set Location
          </Icon.Button>
        </View>
        <View style={styles.filter}>
          <ModalSelector
            data={categories}
            initValue={category || "Category"}
            onChange={(option) => { setCategory(option.label) }} />
        </View>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
          <Text>{isEnabled ? "Map" : "List"}</Text>
        </View>
      </View>
      <SearchBar onChangeText={updateQuery} value={query} placeholder="Type Here..." lightTheme={true} round={true}/>
    </View>
  )
})
