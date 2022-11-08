import { useState, useEffect, use } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';


declare global {
  interface Window{
    ethereum?: any;
  }
}

const ethRequest = (payload: any, funcSuccess: any) => {
  window.ethereum.request(payload)
  .then((response: any) => {
    funcSuccess(response);
  })
}

const useWeb3 = (init: any) => {
  const [ethereum, setEthereum] = useState<any>({
    address: '',
    balance: '',
    isConnected: false,
  });

  const connectWeb3 = () => {
    let payload: any = {
      method: 'eth_requestAccounts'
    }
    ethRequest(payload, (response: any) => {
      if (response.length > 0) {
        setEthereum({
          ...ethereum,
          address: response[0],
        })
      }
    })
  }

  useEffect(() => {
    setEthereum({
      ...ethereum,
      ...window.ethereum,
    });

    // Connect to Web3
    if (init.connect){
      connectWeb3();
    }
  }, []);

  useEffect(() => {
    // get balance
    if (ethereum.address !== '') {
      let payload = {
        method:'eth_getBalance',
        params: [ethereum.address, 'latest']
      }
      ethRequest(payload, (response: any) => {
        setEthereum({
          ...ethereum,
          balance: ethers.utils.formatEther(response),
        })
      })
    }
  }, [ethereum.address])


  /* web3.js */
  const [web3, setWeb3] = useState<any>(null);
  useEffect(() => {
    setWeb3(new Web3(window.ethereum));
  }, []);

  useEffect(() => {
    if (web3) {
      web3.eth.getBalance("0xfd8215d1622f71ACE599eaCB291Ece9B19EA5aB9")
      .then((response: any) => {
        let balance = web3.utils.fromWei(response, 'ether');
      });
    }
  }, [web3]);

  return {
    web3: web3,
    ethereum: ethereum,
    connectWeb3: connectWeb3,
  }

}

export default useWeb3;
