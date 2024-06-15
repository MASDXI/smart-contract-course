import { useWeb3React } from '@web3-react/core';
import { Contract, ethers, Signer } from 'ethers';
import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState
} from 'react';
import styled from 'styled-components';
import MyTokenArtifact from '../artifacts/contracts/MyToken.sol/MyToken.json';
import { Provider } from '../utils/provider';
import { SectionDivider } from './SectionDivider';

const StyledDeployContractButton = styled.button`
  width: 180px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
  place-self: center;
`;

const StyledGreetingDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 135px 2.7fr 1fr;
  grid-gap: 10px;
  place-self: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 0.4rem 0.6rem;
  line-height: 2fr;
`;

const StyledButton = styled.button`
  width: 150px;
  height: 2rem;
  border-radius: 1rem;
  border-color: blue;
  cursor: pointer;
`;

export function Greeter(): ReactElement {
  const context = useWeb3React<Provider>();
  const { library, active } = context;

  const [signer, setSigner] = useState<Signer>();
  const [myTokenContract, setMyTokenContract] = useState<Contract>();
  const [myTokenContractAddr, setGreeterContractAddr] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('');
  const [tokenNameInput, setTokenNameInput] = useState<string>('');
  const [tokenSymbolInput, setTokenSymbolInput] = useState<string>('');

  useEffect((): void => {
    if (!library) {
      setSigner(undefined);
      return;
    }

    setSigner(library.getSigner());
  }, [library]);

  useEffect((): void => {
    if (!myTokenContract) {
      return ;
    }

    async function getTokenName(myTokenContract: Contract): Promise<void> {
      const _name = await myTokenContract.name();

      if (_name !== name) {
        setName(_name);
      }
    }

    async function getTokenSymbol(myTokenContract: Contract): Promise<void> {
      const _symbol = await myTokenContract.symbol();

      if (_symbol !== symbol) {
        setSymbol(_symbol);
      }
    }

    getTokenName(myTokenContract);
    getTokenSymbol(myTokenContract);
  }, [myTokenContract, name]);

  function handleDeployContract(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (!signer) {
      return;
    }

    async function deployMyTokenContract(signer: Signer, tokenNameInput: string, tokenSymbolInput: string): Promise<void> {

      const MyToken = new ethers.ContractFactory(
        MyTokenArtifact.abi,
        MyTokenArtifact.bytecode,
        signer
      )

      try {
        const myTokenContract = await MyToken.deploy(tokenNameInput, tokenSymbolInput);

        await myTokenContract.deployed();

        const tokenName = await myTokenContract.name();
        const tokenSymbol = await myTokenContract.symbol();

        setMyTokenContract(myTokenContract);
        setName(tokenName);
        setSymbol(tokenSymbol);

        window.alert(`My token deployed to: ${myTokenContract.address}`);

        setGreeterContractAddr(myTokenContract.address);
      } catch (error: any) {
        window.alert(
          'Error!' + (error && error.message ? `\n\n${error.message}` : '')
        );
      }
    }

    deployMyTokenContract(signer, tokenNameInput, tokenSymbolInput);
  }

  function handleTokenNameChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setTokenNameInput(event.target.value);
  }

  function handleTokenSymbolChange(event: ChangeEvent<HTMLInputElement>): void {
    event.preventDefault();
    setTokenSymbolInput(event.target.value);
  }

  return (
    <>
      <StyledGreetingDiv>
        <StyledLabel htmlFor="tokenNameInput">Token Name</StyledLabel>
        <StyledInput
          id="tokenNameInput"
          type="text"
          placeholder={name ? 'name' : '<Contract not yet deployed>'}
          onChange={handleTokenNameChange}
          style={{ fontStyle: name ? 'normal' : 'italic' }}
        ></StyledInput>
        <div></div>
        <StyledLabel htmlFor="tokenSymbolInput">Token Symbol</StyledLabel>
        <StyledInput
          id="tokenSymbolInput"
          type="text"
          placeholder={symbol ? 'symbol' : '<Contract not yet deployed>'}
          onChange={handleTokenSymbolChange}
          style={{ fontStyle: name ? 'normal' : 'italic' }}
        ></StyledInput>
      </StyledGreetingDiv>
      <StyledDeployContractButton
        onClick={handleDeployContract}
      >
        Deploy My Token Contract
      </StyledDeployContractButton>
      <SectionDivider />
      <StyledGreetingDiv>
        <StyledLabel>Contract addr</StyledLabel>
        <div>
          {myTokenContractAddr ? (
            myTokenContractAddr
          ) : (
            <em>{`<Contract not yet deployed>`}</em>
          )}
        </div>
        {/* empty placeholder div below to provide empty first row, 3rd col div for a 2x3 grid */}
        <div></div>
        <StyledLabel>Token name</StyledLabel>
        <div>
          {name ? name : <em>{`<Contract not yet deployed>`}</em>}
        </div>
        {/* empty placeholder div below to provide empty first row, 3rd col div for a 2x3 grid */}
        <div></div>

        <StyledLabel>Token Symbol</StyledLabel>
        <div>
          {symbol ? symbol : <em>{`<Contract not yet deployed>`}</em>}
        </div>
        {/* empty placeholder div below to provide empty first row, 3rd col div for a 2x3 grid */}
        <div></div>
      </StyledGreetingDiv>
    </>
  );
}
