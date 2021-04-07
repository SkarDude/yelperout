import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
    justifyContent: "center",
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
