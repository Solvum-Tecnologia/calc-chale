const express = require("express");
const cors = require("cors");
const app = express();

const base = require("./fixedValues");

app.use(cors());
app.use(express.json());

app.post("/", (request, response) => {

  console.log('body',request.body)

  const { optionOfRoom, underEleven, underSix, single, couple } = request.body;

  const numberOfPeople = underEleven + underSix + single + couple*2;
  
  const numberOfUnderSix = underSix <= 1 ? 0 : underSix
  
  const indexRoom = numberOfPeople < 25 ? 0 : 1
  

  const getPrice = (indexRoom) => {
    const amountSingle = base[Number(optionOfRoom)].room[indexRoom].price * 0.7;
    const coupleAmount = base[Number(optionOfRoom)].room[indexRoom].price * 1;
    const amountUnderSix = base[Number(optionOfRoom)].room[indexRoom].price * 0.1;
    const amountUnderEleven = base[Number(optionOfRoom)].room[indexRoom].price * 0.2;

    const sumPercent =
      Number(underEleven) * amountUnderEleven +
      Number(numberOfUnderSix) * amountUnderSix  +
      Number(single) * amountSingle +
      Number(couple) * coupleAmount;

    return sumPercent;
  };
  const Price = () => {
    return getPrice(indexRoom);
  };

  return response.json({ Price: Price() });
});

const port = process.env.PORT || 3333
app.listen(port, () => {
  console.log("Server running");
});
