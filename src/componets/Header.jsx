import { Button, ButtonGroup, HStack} from '@chakra-ui/react'
import React from 'react'
import {Link} from "react-router-dom";


const Header = () => {
  return (
    <HStack p={'4'} shadow={'base'} bgColor={'blackAlpha.900'}>
        <Button   variant={'unstyled'} fontSize={['25px','35px']} me={["15px","70px"]} color={'white'}>
            <Link  to="/">CryptoX</Link>
        </Button>
        <ButtonGroup gap={['1','3','4']}>
        <Button variant={'unstyled'} color={'white'}>
            <Link  to="/">Home</Link>
        </Button>
        <Button variant={'unstyled'} color={'white'}>
            <Link to="/exchanges">Exchanges</Link>

        </Button>
        <Button variant={'unstyled'} color={'white'}>
            <Link to="/coins">Coins</Link>

        </Button>

    </ButtonGroup>
        
    </HStack>
  )
}

export default Header