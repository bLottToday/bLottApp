import moment from "moment";

function randomString(length) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const fakeAddress = () => "addr" + randomString(10) + "..." + randomString(30);

const fakeFullAddress = () => "addr" + randomString(10) + randomString(99);
const fakeTx = () => randomString(10) + "..." + randomString(20);
const fakeFullTx = () => randomString(64);

function randomNumber(length) {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const getRandomInt = (max) => {
  return 1 + Math.floor(Math.random() * max);
};

const attendedWallets = () => {
  return 500 + Math.floor(Math.random() * 500);
};

const fakePrize = () => {
  return (100000 + Math.floor(Math.random() * 500000)).toLocaleString("en-US");
};

const genDays = () => {
  const days = [];
  for (let i = 0; i < 30; i++) {
    const day = moment().subtract(i, "day").format("MM-DD-YYYY").toString();
    days.push(day);
  }
  return days;
};

const wonWallets = () => {
  const days = genDays();
  return days.map((i) => ({
    date: i,
    wallet: fakeAddress(),
    ticketNumber: randomNumber(6),
    amount: fakePrize(),
  }));
};

const ticketTxs = () => {
  let result = [];

  for (let i = 0; i < 30; i++) {
    const numberOfTickets = getRandomInt(5);
    let tickets = randomNumber(6);
    for (let i = 0; i < numberOfTickets; i++) {
      tickets = tickets + ", " + randomNumber(6);
    }

    result.push({
      tx: fakeTx(),
      tickets: tickets,
      wallet: fakeAddress(),
    });
  }

  return result;
};

export {
  wonWallets,
  ticketTxs,
  randomNumber,
  fakeFullAddress,
  fakePrize,
  getRandomInt,
  attendedWallets,
  fakeFullTx,
};
