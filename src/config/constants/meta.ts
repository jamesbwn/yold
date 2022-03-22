import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'Safemoney',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by Safemoney), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  let basePath
  if (path.startsWith('/swap')) {
    basePath = '/swap'
  } else if (path.startsWith('/add')) {
    basePath = '/add'
  } else if (path.startsWith('/remove')) {
    basePath = '/remove'
  } else if (path.startsWith('/teams')) {
    basePath = '/teams'
  } else if (path.startsWith('/voting/proposal') && path !== '/voting/proposal/create') {
    basePath = '/voting/proposal'
  } else if (path.startsWith('/nfts/collections')) {
    basePath = '/nfts/collections'
  } else if (path.startsWith('/nfts/profile')) {
    basePath = '/nfts/profile'
  } else if (path.startsWith('/pancake-squad')) {
    basePath = '/pancake-squad'
  } else {
    basePath = path
  }

  switch (basePath) {
    case '/':
      return {
        title: `${t('Home')} `,
      }
    case '/swap':
      return {
        title: `${t('Swap')} `,
      }
    case '/add':
      return {
        title: `${t('Add Liquidity')}`,
      }
    case '/remove':
      return {
        title: `${t('Remove Liquidity')}`,
      }
    case '/liquidity':
      return {
        title: `${t('Liquidity')}`,
      }
    case '/find':
      return {
        title: `${t('Import Pool')}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')}`,
      }
    case '/prediction/leaderboard':
      return {
        title: `${t('Leaderboard')} }`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} }`,
      }
    case '/farms/auction':
      return {
        title: `${t('Farm Auctions')} }`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} }`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} }`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} }`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} }`,
      }
    case '/voting':
      return {
        title: `${t('Voting')} }`,
      }
    case '/voting/proposal':
      return {
        title: `${t('Proposals')} }`,
      }
    case '/voting/proposal/create':
      return {
        title: `${t('Make a Proposal')} }`,
      }
    case '/info':
      return {
        title: `${t('Overview')} | ${t('Safemoney Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/pools':
      return {
        title: `${t('Pools')} | ${t('Safemoney Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/info/tokens':
      return {
        title: `${t('Tokens')} | ${t('Safemoney Info & Analytics')}`,
        description: 'View statistics for Pancakeswap exchanges.',
      }
    case '/nfts':
      return {
        title: `${t('Overview')} }`,
      }
    case '/nfts/collections':
      return {
        title: `${t('Collections')} }`,
      }
    case '/nfts/activity':
      return {
        title: `${t('Activity')} }`,
      }
    case '/nfts/profile':
      return {
        title: `${t('Profile')} }`,
      }
    case '/pancake-squad':
      return {
        title: `${t('Pancake Squad')} }`,
      }
    default:
      return null
  }
}
