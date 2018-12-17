import React from 'react'
import { WebView } from 'react-native'
import {Left,Body,Text,Right,Title,Button,Icon,Header,Container} from "native-base"

export default class App extends React.Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header>
          <Left><Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="ios-arrow-back"/><Text>Back</Text>
          </Button></Left>
          <Body><Title>{this.props.navigation.getParam('title')}</Title></Body><Right />
        </Header>
        <WebView source={{url: this.props.navigation.getParam('url')}}/>
      </Container>
    )
  }
}