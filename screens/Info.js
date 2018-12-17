import React from 'react'
import apiKey from '../store'
import { StyleSheet } from 'react-native'
import {
  Left,Body,Text,Card,Right,Title,Button,Icon,
  Header,Content,CardItem,Container,Spinner
} from "native-base"

export default class App extends React.Component {
  state = { info: null }
  componentDidMount = () => this.getInfo()
  getInfo = async () => {
    const ticker = this.props.navigation.getParam('ticker')
    const url = `https://api.intrinio.com/companies?api_key=${apiKey}&identifier=${ticker}`
    let res = await fetch(url)
    res = await res.json()
    if(res) this.setState({info: res})
    else Toast.show({text: "Something went wrong!",buttonText: "Okay",type: "danger"})
    // console.log(res)
  }
  render() {
    const { info } = this.state
    return this.state.info === null ? (
      <Container><Header><Body><Spinner color="gray"/></Body></Header></Container>
    ) : (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header>
          <Left><Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="ios-arrow-back"/><Text>Back</Text>
          </Button></Left>
          <Body><Title>{info.name} ({info.ticker})</Title></Body><Right />
        </Header>
        <Content padder>
          <Card>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Name:</Text>
              <Text note style={styles.infoText2}>{info.name}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>CEO:</Text>
              <Text note style={styles.infoText2}>{info.ceo}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Url:</Text>
              <Text note style={styles.infoText2}>{info.company_url}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Phone:</Text>
              <Text note style={styles.infoText2}>{info.business_phone_no}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Sector:</Text>
              <Text note style={styles.infoText2}>{info.sector}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Address:</Text>
              <Text note style={styles.infoText2}>{info.business_address}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Employees:</Text>
              <Text note style={styles.infoText2}>{info.employees}</Text>
            </CardItem>
            <CardItem style={styles.info}>
              <Text style={styles.infoText1}>Headquarter:</Text>
              <Text note style={styles.infoText2}>{info.hq_state}, {info.hq_country}</Text>
            </CardItem>
          </Card>
          <Card><CardItem><Text note>{info.long_description}</Text></CardItem></Card>
          <Card transparent/><Card transparent/>
          <Button block onPress={() => this.props.navigation.navigate('News', {ticker: info.ticker})}>
            <Text>Company News</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  info: {justifyContent: 'space-between'},
  infoText1: {
    fontSize: 14,
    color: '#444',
    fontWeight: '600',
  },
  infoText2: {
    width: '70%',
    textAlign: 'right',
  }
})
