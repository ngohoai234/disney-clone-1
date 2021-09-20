import React, { useEffect } from "react";
import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";
import { db } from "./../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/moviesSlice";
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      const querySnapshot = await getDocs(collection(db, "movies"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setMovies(data));
    };
    fetch();
  }, [dispatch]);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies />
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
