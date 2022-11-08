

export const connectWeb3 = () => {
  window.ethereum.request({ method:'eth_requestAccounts' })
  .then((res: any) => {
    // Return the address of the wallet
    console.log(res);
  })
}

export default {};
