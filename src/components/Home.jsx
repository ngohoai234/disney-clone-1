import React from "react";
import styled from "styled-components";
import { request } from "../api/request";

import ImgSlider from "./ImgSlider";
import Row from "./Row";
import SearchBar from "./SearchBar";
import Viewers from "./Viewers";
const Home = () => {
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <SearchBar />
      <Row title="trending" url={request.fetchTrending} />
      <Row title="Original" url={request.fetchNetflixOriginals} />
      <Row title="Top Rate" url={request.fetchTopRated} />
      <Row title="Action Movies" url={request.fetchActionMovies} />
      <Row title="Horror Movies" url={request.fetchHorrorMovies} />
      <Row title="Romances Movies" url={request.fetchRomanceMovies} />
      <Row title="Documentaries" url={request.fetchDocumentaries} />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0px calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
  &::before {
    content: "";
    background: url("./images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
  }
  &::after {
  }
`;
