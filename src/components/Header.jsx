import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  selectUserName,
  selectUserPhoto,
  setUserLogin,
  setUserLogout,
} from "../features/userSlice";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
const Header = () => {
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const dispatch = useDispatch();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const onSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserLogout());
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onToggleHandler = () => {
    setToggle((prev) => !prev);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // user will return null if sign out
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
      }
    });
  }, [dispatch]);
  return (
    <Nav>
      <Logo
        onClick={() => {
          history.push("/");
        }}
        src="/images/logo.svg"
      />
      {!userName && <LoginButton onClick={onSignIn}>Login</LoginButton>}
      {userName && (
        <Fragment>
          <NavMenu toggle={toggle}>
            <Link to="/">
              <img src="/images/home-icon.svg" alt="icon" />
              <span>HOME</span>
            </Link>
            <a href="/">
              <img src="/images/search-icon.svg" alt="icon" />
              <span>SEARCH</span>
            </a>
            <a href="/">
              <img src="/images/watchlist-icon.svg" alt="icon" />
              <span>WATCHLIST</span>
            </a>
            <a href="/">
              <img src="/images/original-icon.svg" alt="icon" />
              <span>ORIGINALS</span>
            </a>
            <a href="/">
              <img src="/images/movie-icon.svg" alt="icon" />
              <span>MOVIES</span>
            </a>
            <a href="/">
              <img src="/images/series-icon.svg" alt="icon" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <Hamburger onClick={onToggleHandler} toggle={toggle}></Hamburger>
          <UserImg src={`${userPhoto}`} />
          <SignOutButton onClick={onSignOut}>Sign out</SignOutButton>
        </Fragment>
      )}
    </Nav>
  );
};

export default Header;
const Nav = styled.nav`
  position: fixed;
  height: 70px;
  background-color: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  width: 100vw;
  /* overflow-x: hidden; */
  z-index: 1000;

  @media (max-width: 900px) {
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  width: 80px;
  cursor: pointer;
`;
const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  transition: all 0.5s;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      &::after {
        content: "";
        height: 2px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        background-color: white;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 0.3s linear;
      }
    }
    &:hover {
      span::after {
        transform: scaleX(1);
        opacity: 1;
        transition: all 0.3s;
      }
    }
  }

  @media (max-width: 900px) {
    ${({ toggle }) => {
      if (toggle) {
        return css`
          transform: translateX(100%);
        `;
      } else {
        return css`
          transform: translateX(0);
        `;
      }
    }}
    & {
      /* display: none; */
      justify-content: space-around;
      position: absolute;
      top: 70px;
      left: 0;
      margin: 0;
      flex-direction: column;
      height: calc(100vh - 70px);
      width: 100vw;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 100;
    }
  }
`;

const LoginButton = styled.button`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  transition: all 250ms;
  cursor: pointer;
  margin-left: auto;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Hamburger = styled.button`
  height: 5px;
  width: 45px;
  background-color: white;
  cursor: pointer;
  border: none;
  display: none;
  &::before {
    content: "";
    height: 5px;
    width: 45px;
    transform: translateY(-10px);
    background-color: white;
    display: block;
  }
  &::after {
    content: "";
    height: 5px;
    width: 45px;
    transform: translateY(5px);
    background-color: white;
    display: block;
  }
  @media (max-width: 900px) {
    display: block;
  }
`;
const SignOutButton = styled.button`
  position: absolute;
  top: 60px;
  right: 20px;
  width: 130px;
  color: white;
  background-color: black;
  font-weight: bold;
  cursor: pointer;
  padding: 1rem;
  z-index: 2000;
  text-align: center;
  font-size: 0.7rem;
  text-transform: uppercase;
  transition: all 250ms;
  letter-spacing: 2.5px;
  border-radius: 10px;
  opacity: 0;
  visibility: hidden;

  &:hover {
    background: #0483ee;
    opacity: 1;
    visibility: visible;
    transition: all 250ms 0.3s 0.5s;
  }
`;
const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;

  &:hover + ${SignOutButton} {
    opacity: 1;
    visibility: visible;
    transition: all 250ms 0.3s 0.5s;
  }
`;
