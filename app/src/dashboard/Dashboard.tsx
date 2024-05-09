import React, { CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import TicketTXs from "./ticketTXs";
import PostedJobsChart from "./publishedContractChart";
import WonWallets from "./wonWallets";
import CountDown from "../components/countDown";

const styles = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const VerticalSpacer = () => <span style={{ height: "1em" }} />;

const Dashboard = () => {
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <VerticalSpacer />
        <TicketTXs />
        <VerticalSpacer />
        <PostedJobsChart />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <div style={styles.flex}>
        <TicketTXs />
      </div>
      <div style={styles.singleCol}>
        <PostedJobsChart />
      </div>
      <div style={styles.singleCol}>
        <WonWallets />
      </div>
    </div>
  ) : (
    <>
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={styles.singleCol}>
            <CountDown />
          </div>
          <div style={styles.singleCol}>
            <WonWallets />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <TicketTXs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
