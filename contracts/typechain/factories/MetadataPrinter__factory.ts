/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MetadataPrinter,
  MetadataPrinterInterface,
} from "../MetadataPrinter";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
    ],
    name: "metadata",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610ff1806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063e3684e3914610030575b600080fd5b61004361003e3660046109d2565b610059565b6040516100509190610a1b565b60405180910390f35b6040805180820182526000808252606060208301819052925163e3684e3960e01b815260048101859052339291908190819081908190879063e3684e3990602401600060405180830381865afa1580156100b7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526100df9190810190610b08565b50945094509450945094506100f386610224565b6040805180820190915260048152636e616d6560e01b602082015290965061011d9087908761024d565b60408051808201909152600b81526a3232b9b1b934b83a34b7b760a91b602082015290965061014e9087908661024d565b604080518082019091526005815264696d61676560d81b60208201529096506101799087908561024d565b60408051808201909152600d81526c185b9a5b585d1a5bdb97dd5c9b609a1b60208201529096506101ac9087908461024d565b60408051808201909152600b81526a1e5bdd5d1d589957dd5c9b60aa1b60208201529096506101dd9087908361024d565b95506101e8866102f3565b95506101f78660200151610316565b6040516020016102079190610be9565b604051602081830303815290604052975050505050505050919050565b60408051808201909152600081526060602082015261024782607b60f81b610469565b92915050565b604080518082019091526000815260606020820152600061026d8361050a565b90506000856000015112156102b35760208086015160405161029992600b60fa1b918891869101610c2e565b60408051601f1981840301815291905260208601526102e0565b6020808601516040516102ca928791859101610caa565b60408051601f1981840301815291905260208601525b8451600160ff1b17855250929392505050565b60408051808201909152600081526060602082015261024782607d60f81b610967565b6060815160000361033557505060408051602081019091526000815290565b6000604051806060016040528060408152602001610f7c60409139905060006003845160026103649190610d2c565b61036e9190610d44565b610379906004610d66565b67ffffffffffffffff81111561039157610391610a4e565b6040519080825280601f01601f1916602001820160405280156103bb576020820181803683370190505b509050600182016020820185865187015b80821015610427576003820191508151603f8160121c168501518453600184019350603f81600c1c168501518453600184019350603f8160061c168501518453600184019350603f81168501518453506001830192506103cc565b505060038651066001811461044357600281146104565761045e565b603d6001830353603d600283035361045e565b603d60018303535b509195945050505050565b6040805180820190915260008152606060208201528251600013156104bd576020808401516040516104a392600b60fa1b91869101610d85565b60408051601f1981840301815291905260208401526104e8565b6020808401516040516104d292859101610db8565b60408051601f1981840301815291905260208401525b82516001600160ff1b03168084528361050082610de7565b9052509192915050565b6060816000805b82518110156106e4578251601760fa1b9084908390811061053457610534610e06565b01602001516001600160f81b0319160361055157600191506106e4565b8251601160f91b9084908390811061056b5761056b610e06565b01602001516001600160f81b0319160361058857600191506106e4565b8251602f60f81b908490839081106105a2576105a2610e06565b01602001516001600160f81b031916036105bf57600191506106e4565b8251600960f81b908490839081106105d9576105d9610e06565b01602001516001600160f81b031916036105f657600191506106e4565b8251600360fa1b9084908390811061061057610610610e06565b01602001516001600160f81b0319160361062d57600191506106e4565b8251600560f91b9084908390811061064757610647610e06565b01602001516001600160f81b0319160361066457600191506106e4565b8251600d60f81b9084908390811061067e5761067e610e06565b01602001516001600160f81b0319160361069b57600191506106e4565b8251600160fb1b908490839081106106b5576106b5610e06565b01602001516001600160f81b031916036106d257600191506106e4565b806106dc81610e1c565b915050610511565b50806106f257509192915050565b60005b825181101561095f578251601760fa1b9084908390811061071857610718610e06565b01602001516001600160f81b03191603610753578360405160200161073d9190610e2e565b604051602081830303815290604052935061094d565b8251601160f91b9084908390811061076d5761076d610e06565b01602001516001600160f81b03191603610792578360405160200161073d9190610e54565b8251602f60f81b908490839081106107ac576107ac610e06565b01602001516001600160f81b031916036107d1578360405160200161073d9190610e7a565b8251600960f81b908490839081106107eb576107eb610e06565b01602001516001600160f81b03191603610810578360405160200161073d9190610ea0565b8251600360fa1b9084908390811061082a5761082a610e06565b01602001516001600160f81b0319160361084f578360405160200161073d9190610ec6565b8251600560f91b9084908390811061086957610869610e06565b01602001516001600160f81b0319160361088e578360405160200161073d9190610eec565b8251600d60f81b908490839081106108a8576108a8610e06565b01602001516001600160f81b031916036108cd578360405160200161073d9190610f12565b8251600160fb1b908490839081106108e7576108e7610e06565b01602001516001600160f81b0319160361090c578360405160200161073d9190610f38565b8383828151811061091f5761091f610e06565b602001015160f81c60f81b60405160200161093b929190610db8565b60405160208183030381529060405293505b8061095781610e1c565b9150506106f5565b505050919050565b60408051808201909152600081526060602082015260208084015160405161099192859101610db8565b60408051808303601f1901815291905260208401528251600160ff1b178084526001600160ff1b0316156109cb5782518361050082610f5e565b5090919050565b6000602082840312156109e457600080fd5b5035919050565b60005b83811015610a065781810151838201526020016109ee565b83811115610a15576000848401525b50505050565b6020815260008251806020840152610a3a8160408501602087016109eb565b601f01601f19169190910160400192915050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112610a7557600080fd5b815167ffffffffffffffff80821115610a9057610a90610a4e565b604051601f8301601f19908116603f01168101908282118183101715610ab857610ab8610a4e565b81604052838152866020858801011115610ad157600080fd5b610ae28460208301602089016109eb565b9695505050505050565b80516001600160a01b0381168114610b0357600080fd5b919050565b60008060008060008060c08789031215610b2157600080fd5b865167ffffffffffffffff80821115610b3957600080fd5b610b458a838b01610a64565b97506020890151915080821115610b5b57600080fd5b610b678a838b01610a64565b96506040890151915080821115610b7d57600080fd5b610b898a838b01610a64565b95506060890151915080821115610b9f57600080fd5b610bab8a838b01610a64565b94506080890151915080821115610bc157600080fd5b50610bce89828a01610a64565b925050610bdd60a08801610aec565b90509295509295509295565b7f646174613a6170706c69636174696f6e2f6a736f6e3b6261736536342c000000815260008251610c2181601d8501602087016109eb565b91909101601d0192915050565b60008551610c40818460208a016109eb565b6001600160f81b03198616908301908152601160f91b600182018190528551610c70816002850160208a016109eb565b63111d101160e11b600293909101928301528451610c958160068501602089016109eb565b60069201918201526007019695505050505050565b60008451610cbc8184602089016109eb565b601160f91b9083018181528551909190610cdd816001850160208a016109eb565b63111d101160e11b600193909101928301528451610d028160058501602089016109eb565b600592019182015260060195945050505050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610d3f57610d3f610d16565b500190565b600082610d6157634e487b7160e01b600052601260045260246000fd5b500490565b6000816000190483118215151615610d8057610d80610d16565b500290565b60008451610d978184602089016109eb565b6001600160f81b031994851692019182525091166001820152600201919050565b60008351610dca8184602088016109eb565b6001600160f81b0319939093169190920190815260010192915050565b60006001600160ff1b018201610dff57610dff610d16565b5060010190565b634e487b7160e01b600052603260045260246000fd5b600060018201610dff57610dff610d16565b60008251610e408184602087016109eb565b61171760f21b920191825250600201919050565b60008251610e668184602087016109eb565b612e1160f11b920191825250600201919050565b60008251610e8c8184602087016109eb565b615c2f60f01b920191825250600201919050565b60008251610eb28184602087016109eb565b61171d60f21b920191825250600201919050565b60008251610ed88184602087016109eb565b612e3360f11b920191825250600201919050565b60008251610efe8184602087016109eb565b612e3760f11b920191825250600201919050565b60008251610f248184602087016109eb565b612e3960f11b920191825250600201919050565b60008251610f4a8184602087016109eb565b612e3160f11b920191825250600201919050565b6000600160ff1b8201610f7357610f73610d16565b50600019019056fe4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa264697066735822122064d62fa6c91fe3b504f0203ee68373d29318c5960745328323d54826d8c3dcaa64736f6c634300080e0033";

export class MetadataPrinter__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MetadataPrinter> {
    return super.deploy(overrides || {}) as Promise<MetadataPrinter>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): MetadataPrinter {
    return super.attach(address) as MetadataPrinter;
  }
  connect(signer: Signer): MetadataPrinter__factory {
    return super.connect(signer) as MetadataPrinter__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MetadataPrinterInterface {
    return new utils.Interface(_abi) as MetadataPrinterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MetadataPrinter {
    return new Contract(address, _abi, signerOrProvider) as MetadataPrinter;
  }
}