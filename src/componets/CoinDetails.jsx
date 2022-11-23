import { Badge, Box, Container, Progress, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import Error from './Error';
import { HStack, RadioGroup, Radio, Text,Image, Button } from '@chakra-ui/react';
import Chart from './Chart';

const CoinDetails = () => {
 
  const [coin, setcoin] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  // const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('pkr');
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
 
const params=useParams();
const CurrencySymbol = currency === "pkr" ? "PKR" : "$";
const btns=["24h","7d","14d","30d","60d","1y","max"]
const switchChart=(key)=>{
switch (key) {
  case "24h":
    setDays("24h")
    setLoading(true)
    break;
  case "7d":
    setDays("7d")
    setLoading(true)
    break;
  case "14d":
    setDays("14d")
    setLoading(true)
    break;
  case "30d":
    setDays("30d")
    setLoading(true)
    break;
  case "60d":
    setDays("60d")
    setLoading(true)
    break;
  case "1y":
    setDays("365d")
    setLoading(true)
    break;
  case "max":
    setDays("max")
    setLoading(true)
    break;

  default:
    setDays("24h")
    setLoading(true)
    break;
}
}



  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        
       const {data:chartData}= await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
       
        setLoading(false)
        setcoin(data);
        setChartArray(chartData.prices);
      
      } catch (error) {
        
        seterror(true);
        setLoading(false);
        
        
      }

    }
    fetchCoin();

  }, [params.id, currency,days])
  if (error) return <Error message={'404 Fetch Error'} />
 
  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : <>
      <Box borderWidth={1} width={"full"}><Chart currency={CurrencySymbol} arr={chartArray} days={days} /></Box>
      <HStack p={'4'} overflowX={"auto"} >
        {
          btns.map((i)=>(
<Button key={i} onClick={()=>switchChart(i)}>
  {i}
</Button>
          )

          )
        }

      </HStack>
      <RadioGroup value={currency} onChange={setCurrency} p={'8'}> 
        <HStack spacing={'4'}>
          <Radio value={'pkr'}>PKR</Radio>
          <Radio value={'usd'}>$</Radio>
        </HStack>
      </RadioGroup>
      <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
        <Text fontSize='small' alignSelf='center' opacity={0.7} >
Last Updated on {Date(coin.market_data.last_updated).split('G')[0]}
        </Text>
        <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'}/>
        <Stat>
          <StatLabel>{coin.name}</StatLabel>
          <StatNumber>{CurrencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
          <StatHelpText>
            <StatArrow type={coin.market_data.price_change_percentage_24h>0 ? "increase" :"decrease"}/>
            {coin.market_data.price_change_percentage_24h}%
          </StatHelpText>
        </Stat>

   <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>
    {`#${coin.market_cap_rank}`}
    </Badge>  
    <CustomBar high={`${CurrencySymbol}${coin.market_data.high_24h[currency]}`} low={`${CurrencySymbol}${coin.market_data.low_24h[currency]}`} />  
<Box w={'full'} p={'4'}>
  <Item title={'Max Supply'} value={coin.market_data.max_supply} />
  <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
  <Item title={'Market Cap'} value={`${CurrencySymbol}${coin.market_data.market_cap[currency]}`} />
  <Item title={'All Time Low'} value={`${CurrencySymbol}${coin.market_data.atl[currency]}`} />
  <Item title={'All Time High'} value={`${CurrencySymbol}${coin.market_data.ath[currency]}`} />

</Box>

      </VStack>


      
      
      </>}

    </Container>
  )
}
const Item=({title,value})=>(
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)


const CustomBar=({high,low})=>(
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'} >
      <Badge children={low} colorScheme={'red'}  />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme={'green'}  />

    </HStack>
  </VStack>
)
export default CoinDetails