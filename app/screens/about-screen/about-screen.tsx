import React, { useState } from "react"
import ImageView from "react-native-image-viewing"
import { Image, ImageStyle, TextStyle, View, ViewStyle, TouchableOpacity, Linking } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Header, Text, Screen, Wallpaper } from "../../components"
import { color, spacing } from "../../theme"
export const logo = require("./logo.png")
export const heart = require("./heart.png")
export const abrev = require("./abrev.png")

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
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
const TAGLINE: TextStyle = {
  fontSize: 18,
  lineHeight: 22,
  marginBottom: spacing[4] + spacing[1],
}
const IGNITE: ImageStyle = {
  marginVertical: spacing[6],
  alignSelf: "center",
}
const ALEX_WRAPPER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}
const VERS: TextStyle = {
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}
const EXPERT: TextStyle = {
  color: "#788878",
  fontSize: 15,
  lineHeight: 22,
}
const HEART: ImageStyle = {
  marginHorizontal: spacing[2],
  width: 10,
  height: 10,
  resizeMode: "contain",
}
const VERSION: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
}

export const AboutScreen = observer(function AboutScreen() {
  const [vis, setVis] = useState(false)

  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const images = [
    abrev
  ]

  return (
    <View testID="AboutScreen" style={FULL}>
      <ImageView
        images={images}
        imageIndex={0}
        backgroundColor={'#D7BE69'}
        visible={vis}
        onRequestClose={() => setVis(false)}
      />
      <Wallpaper />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          headerTx="aboutScreen.header"
          style={HEADER}
          titleStyle={HEADER_TITLE}
          leftIcon="back"
          onLeftPress={goBack}
        />
        <Text style={TAGLINE} tx="aboutScreen.tagLine" />
        <TouchableOpacity onPress={ () => Linking.openURL('mailto:info@barbiebreathitt.com?subject=MobileAppContact')}>
          <BulletItem text="Featuring over 10,000 decoded sybmbols and more to come! Suggestions click here to contact us" />
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setVis(true)}>
          <BulletItem text="For abbreviations for the books of the bible seen within the definitions click here" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://dreamsdecoder.com/')}>
          <BulletItem text="Check out more resources and info from Dr. Barbie Breathitt on our website https://dreamsdecoder.com/" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://decodemydream.com/')}>
          <BulletItem text="Copy your decode report and submit a dream for manual analysis https://decodemydream.com/" />
        </TouchableOpacity>
        <Image source={logo} style={IGNITE} />
        <TouchableOpacity onPress={() => Linking.openURL('https://alexpert.tech')}>
          <View style={ALEX_WRAPPER}>
            <Text style={VERS} text="Developed with" />
            <Image source={heart} style={HEART} />
            <Text style={VERS} text="AL" />
            <Text style={EXPERT} text="EXpert " />
            <Text style={VERS} text="Tech" />
          </View>
        </TouchableOpacity>
        <View style={VERSION}>
          <Text style={VERS} text="Version: 0.0.1" />
        </View>
      </Screen>
    </View>
  )
})
