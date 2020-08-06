import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import usePersisted from "../hooks/use-presisted.hook";

function App(props) {
  const [numCookies, setNumCookies] = usePersisted("use-cookies", 1000);
  //const [numCookies, setNumCookies] = React.usePersistedState('numCookies',1000);

  const [purchasedItems, setPurchasedItems] = usePersisted("items", {
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  const stuff = [
    { id: "cursor", name: "Cursor", cost: 10, value: 1 },
    { id: "grandma", name: "Grandma", cost: 100, value: 10 },
    { id: "farm", name: "Farm", cost: 1000, value: 80 },
  ];

  const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = stuff.find((item) => item.id === itemId);
      const value = item.value;

      return acc + value * numOwned;
    }, 0);
  };
  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home
            cookies={numCookies}
            setCookies={setNumCookies}
            items={purchasedItems}
            setItems={setPurchasedItems}
            stuff={stuff}
            calculateCookiesPerSecond={calculateCookiesPerSecond}
          />
        </Route>
        <Route path="/game">
          <Game
            cookies={numCookies}
            setCookies={setNumCookies}
            items={purchasedItems}
            setItems={setPurchasedItems}
            stuff={stuff}
            calculateCookiesPerSecond={calculateCookiesPerSecond}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
