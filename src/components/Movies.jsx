import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectMovies } from "../features/moviesSlice";
import { Link } from "react-router-dom";
const Movies = () => {
  const movies = useSelector(selectMovies);
  return (
    <Container>
      <h4>Recommended for you</h4>
      <Content>
        {movies &&
          movies.map((movie) => (
            <Wrap key={movie.id}>
              <Link to={`/detail/${movie.id}`}>
                <img src={`${movie.cardImg}`} alt="movie" />
              </Link>
            </Wrap>
          ))}
      </Content>
    </Container>
  );
};

export default Movies;

const Container = styled.div``;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 25px;
  padding: 20px 0;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  border-radius: 10px;
  /* thẻ img width > Wrap vì thế mà border-radius ko dc -> dùng overflow solve */
  overflow: hidden;
  box-shadow: 0px 23px 9px 0px rgba(0, 0, 0, 0.51);
  transition: all 250ms;
  cursor: pointer;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  Link {
    display: block;
    width: 100%;
  }
  &:hover {
    transform: scale(1.08);
    border-color: rgba(249, 249, 249, 0.8);
  }
`;
