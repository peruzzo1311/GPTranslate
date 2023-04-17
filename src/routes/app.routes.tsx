import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Home from '../pages/Home'

const Stack = createNativeStackNavigator()

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
