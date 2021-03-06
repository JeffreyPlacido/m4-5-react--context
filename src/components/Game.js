import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import useInterval from "../hooks/use-interval.hook";

import cookieSrc from "../cookie.svg";
import Item from "./Item";

const Game = ({
  calculateCookiesPerSecond,
  stuff,
  cookies,
  setCookies,
  items,
  setItems,
}) => {
  const incrementCookies = () => {
    setCookies((c) => c + 1);
  };

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(items);

    setCookies(cookies + numOfGeneratedCookies);
  }, 1000);

  React.useEffect(() => {
    document.title = `${cookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  }, [cookies]);

  React.useEffect(() => {
    const handleKeydown = (ev) => {
      if (ev.code === "Space") {
        incrementCookies();
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{cookies} cookies</Total>
          <strong>{calculateCookiesPerSecond(items)}</strong> cookies per second
        </Indicator>
        <Button onClick={incrementCookies}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {stuff.map((item, index) => {
          return (
            <Item
              key={item.id}
              index={index}
              name={item.name}
              cost={item.cost}
              value={item.value}
              numOwned={items[item.id]}
              handleAttemptedPurchase={() => {
                if (cookies < item.cost) {
                  alert("Cannot afford item");
                  return;
                }

                setCookies(cookies - item.cost);
                setItems({
                  ...items,
                  [item.id]: items[item.id] + 1,
                });
              }}
            />
          );
        })}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  transform-origin: center center;
  &:active {
    transform: scale(0.9);
  }
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
