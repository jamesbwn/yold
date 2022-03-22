import React from 'react'
import styled from 'styled-components'
import { Heading, Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useGetBusdBalance, useEarnBalance, useGetCakeBalance} from 'hooks/useDvide'
import tokens from 'config/constants/tokens'
import useTokenBalance, { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance, formatBigNumber } from 'utils/formatBalance'

import Otoken from "../../../../assets/o.png"
import BusdYr from "../../../../assets/busdYr.png"

// import o from "../../../../assets/o.png"

const Row = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: center;
`

const Divider = styled.div`
  border: 2px solid #ba6300;
  margin-bottom: 16px;
`


const StatCardContent: React.FC<{ headingText: string; bodyText: string; highlightColor: string }> = ({
  headingText,
  bodyText,
  highlightColor,
}) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmallerScreen = isMobile || isTablet
  const split = headingText.split(' ')
  const lastWord = split.pop()
  const remainingWords = split.slice(0, split.length).join(' ')
  const { balance: cakeBalance } = useTokenBalance(tokens.cake.address)
  const { balance: busdBalance } = useTokenBalance(tokens.busd.address)
  const eanredBalance =  useEarnBalance()
  console.log('debug cakeBalance', cakeBalance, busdBalance)
  return (
    <Flex
      minHeight={[null, null, null, '168px']}
      minWidth="232px"
      width="400px"
      flexDirection="column"
      justifyContent="flex-end"
      mt={[null, null, null, '64px']}
    >
      <Heading color={highlightColor} scale="xl" mb="24px">
        Your Wallet
      </Heading>
      <Row>
          <Text fontSize="24px" style={{marginRight: "12px"}}> {cakeBalance? getFullDisplayBalance(cakeBalance, 9, 3)  : '0'} </Text>
          <img src={Otoken} alt='otoken' width="32px" height="32px" />
      </Row>
      <Row>
        <Text fontSize="24px" style={{marginRight: "12px"}}> {busdBalance?  getFullDisplayBalance(busdBalance, 18, 3): '0'} </Text>
        <img src={BusdYr} alt='otoken' width="32px" height="32px" />
      </Row>
      <Divider />
      <Heading size="xl" mb="24px">
        Total Earned
      </Heading>
      <Row>
        <Text fontSize="24px" style={{marginRight: "12px"}}> {eanredBalance? getFullDisplayBalance(eanredBalance, 18, 3) : '0'} </Text>
        <img src={BusdYr} alt='otoken' width="32px" height="32px" />
      </Row>
    </Flex>
  )
}

export default StatCardContent
