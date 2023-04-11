import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import { Provider } from 'react-redux'

import Routes from './src/routes/app.routes'
import { store } from './src/store'

export default function App() {
  LogBox.ignoreAllLogs()

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar backgroundColor='#203F6B' barStyle='light-content' />
          <Routes />
        </NavigationContainer>
      </Provider>
    </NativeBaseProvider>
  )
}
