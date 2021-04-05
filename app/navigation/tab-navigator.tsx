import React from "react"

import { SearchScreen, AboutScreen, WelcomeScreen } from "../screens"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { color } from "../theme"

export type TabParamList = {
  home: undefined
  search: undefined
  decode: undefined
  about: undefined
}

// Documentation: https://reactnavigation.org/docs/tab-based-navigation/
const Tab = createBottomTabNavigator<TabParamList>()

const tabBarOptions = {
  activeTintColor: color.secondary,
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: color.background,
  },
}

const homeTabOptions = {
  tabBarVisible: false,
}

export function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="home" tabBarOptions={tabBarOptions}>
      <Tab.Screen name="home" options={homeTabOptions} component={WelcomeScreen} />
      <Tab.Screen name="search" component={SearchScreen} />
      <Tab.Screen name="about" component={AboutScreen} />
    </Tab.Navigator>
  )
}
