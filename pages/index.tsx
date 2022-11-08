import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import styles from '../styles/Home.module.css';

import useWeb3 from '../hooks/useWeb3';

export default function Home() {

  const { web3, ethereum, connectWeb3 } = useWeb3({
    connect: false,
  });


  const token = {
    address: '0x43D12372F26C3Ba6b17412E286178844727Cc85c',
    symbol: 'TGT8532',
    abi: [{
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "type": "function"
    }]
  }

  useEffect(() => {
    if (web3 && ethereum.address) {
      web3.eth.getBalance(ethereum.address)
      .then((response: any) => {
        let balance = web3.utils.fromWei(response, 'ether');
        console.log(balance);
      });

      // The way to interact with smart contracts (showing balanceOf a token)
      const tokenInst = new web3.eth.Contract(token.abi, token.address);
      tokenInst.methods.balanceOf(ethereum.address).call()
      .then((response: any) => {
        console.log(web3.utils.fromWei(response) + ' ' + token.symbol);
      });
    }
  }, [web3, ethereum.address]);


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
        {
          ethereum.address === '' ? (
            <Button variant="contained" onClick={connectWeb3}>Connect MetaMask</Button>
          ):
          (
            <Box>
              <p>Address: {ethereum.address}</p>
              <p>Balance: {ethereum.balance}</p>
            </Box>
          )
        }

      </main>
    </div>
  )
}
