import React from "react";
import styled from "styled-components";

const Dropdown = (props) => {
  return <Container>{props.children}</Container>;
};

export default Dropdown;
const Container = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  max-height: 400px;
  background-color: white;
  width: 100%;
  z-index: 2;
  overflow-x: hidden;
  overflow-y: scroll;
`;
