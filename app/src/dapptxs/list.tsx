import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  BooleanField,
  FunctionField,
  TextInput,
} from "react-admin";
import Link from "@mui/material/Link";
import Chip from "@mui/material/Chip";

const ListScreen = () => {
  const isMainnet = process.env.REACT_APP_IS_MAINNET;

  const explorerUrl = isMainnet
    ? process.env.REACT_APP_CARDANO_EXPLORER_MAINNET_URL
    : process.env.REACT_APP_CARDANO_EXPLORER_PREPROD_URL;

  const filters = [
    <TextInput
      label="Text search"
      source="textSearch"
      alwaysOn
      fullWidth
      sx={{ width: 300 }}
    />,
  ];
  return (
    <List
      empty={<></>}
      emptyWhileLoading
      perPage={25}
      sort={{ field: "createdAt", order: "desc" }}
      hasCreate={false}
      resource="audittxs"
      filters={filters}
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="lockAddress" />
        <FunctionField
          label="Lock TxHash"
          render={(record) =>
            record.lockedTxHash ? (
              <>
                {record.lockedTxHash && (
                  <Link
                    href={`${explorerUrl}${record.lockedTxHash}`}
                    target="_blank"
                  >
                    {record.lockedTxHash}
                  </Link>
                )}
              </>
            ) : (
              <p>Transaction submission failed</p>
            )
          }
        />
        <FunctionField
          source="boughtTickets"
          render={(record) =>
            record.boughtTickets.map((item) => (
              <Chip label={item} size="small" />
            ))
          }
        />
        <DateField source="lockDate" showTime label="Bought date" />

        <BooleanField source="isLockSuccess" label="TX status" />
      </Datagrid>
    </List>
  );
};

export default ListScreen;
