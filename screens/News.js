import React from 'react'
import apiKey from '../store'
import {
  Left,Body,Text,Card,Right,Title,Button,Icon,List,
  Toast,Header,Content,CardItem,Container,Spinner,H1,
} from "native-base"

let timer
export default class App extends React.Component {
  state = { news: [], noHope: false }
  componentDidMount = () => {
    this.getNews()
    clearTimeout(timer)
    timer = setTimeout(() => {
      if(this.state.news.length === 0)
        this.setState({noHope: true, news: [0]})
    }, 2000);
  }
  getNews = async () => {
    const ticker = this.props.navigation.getParam('ticker')
    const url = `https://api.intrinio.com/news?api_key=${apiKey}&identifier=${ticker}`
    let res = await fetch(url)
    res = await res.json()
    // console.log(res)
    if(res.data)
      this.setState({news: res.data})
    else
      Toast.show({text: "No news about this company!",buttonText: "Okay",type: "danger"})
  }
  render() {
    const { news } = this.state
    return this.state.news.length === 0 ? (
      <Container><Header><Body><Spinner color="gray" /></Body></Header></Container>
    ) : (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header>
          <Left><Button transparent onPress={() => this.props.navigation.goBack(null)}>
            <Icon name="ios-arrow-back"/><Text>Back</Text>
          </Button></Left>
          <Body><Title>News</Title></Body><Right />
        </Header>
        <Content padder>
          {this.state.noHope ? (
            <Text note style={{alignSelf: 'center'}}>No news available for this company</Text>
          ) : (
            <List dataArray={news}
              renderRow={(item) => (
                <Card>
                  <CardItem style={{flexDirection: 'column', alignItems: 'flex-start',}}>
                    <H1>{item.title}</H1>
                    <Text>{item.summary}</Text>
                    <Text note style={{alignSelf: 'flex-end', marginVertical: 10,}}>
                      {item.publication_date}
                    </Text>
                    <Button full onPress={() => {
                      this.props.navigation.navigate('Browser', {url: item.url, title: item.title})
                    }}>
                      <Text>More</Text>
                    </Button>
                  </CardItem>
                </Card>
              )}>
            </List>
          )}
        </Content>
      </Container>
    )
  }
}