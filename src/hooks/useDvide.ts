import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { TransactionResponse } from '@ethersproject/providers'
import tokens from 'config/constants/tokens'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBep20Contract, getCakeContract, getDivideContract } from 'utils/contractHelpers'
import { simpleRpcProvider } from 'utils/providers'
import { logError } from 'utils/sentry'
import useActiveWeb3React from './useActiveWeb3React'
import { useCallWithGasPrice } from './useCallWithGasPrice'
import { useTokenContract, useDivide } from './useContract'
import useLastUpdated from './useLastUpdated'
import { useFastFresh, useSlowFresh } from './useRefresh'
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks'
import { calculateGasMargin } from '../utils'

type UseTokenBalanceState = {
  balance: BigNumber
  fetchStatus: FetchStatus
}

export enum FetchStatus {
  NOT_FETCHED = 'not-fetched',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  })
  const { account } = useWeb3React()
  const fastRefresh = useFastFresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress)
      try {
        const res = await contract.balanceOf(account)
        setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS })
      } catch (e) {
        console.error(e)
        setBalanceState((prev) => ({
          ...prev,
          fetchStatus: FAILED,
        }))
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, fastRefresh, SUCCESS, FAILED])

  return balanceState
}


export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED)
  const [balance, setBalance] = useState(ethers.BigNumber.from(0))
  const { account } = useWeb3React()
  const { lastUpdated, setLastUpdated } = useLastUpdated()

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const walletBalance = await simpleRpcProvider.getBalance(account)
        setBalance(walletBalance)
        setFetchStatus(FetchStatus.SUCCESS)
      } catch {
        setFetchStatus(FetchStatus.FAILED)
      }
    }

    if (account) {
      fetchBalance()
    }
  }, [account, lastUpdated, setBalance, setFetchStatus])

  return { balance, fetchStatus, refresh: setLastUpdated }
}

export const useGetCakeBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(tokens.cake.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: ethers.BigNumber.from(balance.toString()), fetchStatus }
}

export const useGetBusdBalance = () => {
  const { balance, fetchStatus } = useTokenBalance(tokens.busd.address)

  // TODO: Remove ethers conversion once useTokenBalance is converted to ethers.BigNumber
  return { balance: ethers.BigNumber.from(balance.toString()), fetchStatus }
}

export const useEarnBalance = () => {
  const slowRefresh = useSlowFresh()
  const { account } = useActiveWeb3React()
  const [earnSupply, setEarnedSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchEarnedSupply() {
      const divideContract = getDivideContract()
      const supply = await divideContract.getUnpaidEarnings(account)
      setEarnedSupply(new BigNumber(supply.toString()))
    }

    fetchEarnedSupply()
  }, [slowRefresh, account])

  return earnSupply
}


export const useTotalDistributed = () => {
  const slowRefresh = useSlowFresh()
  const [totalDistributed, setTotalDistributed] = useState<BigNumber>()

  useEffect(() => {
    async function fetchEarnedSupply() {
      const divideContract = getDivideContract()
      const supply = await divideContract.totalDistributed()
      setTotalDistributed(new BigNumber(supply.toString()))
    }

    fetchEarnedSupply()
  }, [slowRefresh])

  return totalDistributed
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useClaimCallback(
): [() => Promise<void>] {
  const { account } = useActiveWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()


  const divideContract = useDivide()
  const addTransaction = useTransactionAdder()

  const claim = useCallback(async (): Promise<void> => {

    let useExact = false

    const estimatedGas = await divideContract.estimateGas.claimDividend().catch(() => {
      // general fallback for tokens who restrict approval amounts
      useExact = true
      return divideContract.estimateGas.claimDividend()
    })

    // eslint-disable-next-line consistent-return
    return callWithGasPrice(
      divideContract,
      'claimDividend',
      [],
      {
        gasLimit: calculateGasMargin(estimatedGas),
      },
    )
      .then((response: TransactionResponse) => {
        addTransaction(response, {
          summary: `claim dividend`,
          claim: {recipient: account},
        })
      })
      .catch((error: Error) => {
        logError(error)
        console.error('Failed to approve token', error)
        throw error
      })
  }, [divideContract, account, addTransaction, callWithGasPrice])

  return [claim]
}


export default useTokenBalance
