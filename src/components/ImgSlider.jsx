import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ImgSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };
  return (
    <Carousel {...settings}>
      <Wrap>
        <img src="./images/slider-badging.jpg" alt="banner" />
      </Wrap>
      <Wrap>
        <img src="./images/slider-badag.jpg" alt="banner" />
      </Wrap>
    </Carousel>
  );
};

export default ImgSlider;

const Carousel = styled(Slider)`
  margin-top: 20px;
  .slick-list {
    overflow: visible;
  }
  button {
    z-index: 1;
  }
  li.slick-active button::before {
    color: white;
    font-size: 0.8rem;
  }
  .slick-prev:before,
  .slick-next:before {
    color: white;
  }
`;

const Wrap = styled.div`
  img {
    border: 5px solid transparent;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
    border-radius: 10px;
    transition: border 0.35s;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    &:hover {
      border: 5px solid rgba(249, 249, 249, 0.8);
    }
  }
`;
