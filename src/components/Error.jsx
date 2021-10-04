import React from "react";
import styled from "styled-components";
const Error = () => {
  return (
    <Container>
      <h1>Page Not Found</h1>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
