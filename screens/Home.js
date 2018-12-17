import React from 'react'
import apiKey from '../store'
import { StyleSheet } from 'react-native'
import {
  Left,Body,Icon,Text,Card,List,Right,Title,Button,Header,
  Content,CardItem,ListItem,Thumbnail,Container, Spinner,Toast,
} from "native-base"

export default class App extends React.Component {
  state = {
    companies: [],
    page_number: 1,
    result_count: 0,
  }
  componentDidMount = () => this.getCompanies()
  paginate = n => {
    if(this.state.page_number !== 1 || n !== -1)
      this.setState({page_number: this.state.page_number + n, companies: []}, () => this.getCompanies())
  }
  getCompanies = async () => {
    const { page_number } = this.state
    let res = await fetch(`https://api.intrinio.com/companies?api_key=${apiKey}&page_number=${page_number}&page_size=100`)
    res = await res.json()
    // console.log(res)
    if(res.data)
      this.setState({companies: res.data, result_count: res.result_count})
    else
      Toast.show({text: "Something went wrong!",buttonText: "Okay",type: "danger"})
  }
  render() {
    const { page_number, companies, result_count } = this.state
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header><Left /><Body><Title>AzikInfo</Title></Body><Right /></Header>
        <Content padder>
          <Card><CardItem><Body style={styles.card}>
            <Button light onPress={() => this.paginate(-1)}>
              <Icon name='ios-arrow-back'/>
            </Button>
            <Text>
              {`${(101*page_number)-99-page_number}-${page_number*100} of ${result_count}`}
            </Text>
            <Button light onPress={() => this.paginate(1)}>
              <Icon name='ios-arrow-forward' />
            </Button>
          </Body></CardItem></Card>
          {companies.length === 0 ? <Spinner color="gray" /> : (
            <List dataArray={this.state.companies}
              renderRow={(item) => (
                <ListItem thumbnail noBorder button onPress={() => this.props.navigation.navigate('Info', {ticker: item.ticker})}>
                  <Left>
                    <Thumbnail source={{uri: `https://api.adorable.io/avatars/20/${item.ticker}@adorable.png`}}/>
                  </Left>
                  <Body><Text>{item.name}</Text><Text note>ID: {item.ticker}</Text></Body>
                  <Right><Icon name="ios-arrow-forward" /></Right>
                </ListItem>
              )}>
            </List>
          )}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
