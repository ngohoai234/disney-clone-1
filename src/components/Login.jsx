import React from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <Container>
      <Content>
        <Brand src="./images/cta-logo-one.svg" alt="logo" />
        <SignUp>Get All There</SignUp>
        <Description>
          Lật Mặt 5: 48H kể về Hiền - một cựu vận động viên võ thuật sau khi
          giải nghệ vì chấn thương đã cùng vợ và con gái về quê thăm gia đình
        </Description>
        <Logo src="./images/cta-logo-two.png" alt="Logo-2"></Logo>
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0.8;
    background-image: url("./images/login-background.jpg");
    background-size: cover;
    background-position: top center;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;
const Content = styled.div`
  max-width: 654px;
  padding: 80px 40px;
  z-index: 10;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Brand = styled.img`
  object-fit: cover;
`;

const SignUp = styled.a`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  padding: 17px 0;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 5px;
  font-size: 1rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  transition: background 250ms;
  letter-spacing: 2.5px;
  &:hover {
    background: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 13px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 1.2rem;
`;
const Logo = styled.img`
  object-fit: cover;
  width: 90%;
`;
