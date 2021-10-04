import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Dropdown from "../UI/Dropdown";
import api from "./../api/api-movie";
import { LINK_IMG, API_KEY } from "./../api/movie-key";
const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const [movies, setMovies] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const history = useHistory();
  const onKeyUpEnter = () => {
    if (searchInput.trim().length > 0) {
      history.push(`/search?query=${searchInput}`);
    }
  };
  const onMouseDownSearchItem = (id, pathImg, poster) => {
    history.push({
      pathname: `/detail/${id}`,
      state: {
        pathImg,
        poster,
      },
    });
  };
  const ref = useRef();
  const renderSearchMovies = () => {
    if (!movies) {
      return;
    }
    return movies.map((movie) => {
      return (
        <SearchItem
          key={movie.id}
          onMouseDown={() => {
            onMouseDownSearchItem(
              movie.id,
              movie.backdrop_path,
              movie.poster_path
            );
          }}
        >
          <ImgSearch src={`${LINK_IMG}${movie.poster_path}`} />
          <SearchInfo>
            <Title>{movie?.original_title || movie?.title} </Title>
            <Release>{movie?.release_date}</Release>
          </SearchInfo>
        </SearchItem>
      );
    });
  };
  const onSearchChange = (e) => {
    const { target } = e;
    setIsTouch(true);
    setSearchInput(target.value);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (!isTouch) {
        return;
      }
      if (searchInput === "" && isTouch) {
        setMovies([]);
        return;
      }
      ref.current = setTimeout(async () => {
        const response = await api.get(
          `/search/movie?api_key=${API_KEY}&language=en-US&query=${searchInput}&page=1&include_adult=false`
        );
        setMovies(response.data.results);
      }, 300);
    };
    fetchMovies();
    return () => {
      // cleanup
      clearTimeout(ref.current);
    };
  }, [searchInput, isTouch]);

  return (
    <Container>
      <Field>
        <InputBar
          onChange={onSearchChange}
          type="text"
          id="search-film"
          placeholder="Search Films"
          autoComplete="off"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onKeyUpEnter();
            }
          }}
          onBlur={() => {
            movies?.length && setMovies([]);
            setIsTouch(false);
          }}
        />
        {isTouch && <Dropdown>{renderSearchMovies()}</Dropdown>}
      </Field>
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  padding: 3.5vw;
  margin: 0 auto;
  z-index: 2;
`;
const Field = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 70%;
`;
const InputBar = styled.input`
  border: none;
  outline: none;
  padding: 0.3rem 0.5rem;
  font-size: 1.2rem;
  width: 100%;

  color: black;
  &:focus {
    box-shadow: rgba(34, 167, 240, 1) 0px 0px 15px 5px;
  }
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  color: white;
  background-color: #242d35;
  border-bottom: 2px solid black;
  cursor: pointer;
  z-index: 2;
`;
const ImgSearch = styled.img`
  width: 70px;
  height: 80px;
  object-fit: cover;
`;
const SearchInfo = styled.div`
  margin-left: 1rem;
`;
const Title = styled.p`
  width: 100%;
  transition: all 250ms;
  font-weight: 600;
  ${SearchItem}:hover & {
    color: orange;
  }
`;
const Release = styled.p`
  width: 100%;
`;
