import React from 'react'
import apiKey from '../store'
import {
  Left,Body,Icon,Text,Card,List,Right,Title,Button,Header,Item,
  Input,Content,ListItem,Thumbnail,Container, Spinner,Toast,
} from "native-base"

export default class App extends React.Component {
  state = {
    query: '',
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
    const { page_number, query } = this.state
    let res = await
      fetch(`https://api.intrinio.com/companies?api_key=${apiKey}&page_number=${page_number}&page_size=100&query=${query}`)
    res = await res.json()
    // console.log(res)
    if(res.data)
      this.setState({companies: res.data})
    else
      Toast.show({text: "Something went wrong!",buttonText: "Okay",type: "danger"})
  }
  render() {
    const { page_number, companies, query } = this.state
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header>
          <Left>
            <Button transparent onPress={() => this.paginate(-1)}>
              <Icon name='ios-arrow-back'/>
            </Button>
          </Left>
          <Body><Title>
            {`${(101*page_number)-99-page_number}-${page_number*100}`}
          </Title></Body>
          <Right>
            <Button transparent onPress={() => this.paginate(1)}>
              <Icon name='ios-arrow-forward' />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Item rounded style={{paddingHorizontal: 10, marginVertical: 20}}>
            <Input
              value={query}
              placeholder='Search for a company'
              onChangeText={query => this.setState({query, page_number: 1}, this.getCompanies)}
            />
            <Icon name='ios-search' />
          </Item>
          {companies.length === 0 ? <Spinner color="gray" /> : (
            <List 
              dataArray={companies}
              renderRow={(item) => (
                <ListItem
                  button
                  noBorder
                  thumbnail
                  onPress={() => this.props.navigation.navigate('Info', {ticker: item.ticker})}
                >
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
