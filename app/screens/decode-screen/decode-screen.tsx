import React, { useState, useEffect } from "react"
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, ViewStyle, TextStyle, StyleSheet, Pressable, Modal } from "react-native"
import { observer } from "mobx-react-lite"
import { Screen, Text, Wallpaper, Header } from "../../components"
import { color, spacing, typography } from "../../theme"

// https://reactnative.dev/docs/share

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
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
})

export const DecodeScreen = observer(function DecodeScreen() {
  const [query, setQuery] = useState("")
  const [values, setValues] = useState([])
  const [sel, setSel] = useState("")
  const [def, setDef] = useState("")
  const [vis, setVis] = useState(false)

  const initPage = async () => {
    //
  }

  useEffect(() => {
    initPage()
  }, [])

  const updateQuery = (input) => {
    setQuery(input)
    // const a = realm.objects("definitions").filtered(`symbol contains "${input}" or definition contains "${input}"`)
    // setValues(a.slice(0, 200))
  }

  const handleSelect = (item) => {
    console.log(item)
    setSel(item.symbol)
    setDef(item.definition)
    setVis(true)
  }

  return (
    <View testID="DecodeScreen" style={FULL}>
      <Wallpaper />
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
              <Text style={styles.modalText}>{def}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setVis(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Header
          headerTx="decodeScreen.header"
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
      </Screen>
    </View>
  )
})
