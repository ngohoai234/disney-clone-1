import React from "react";
import styled from "styled-components";
const Viewers = () => {
  const onPlayHandler = (e) => {
    e.target.play();
  };
  return (
    <Container>
      <Wrap>
        <img src="/images/viewers-disney.png" alt="view" />
        <video
          onPlay={onPlayHandler}
          playsInline={true}
          autoPlay={true}
          loop={true}
          muted
        >
          <source
            src="https://vod-bgc-na-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/01/1564674844-disney.mp4"
            type="video/mp4"
          />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-pixar.png" alt="view" />
        <video onPlay={onPlayHandler} autoPlay={true} loop={true} muted>
          <source
            src="https://vod-bgc-na-east-1.media.dssott.com/bgui/ps01/disney/bgui/2019/08/01/1564676714-pixar.mp4"
            type="video/mp4"
          />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-marvel.png" alt="view" />
        <video muted autoPlay={true} loop={true} onPlay={onPlayHandler}>
          <source src="/videos/1564676115-marvel.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-starwars.png" alt="view" />
        <video muted autoPlay={true} loop={true} onPlay={onPlayHandler}>
          <source src="/videos/1608229455-star-wars.mp4" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-national.png" alt="view" />
        <video muted autoPlay={true} loop={true} onPlay={onPlayHandler}>
          <source
            src="/videos/1564676296-national-geographic.mp4"
            type="video/mp4"
          />
        </video>
      </Wrap>
    </Container>
  );
};

export default Viewers;

const Container = styled.div`
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-gap: 25px;
  padding: 30px 0 25px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    &:last-child {
    }
  }
  @media (max-width: 720px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  border: 3px solid rgba(249, 249, 249, 0.1);
  border-radius: 10px;
  box-shadow: 0 20px 20px -10px black;
  transition: all 0.35s;
  position: relative;
  img {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
    z-index: 1;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
    @media (-webkit-video-playable-inline) {
      #either-gif-or-video img {
        display: none;
      }
      #either-gif-or-video video {
        display: initial;
      }
    }
  }
  &:hover {
    transform: scale(1.08);
  }
  &:hover video {
    opacity: 1;
    z-index: 10;
  }
`;
