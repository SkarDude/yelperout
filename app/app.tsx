import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowSafeAreaInsets } from "react-native-safe-area-context"
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  setRootNavigation,
  useNavigationPersistence,
} from "./navigation"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import { enableScreens } from "react-native-screens"
enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

function App() {
  const navigationRef = useRef<NavigationContainerRef>()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  const client = new ApolloClient({
    uri: 'https://api.yelp.com/v3/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: "Bearer **API_KEY**",
      'Accept-Language': 'en-US',
    },

  })

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <ApolloProvider client={client}>
      <RootStoreProvider value={rootStore}>
        <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
          <RootNavigator
            ref={navigationRef}
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange}
          />
        </SafeAreaProvider>
      </RootStoreProvider>
    </ApolloProvider>
  )
}

export default App
