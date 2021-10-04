import React, { useEffect, useState } from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import api from "./../api/api-movie";
import { LINK_IMG } from "./../api/movie-key";
import { useHistory } from "react-router";
const Row = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    swipeToSlide: true,
    initialSlide: 0,
    lazyLoad: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await api.get(url);
      const data = response.data.results;
      setMovies(data);
    };
    fetchMovies();
  }, [url]);
  const onClickMovieHandler = (id, pathImg, poster) => {
    history.push({
      pathname: `/detail/${id}`,
      state: {
        pathImg,
        poster,
      },
    });
  };
  const renderMovies = () => {
    return movies.map((movie) => {
      return (
        <LazyLoadComponent key={movie.id}>
          <Movie
            onClick={() => {
              onClickMovieHandler(
                movie.id,
                movie.backdrop_path,
                movie.poster_path
              );
            }}
          >
            <ImgMovie src={`${LINK_IMG}${movie.poster_path}`} alt="movie" />
            <Backdrop>
              <Info>
                <Name>{movie?.name || movie?.original_title}</Name>
                <Description>{movie?.overview}</Description>
                <Rate>{movie && movie.vote_average}</Rate>
              </Info>
              <PlayButton> Play </PlayButton>
            </Backdrop>
          </Movie>
        </LazyLoadComponent>
      );
    });
  };
  return (
    <Container>
      <Title>{title}</Title>
      <MovieList {...settings}>{renderMovies()}</MovieList>
    </Container>
  );
};

export default Row;

const Container = styled.div``;

const Title = styled.h3`
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`;

const MovieList = styled(Slider)`
  .slick-track {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .slick-slide {
    padding: 1.2rem;
  }
`;
const Movie = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex !important;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: transform 350ms;
  border-radius: 20px;
  &:hover {
    transform: skew(0deg, 5deg);
  }
`;
const ImgMovie = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  flex: 1;
  object-fit: cover;
`;
const Name = styled.p`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.3rem;
  flex: 1;
  letter-spacing: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

const Description = styled.p`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
  letter-spacing: 1.2px;
`;

const Backdrop = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  transform: translateX(100%);
  transition: transform 0.3s;
  opacity: 0;
  visibility: hidden;
  ${Movie}:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateX(0%);
  }
`;
const Rate = styled.p`
  color: orange;
  font-weight: bold;
  text-align: center;
  margin-top: 0.5rem;
`;

const PlayButton = styled.button`
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, -10%);
  width: 60px;
  height: 60px;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  background-color: #e7e0e0;
  cursor: pointer;
  transition: all 500ms 400ms linear;
  ${Movie}:hover & {
    background-color: #0483ee;
    color: white;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;
const Info = styled.div`
  padding: calc(3vw);
  height: 100%;
  display: flex;
  flex-direction: column;
`;
