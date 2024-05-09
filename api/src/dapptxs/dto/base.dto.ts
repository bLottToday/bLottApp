export class BaseAuditTxDto {
  boughtTickets: number[];
  lockAddress: string;
  unlockAddress: string;
  receiverAddress: string;
  assetName: string;
  amount: number;
  lockedTxHash: string;
  unlockedTxHash: string;
  lockDate: Date;
  unlockDate: Date;
  isLockSuccess: boolean;
  isUnlockSuccess: boolean;
  datum: any;
  redeemer: any;
  contractAddress: string;
  description: string;
}
