import React from "react";
import styled from "styled-components";

const Modal = (props) => {
  return <Container>{props.children}</Container>;
};

export default Modal;

const Container = styled.div`
  border: 1px solid #e6e6e6;
  padding: 3vw;
  border-bottom: none;
  border-radius: 3px;
  margin: 15px auto;
  background-color: #fff;
  max-width: 580px;
  width: 99%;
`;
