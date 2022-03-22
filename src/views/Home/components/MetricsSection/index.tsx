import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading, Flex, Text, Skeleton, ChartIcon, CommunityIcon, SwapIcon, EarnIcon, Input, Button, Card } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import copy from 'copy-to-clipboard';
import useToast from 'hooks/useToast'
import { useGetStats } from 'hooks/api'
import useTheme from 'hooks/useTheme'
import { formatLocalisedCompactNumber, formatBigNumber, getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useTotalDistributed } from 'hooks/useDvide';
import IconCard, { IconCardData } from '../IconCard'
import StatCardContent from './StatCardContent'
import ClaimCardContent from './ClaimCardContent'
import GradientLogo from '../GradientLogoSvg'

import WallPaper from '../../../../assets/title.png'
import BUSD from '../../../../assets/busd.png'
import Book from '../../../../assets/book.png'

// Values fetched from bitQuery effective 6/9/21
const txCount = 30841921
const addressCount = 2751624


const InputWrapper = styled.div`
  padding-left: 128px;
  padding-right: 128px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`

const RewardWrapper = styled.div`
  display: block;
  text-align: center;
  position: relative;
`

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 16px;
`

const ResImg = styled.div`
  height: 600px;
  background: transparent;
  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('title.png');
    background-repeat: no-repeat;
    background-size: 100%;
    width: 975px;
    height: 645px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 1154px;
    height: 754px;
  }

`

const StyledImg = styled.img`
  width: 100vw;
  height: auto;
`


const CenterTxt = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  text-align: center;
  color: #F4EEFF;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 100%;
    color: black;
  }
`

const StyledH1 = styled.h1`
  color: #ba6300;
  font-size: 54px;
  font-weight: 600;Blue
  line-height: 1.5;
`


const Row = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 16px;
  padding-left: 5px;
  padding-right: 5px;
  justify-content: center;
`
const RewardContainer = styled(Card)`
  width: 100%;
  height: auto;
  text-align: center;
  margin-top: 16px;
  max-width: 932px;
  ${({ theme }) => theme.mediaQueries.xl} {
    width: 100%;
  }
`

const Stats = () => {
  const { t } = useTranslation()
  const data = useGetStats()
  const { theme } = useTheme()
  const [text, setText] = useState(t("Copy"));
  const { toastSuccess } = useToast()

  const { account } = useActiveWeb3React()
  const tvlString = data ? formatLocalisedCompactNumber(data.tvl) : '-'
  const trades = formatLocalisedCompactNumber(txCount)
  const users = formatLocalisedCompactNumber(addressCount)

  const tvlText = t('And those users are now entrusting the platform with over $%tvl% in funds.', { tvl: tvlString })
  const [entrusting, inFunds] = tvlText.split(tvlString)

  const UsersCardData: IconCardData = {
    icon: <CommunityIcon color="secondary" width="36px" />,
  }

  const TradesCardData: IconCardData = {
    icon: <EarnIcon color="primary" width="36px" />,
  }

  const StakedCardData: IconCardData = {
    icon: <ChartIcon color="failure" width="36px" />,
  }


  const onCopy1 = () => {
      // let address;
      // if(id === 1) {
      //   address = '0xc001bbe2b87079294c63ece98bdd0a88d761434e';
      // }
      // else if(id === 2) {
      //   address = '0xc001bbe2b87079294c63ece98bdd0a88d761434e';
      // }

      copy('0xc001bbe2b87079294c63ece98bdd0a88d761434e');

      setText(t("Copied"));
      toastSuccess('', t('Copied'))
      setTimeout(() => { 
          setText(t("Copy")); 
      }, 1000);
  }

  const onCopy2 = () => {
    // let address;
    // if(id === 1) {
    //   address = '0xc001bbe2b87079294c63ece98bdd0a88d761434e';
    // }
    // else if(id === 2) {
    //   address = '0xc001bbe2b87079294c63ece98bdd0a88d761434e';
    // }

    copy('0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56');

    setText(t("Copied"));
    toastSuccess('', t('Copied'))
    setTimeout(() => { 
        setText(t("Copy")); 
    }, 1000);
}

  const total = useTotalDistributed()

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Heading textAlign="center" scale="xl">
        {t('Please invest to earn reward')}
      </Heading>
      <Heading textAlign="center" scale="md" mb="32px">
        {account}
      </Heading>
      {/* <InputWrapper>
        <Input placeholder='Wallet Address' />
      </InputWrapper> */}
      <Flex flexDirection={['column', null, null, 'row']}>
        <IconCard {...UsersCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <StatCardContent
            headingText={t('%users% users', { users })}
            bodyText={t('in the last 30 days')}
            highlightColor={theme.colors.secondary}
          />
        </IconCard>
        <IconCard {...TradesCardData} mr={[null, null, null, '16px']} mb={['16px', null, null, '0']}>
          <ClaimCardContent
            headingText={t('%trades% trades', { trades })}
            bodyText={t('made in the last 30 days')}
            highlightColor={theme.colors.primary}
          />
        </IconCard>
        {/* <IconCard {...StakedCardData}>
          <StatCardContent
            headingText={t('$%tvl% staked', { tvl: tvlString })}
            bodyText={t('Total Value Locked')}
            highlightColor={theme.colors.failure}
          />
        </IconCard> */}
      </Flex>
      {/* <Flex flexDirection={['column', null, null, 'row']}>
        <Card> */}
          {/* <ImgWrapper>
            <ResImg />
          </ImgWrapper> */}
          {/* <StyledImg src={WallPaper} width='600px' height='397px' /> */}
          {/* <CenterTxt> */}
          <RewardContainer>
              <StyledH1>Rewards Distributed To Holders</StyledH1>
              <Row>
                <h1> {total ? getBalanceNumber(total) : '0'} </h1>
                <img src={BUSD} alt='busd'width='100px' height='100px' />
              </Row>
              <Row>
                <img src={Book} alt='Book'width='30px' height='30px' />
                <div style={{display: 'block', textAlign: 'left'}}>
                  <h1> ERC Contract</h1>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1> 0xc001bbe2b87079294c63ece98bdd0a88d761434e</h1>
                    <Button color="text" onClick={onCopy1}>{text}</Button>
                  </div>
                </div>
              </Row>
              <Row>
                <img src={Book} alt='Book'width='30px' height='30px' />
                <div style={{display: 'block', textAlign: 'left'}}>
                  <h1> BUSD Contract</h1>
                  <div style={{display: 'flex', alignItems: 'center'}}>
                    <h1> 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56</h1>
                    <Button color="text" onClick={onCopy2}>{text}</Button>
                  </div>
                </div>
              </Row>
              <Row>
                <h1> Privacy Policy </h1>
                <h1> Terms Of Use </h1>
                <h1> Copyright® 2022 YOLD. All rights reserved. </h1>
              </Row>
            </RewardContainer>
          {/* </CenterTxt> */}
        {/* </Card>
      </Flex> */}
    </Flex>
  )
}

export default Stats
