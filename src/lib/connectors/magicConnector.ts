import { ConnectExtension } from '@magic-ext/connect';
import { OAuthExtension, OAuthProvider } from '@magic-ext/oauth';
import { InstanceWithExtensions, SDKBase } from '@magic-sdk/provider';
import { RPCProviderModule } from '@magic-sdk/provider/dist/types/modules/rpc-provider';
import { Chain } from '@wagmi/chains';
import { Address, Connector, normalizeChainId } from '@wagmi/core';
import { ethers, Signer } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import type { AbstractProvider } from 'web3-core';
import { createModal } from '../modal/view';

const IS_SERVER = typeof window === 'undefined';

export interface MagicOptions {
  apiKey: string;
  accentColor?: string;
  isDarkMode?: boolean;
  customLogo?: string;
  customHeaderText?: string;
}

interface UserDetails {
  email: string;
  phoneNumber: string;
  oauthProvider: OAuthProvider;
}

export abstract class MagicConnector extends Connector {
  ready = !IS_SERVER;

  readonly id = 'magic';

  readonly name = 'Magic';

  provider: RPCProviderModule & AbstractProvider;

  isModalOpen = false;

  magicOptions: MagicOptions;
  address: Address;

  protected constructor(config: { chains?: Chain[]; options: MagicOptions }) {
    super(config);
    this.magicOptions = config.options;
  }

  async getAccount(): Promise<Address> {
    return getAddress(this.address);
  }

  async getUserDetailsByForm(
    enableSMSLogin: boolean,
    enableEmailLogin: boolean,
    oauthProviders: OAuthProvider[]
  ): Promise<UserDetails> {
    const output: UserDetails = (await createModal({
      accentColor: this.magicOptions.accentColor,
      isDarkMode: this.magicOptions.isDarkMode,
      customLogo: this.magicOptions.customLogo,
      customHeaderText: this.magicOptions.customHeaderText,
      enableSMSLogin: enableSMSLogin,
      enableEmailLogin: enableEmailLogin || true,
      oauthProviders,
    })) as UserDetails;

    this.isModalOpen = false;
    return output;
  }

  async getProvider() {
    if (this.provider) {
      return this.provider;
    }
    const magic = this.getMagicSDK();
    this.provider = magic.rpcProvider;
    return this.provider;
  }

  signer: Signer;

  async getSigner(): Promise<Signer> {
    const provider = new ethers.providers.Web3Provider(
      await this.getProvider()
    );

    this.signer = provider.getSigner(this.address);
    return this.signer;
  }

  async isAuthorized() {
    const magic = this.getMagicSDK();

    try {
      const loggedIn = await magic.user.isLoggedIn();

      if (loggedIn) {
        const metadata = await magic.user.getMetadata();
        this.address = getAddress(metadata.publicAddress);
      }

      return loggedIn;
    } catch (e) {
      return false;
    }
  }

  protected onAccountsChanged(accounts: string[]): void {
    if (accounts.length === 0) this.emit('disconnect');
    else this.emit('change', { account: getAddress(accounts[0]) });
  }

  protected onChainChanged(chainId: string | number): void {
    const id = normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit('change', { chain: { id, unsupported } });
  }

  protected onDisconnect(): void {
    this.emit('disconnect');
  }

  async disconnect(): Promise<void> {
    const magic = this.getMagicSDK();
    await magic.user.logout();
    this.address = undefined;
  }

  abstract getMagicSDK():
    | InstanceWithExtensions<SDKBase, OAuthExtension[]>
    | InstanceWithExtensions<SDKBase, ConnectExtension[]>;
}
