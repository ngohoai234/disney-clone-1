import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { LINK_IMG } from "./../api/movie-key";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { fetchMovieById } from "../features/movieActions";
import { useSelector } from "react-redux";
import { selectMovie } from "../features/movieSlice";
import Modal from "../UI/Modal";
import api from "./../api/api-movie";
import { API_KEY } from "./../api/movie-key";
const Detail = (props) => {
  const { id } = useParams();
  const [isInfo, setIsIsInfo] = useState(true);
  const [isReview, setIsReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const movie = useSelector(selectMovie);
  const { state } = useLocation();
  const dispatch = useDispatch();
  const renderStart = (rate) => {
    const floor = Math.floor(rate / 2);
    const results = [];
    for (let i = 0; i < floor; i++) {
      results.push(
        <img
          key={i}
          src="https://tix.vn/app/assets/img/icons/star1.png"
          alt="start"
        />
      );
    }
    // trả về mảng chua71 các img
    return <Starts>{results}</Starts>;
  };
  const renderReviews = () => {
    if (reviews.length > 0) {
      return reviews.map((review) => {
        const pathImg = review?.author_details?.avatar_path;
        const result = typeof pathImg === "string" ? pathImg.slice(1) : "";
        const rate = review?.author_details?.rating
          ? review?.author_details?.rating
          : 5;
        return (
          <Modal key={review.id}>
            <InfoPerson>
              <Logo src={`${result}`} alt="logo" />
              <Person>
                <NamePerson>{review?.author}</NamePerson>
                <Date>{review?.created_at || review?.updated_at}</Date>
              </Person>
              <RatePerson>
                {rate}
                {renderStart(rate)}
              </RatePerson>
            </InfoPerson>
            <ContentReview>{review?.content}</ContentReview>
          </Modal>
        );
      });
    } else {
      return (
        <Modal>
          <p style={{ textAlign: "center", color: "black", fontSize: "25px" }}>
            Hiện tại chưa có ai đánh giá bộ phim này
          </p>
        </Modal>
      );
    }
  };
  useEffect(() => {
    dispatch(fetchMovieById(id));
  }, [dispatch, id]);
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await api.get(
        `/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      const { data } = response;
      setReviews(data.results);
    };
    fetchReviews();
  }, [id]);
  return (
    <Container path={`${LINK_IMG}${state.pathImg}`}>
      <BasicInfo>
        <InfoContent>
          <SmallImg src={`${LINK_IMG}${state.poster}`} />
          <Info>
            <Date>{movie?.release_date}</Date>
            <Name>{movie?.original_title || movie?.title}</Name>
            <Status>{movie?.status}</Status>
          </Info>
        </InfoContent>
        <Ratio>
          <Circle>
            <Rate>{movie?.vote_average}</Rate>
          </Circle>
          <Vote>
            <span style={{ fontWeight: "bold", marginRight: "0.4rem" }}>
              {movie?.vote_count}
            </span>
            người đã đánh giá
          </Vote>
        </Ratio>
      </BasicInfo>
      <Tabs>
        <Button
          onClick={() => {
            setIsIsInfo(true);
            setIsReview(false);
          }}
          isInfo={isInfo}
        >
          Thông Tin
        </Button>
        <Button
          isReview={isReview}
          onClick={() => {
            setIsIsInfo(false);
            setIsReview(true);
          }}
        >
          Đánh giá
        </Button>
      </Tabs>
      {isInfo && (
        <DetailInfo>
          <DetailLeft>
            <Field>
              <Title>Ngày công chiếu: </Title>
              <Label>{movie?.release_date}</Label>
            </Field>
            <Field>
              <Title>Ngôn ngữ: </Title>
              <Label>{movie?.original_language}</Label>
            </Field>
            <Field>
              <Title>Mức độ phổ biến : </Title>
              <Label>{movie?.popularity}</Label>
            </Field>
          </DetailLeft>
          <DetailRight>
            <h5>Nội dung </h5>
            <p>{movie?.overview}</p>
          </DetailRight>
        </DetailInfo>
      )}
      {isReview && <Review>{renderReviews()}</Review>}
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  height: 100vh;
  padding: 0 calc(3.5vw + 5px);
  margin-top: calc(70px);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    filter: blur(10px) invert(1%) opacity(60%);
    background-image: url(${(props) => props.path});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
  }
`;

const BasicInfo = styled.div`
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;
const Button = styled.a`
  display: block;
  text-decoration: none;
  cursor: pointer;
  margin-right: 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 250ms;
  &:hover,
  &.active {
    color: #fb4226;
    transform: scale(1.4);
  }
  ${(props) => {
    return props.isInfo || props.isReview
      ? css`
          color: #fb4226;
          transform: scale(1.4);
        `
      : "";
  }}
`;

const InfoPerson = styled.div`
  color: black;
  display: flex;
  align-items: center;
`;
const Person = styled.div`
  margin-right: auto;
`;
const RatePerson = styled.div`
  font-size: 1.2rem;
  color: black;
  text-align: center;
  font-weight: bold;
  color: #fb4226;
`;
const Starts = styled.div`
  & > img {
    width: 20px;
    margin-right: 0.3rem;
  }
`;
const Logo = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 25px;
  margin-right: 1rem;
  cursor: pointer;
`;
const NamePerson = styled.p`
  font-weight: bold;
  letter-spacing: 1.5px;
  text-transform: capitalize;
`;
const ContentReview = styled.p`
  margin-top: 1.3rem;
  color: black;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
`;
const Review = styled.div``;

const InfoContent = styled.div`
  display: flex;
  align-items: center;
  flex: 2;
  @media (max-width: 720px) {
    flex: 1;
  }
`;
const SmallImg = styled.img`
  width: 250px;
  object-fit: cover;
  border-radius: 20px;
  cursor: pointer;
  @media (max-width: 500px) {
    margin: 0 auto;
  }
`;
const Info = styled.div`
  margin-left: 3rem;
  @media (max-width: 500px) {
    display: none;
  }
  @media (max-width: 720px) {
    margin-left: 2rem;
  }
`;
const Date = styled.p`
  font-size: 16px;
  letter-spacing: 1.5px;
`;

const Name = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 1.8px;
  margin: 0.3rem 0;
`;
const Status = styled.p`
  font-size: 1.2rem;
`;
const Ratio = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 720px) {
    display: none;
  }
`;
const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: orange;
  border-radius: 50%;
  margin-bottom: 0.3rem;
`;

const Rate = styled.div`
  line-height: 100px;
  text-align: center;
  font-size: 2rem;
  color: black;
  font-weight: bold;
  margin-left: auto;
`;
const Vote = styled.p`
  font-size: 1.1rem;
`;
const DetailInfo = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 720px) {
    display: block;
  }
`;

const DetailLeft = styled.div`
  flex: 3;
`;

const Field = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  letter-spacing: 1.3px;
  @media (max-width: 720px) {
    justify-content: space-between;
    margin-bottom: 1.2rem;
  }
`;

const DetailRight = styled.div`
  flex: 2;

  & > h5 {
    margin-bottom: 0.3rem;
    font-size: 1rem;
  }
  & > p {
    letter-spacing: 1.3px;
  }
`;

const Title = styled.h4`
  min-width: 200px;
  max-width: 200px;
  font-size: 1.1rem;
`;
const Label = styled.p``;
