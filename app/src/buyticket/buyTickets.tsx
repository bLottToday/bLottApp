import React from "react";
import SmartContractAudit from "../components/contractLockUnlock";
import { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import {
  CardanoWallet,
  useWallet,
  Transaction,
  Data,
} from "../components/utils";
import { useCreate } from "react-admin";
import { script, scriptAddrMainnet } from "../components/sampleContract";

const SmartContracts = () => {
  const [amountToLock, setAmountToLock] = React.useState(0);
  const [ticket, setSelectedTickets] = React.useState<string[]>([]);

  const handleChangeTicket = (event: SelectChangeEvent<typeof ticket>) => {
    const {
      target: { value },
    } = event;
    setSelectedTickets(typeof value === "string" ? value.split(",") : value);
    setAmountToLock(5 * value.length);
  };

  const [create, { isLoading, error }] = useCreate();

  const { wallet, connected, connecting } = useWallet();

  React.useEffect(() => {
    setNotification({
      ...notification,
      message:
        wallet && connected
          ? null
          : "No connected wallet, please connect a wallet first",
    });
  }, [connected, wallet]);

  const [notification, setNotification] = React.useState({
    error: false,
    message: "",
  });

  const [receiveAddress, setReiveAddress] = React.useState("");

  const handleReceiveAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReiveAddress(event.target.value);
  };

  const lockFunction = async () => {
    const validateMessage = !scriptAddrMainnet
      ? "No smart contract address, please select a smart contract"
      : !wallet || !connected
      ? "No connected wallet, please connect wallet first"
      : null;

    if (!scriptAddrMainnet || !wallet || !connected) {
      setNotification({ ...notification, message: validateMessage });
      return;
    }
    const lockAddress = await wallet.getChangeAddress();

    const d: Data = {
      alternative: 0,
      fields: ["3f3ae5a82bef686ea78229d485347a46acb0e2fa42d7a341db6f5638"],
    };
    const amountToLockLoveLace = (amountToLock * 1000000).toString();

    console.log(amountToLockLoveLace, d, scriptAddrMainnet, lockAddress);

    if (wallet && connected && amountToLock) {
      const tx = new Transaction({ initiator: wallet });
      tx.sendLovelace(
        {
          address: scriptAddrMainnet,
          datum: {
            value: d,
            inline: true,
          },
        },
        amountToLockLoveLace
      );

      let txHash = "";

      try {
        const unsignedTx = await tx.build();
        const signedTx = await wallet.signTx(unsignedTx);
        txHash = await wallet.submitTx(signedTx);
      } catch (e) {
        setNotification({
          ...notification,
          message: "Transaction is failed",
        });
        create("dapptxs", {
          data: {
            amount: amountToLock,
            scriptAddress: scriptAddrMainnet,
            assetName: "Ada",
            isLockSuccess: false,
            boughtTickets: ticket,
            lockAddress: lockAddress,
          },
        });
        return;
      }

      setNotification({
        ...notification,
        message: txHash ? `Transaction is submmited: ${txHash}` : null,
      });
      create("dapptxs", {
        data: {
          amount: amountToLock,
          scriptAddress: scriptAddrMainnet,
          assetName: "Ada",
          isLockSuccess: true,
          lockedTxHash: txHash,
          boughtTickets: ticket,
          lockAddress: lockAddress,
        },
      });
      console.log("txHash", txHash, new Date());
    }
  };

  return (
    <Box sx={{ mt: 0, display: "flex", flex: 1, flexDirection: "column" }}>
      <Box sx={{ mt: 0, display: "flex", flex: 1, flexDirection: "row" }}>
        <SmartContractAudit
          scriptAddress={scriptAddrMainnet}
          handleReceiveAddressChange={handleReceiveAddressChange}
          contract={script}
          lockFunction={lockFunction}
          amountToLock={amountToLock}
          receiveAddress={receiveAddress}
          notification={notification}
          ticket={ticket}
          handleChangeTicket={handleChangeTicket}
        ></SmartContractAudit>
        <CardanoWallet />
      </Box>
    </Box>
  );
};

export default SmartContracts;
