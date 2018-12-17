import React from 'react'
import Home from './screens/Home'
import Info from './screens/Info'
import News from './screens/News'
import Browser from './screens/Browser'
import { createStackNavigator, createAppContainer } from 'react-navigation'

const Root = createStackNavigator(
  {Home,Info,News,Browser},{headerMode: "none"}
)

const Cont = createAppContainer(Root)

export default class App extends React.Component {
  render() {
    return <Cont />
  }
}
