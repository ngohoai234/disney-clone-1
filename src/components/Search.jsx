import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import apiMovie from "../api/api-movie";
import { API_KEY, LINK_IMG } from "./../api/movie-key";
const Search = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nameMovie = searchParams?.get("query")?.toUpperCase();
  const history = useHistory();
  const onClickMovie = (id, pathImg, poster) => {
    history.push({
      pathname: `/detail/${id}`,
      state: {
        pathImg,
        poster,
      },
    });
  };
  const renderMovies = () => {
    if (movies.length === 0) {
      return (
        <Notification>Không có phim {nameMovie} trong dữ liệu</Notification>
      );
    }
    return movies.map((movie) => {
      return (
        <Movie
          key={movie.id}
          onClick={() => {
            onClickMovie(movie?.id, movie?.backdrop_path, movie?.poster_path);
          }}
        >
          <ImgContainer>
            <ImgMovie src={`${LINK_IMG}${movie.poster_path}`} />
            <PlayButton>Play</PlayButton>
          </ImgContainer>
          <Name>{movie?.original_title || movie?.title}</Name>
          <Release>{movie?.release_date}</Release>
        </Movie>
      );
    });
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await apiMovie.get(
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${nameMovie}&page=1&include_adult=false`
      );
      setMovies(response?.data?.results);
    };
    fetchMovies();
  }, [nameMovie]);
  if (!nameMovie) {
    return <Notification>Trang này demo </Notification>;
  }
  return (
    <>
      <Title>Phim {nameMovie}</Title>
      <Container>
        <ListMovies>{renderMovies()}</ListMovies>
        <Trending>
          <h1>Trending</h1>
        </Trending>
      </Container>
    </>
  );
};

export default Search;
const Container = styled.div`
  padding: 0 calc(3.5vw - 5px);
  display: flex;
`;
const Notification = styled.p`
  font-size: 2rem;
  text-transform: capitalize;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: "center";
`;
const Title = styled.h3`
  padding: calc(3.5vw - 5px);
  margin-top: 70px;
  font-size: 2rem;
`;
const ListMovies = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 3;
  @media (max-width: 920px) {
    /* justify-content: center; */
    margin-left: 2rem;
  }
`;
const Trending = styled.div`
  flex: 1;
  @media (max-width: 1200px) {
    display: none;
  }
`;
const Movie = styled.div`
  width: calc(25% - 2rem);
  margin-right: 2rem;
  margin-bottom: 2rem;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: calc(33% - 2rem);
  }
  @media (max-width: 720px) {
    width: calc(50% - 2rem);
  }
`;
const ImgContainer = styled.div`
  position: relative;
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  transition: all 350ms;
  &:hover {
    transform: scale(1.1);
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    transform: translateX(100%);
    transition: all 300ms;
    ${Movie}:hover & {
      transform: translateX(0);
    }
  }
`;
const PlayButton = styled.button`
  position: absolute;
  left: 50%;
  top: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  background-color: transparent;
  color: white;
  font-weight: bold;
  font-size: 1.3rem;
  display: none;
  visibility: hidden;
  border: none;
  ${Movie}:hover & {
    display: block;
    visibility: visible;
  }
`;
const ImgMovie = styled.img`
  width: 100%;
  object-fit: cover;
`;
const Name = styled.p`
  font-weight: bold;
  margin-top: 1rem;
  letter-spacing: 1.5px;
  margin-bottom: 0.1rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  word-break: break-all;
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
const Release = styled.p`
  margin-top: 0.5rem;
`;
