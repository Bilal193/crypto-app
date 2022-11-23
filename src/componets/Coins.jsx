import React, { useEffect, useState } from 'react'
import axios from "axios"
import { server } from '../index'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setcoins] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('pkr');

  const CurrencySymbol = currency === "pkr" ? "PKR" : "$"
  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }
  const btns = new Array(100).fill(1);
 

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setcoins(data);
        setLoading(false)
      } catch (error) {
        seterror(true);
        setLoading(false);
      }

    }
    fetchCoins();

  }, [currency, page])
  if (error) return <Error message={'404 Fetch Error'} />


  return (
    <Container maxW={'container.xl'}>
      {loading ? <Loader /> : <>

      <RadioGroup value={currency} onChange={setCurrency} p={'8'}> 
        <HStack spacing={'4'}>
          <Radio value={'pkr'}>PKR</Radio>
          <Radio value={'usd'}>$</Radio>
        </HStack>
      </RadioGroup>
        <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
          {coins.map((i) =>
            <CoinCard id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} key={i.id} CurrencySymbol={CurrencySymbol} />
          )


          }

        </HStack>

        <HStack width={'full'}  p={'8'} overflowX={'auto'}>
         
        {btns.map((item, index) => ( <Button bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)} key={index}>{index+1}</Button> ))}

        </HStack>


      </>}
    </Container>
  )
}

export default Coins