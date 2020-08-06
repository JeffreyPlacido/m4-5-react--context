import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import usePersisted from "../hooks/use-presisted.hook";
import useInterval from "../hooks/use-interval.hook";

const Home = ({
  calculateCookiesPerSecond,
  stuff,
  cookies,
  setCookies,
  setItems,
  items,
}) => {
  React.useEffect(() => {
    document.title = `${cookies} cookies - Cookie Clicker Workshop`;

    return () => {
      document.title = "Cookie Clicker Workshop";
    };
  });

  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(items);

    setCookies(cookies + numOfGeneratedCookies);
  }, 1000);

  return (
    <Wrapper>
      <Title>Cookie game</Title>
      <Link to="/game">Go to game</Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  place-content: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 32px;
`;

export default Home;
