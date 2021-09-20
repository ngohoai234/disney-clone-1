import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const readMovie = async () => {
      const docRef = doc(db, "movies", id);
      const docSnap = await getDoc(docRef);
      return docSnap;
    };
    readMovie().then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        setMovie(doc.data());
      } else {
        // not exist
      }
    });
  }, [id]);

  return (
    <Container>
      {movie && (
        <Fragment>
          <Background>
            <img src={`${movie?.backgroundImg}`} alt="background" />
          </Background>
          <ImageTitle>
            <img src={`${movie?.titleImg}`} alt="logo" />
          </ImageTitle>
          <Controls>
            <PlayButton>
              <img src="/images/play-icon-black.png" alt="play" />
              <span>Play</span>
            </PlayButton>
            <TrailerButton>
              <img src="/images/play-icon-white.png" alt="play" />
              <span>Trailer</span>
            </TrailerButton>
            <AddButton>
              <span>+</span>
            </AddButton>
            <GroupWatchButton>
              <img src="/images/group-icon.png" alt="group" />
            </GroupWatchButton>
          </Controls>
          <SubTitle>{movie?.subTitle}</SubTitle>
          <Description>{movie?.description}</Description>
        </Fragment>
      )}
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
`;
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  opacity: 0.8;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: left center;
  }
`;
const ImageTitle = styled.div`
  height: 30vh;
  min-height: 170px;
  width: 35vw;
  min-width: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
`;
const PlayButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-size: 15px;
  height: 56px;
  background: rgb(249, 249, 249);
  border: none;
  margin-right: 22px;
  padding: 0 24px;
  letter-spacing: 1.8px;
  cursor: pointer;
  transition: all 350ms;
  &:hover {
    background-color: rgb(198, 198, 198);
  }
`;
const TrailerButton = styled(PlayButton)`
  background-color: rgb(0, 0, 0);
  color: rgb(249, 249, 249);
  &:hover {
    color: black;
  }
`;
const AddButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  margin-right: 1rem;
  span {
    font-size: 1.5rem;
    color: white;
  }
`;
const GroupWatchButton = styled(AddButton)``;

const SubTitle = styled.div`
  color: rgb(249, 249, 249);
  font-size: 15px;
  min-height: 20px;
  margin-top: 1.4rem;
`;
const Description = styled.div`
  line-height: 1.4;
  font-size: 1.2rem;
  margin-top: 1rem;
  color: rgb(249, 249, 249);
`;
