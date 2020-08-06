import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";
import usePersisted from "../hooks/use-presisted.hook";

function App(props) {
  const [numCookies, setNumCookies] = usePersisted("use-cookies", 1000);

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game
            cookies={numCookies}
            setCookies={setNumCookies}
            items={purchasedItems}
            setItems={setPurchasedItems}
          />
        </Route>
      </Router>
    </>
  );
}

export default App;
