import React from 'react'
import styled from 'styled-components'
import { Heading, Flex, Text, useMatchBreakpoints, Button } from '@pancakeswap/uikit'
import { useClaimCallback } from 'hooks/useDvide'

import Otoken from "../../../../assets/o.png"
import BusdYr from "../../../../assets/busdYr.png"


const Row = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: center;
`


const ClaimCardContent: React.FC<{ headingText: string; bodyText: string; highlightColor: string }> = ({
  headingText,
  bodyText,
  highlightColor,
}) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isSmallerScreen = isMobile || isTablet
  const split = headingText.split(' ')
  const lastWord = split.pop()
  const remainingWords = split.slice(0, split.length).join(' ')

  const [onClaim] = useClaimCallback()
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
        Rewards Not Claimed
      </Heading>
      <Row>
          <Text fontSize="24px" style={{marginRight: "12px"}}> 0 </Text>
          <img src={BusdYr} alt='otoken' width="32px" height="32px" />
      </Row>
        <Button style={{marginBottom: "16px"}} onClick={onClaim}> Claim </Button>
      <Row>
          Rewards are automatically sent every 60 minutes. 
          It can, however, take longer depending on your holdings and trading volume. 
          Rewards will be triggered once they are big enough to cover the gas fees. 
          You can also manually claim unclaimed rewards, but you will need to pay the gas fees. 
      </Row>
    </Flex>
  )
}

export default ClaimCardContent
