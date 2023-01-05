import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  background-color: #0d0909;
`;

export const FooterWrap = styled.div`
  padding: 15px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
`;

export const SocialMedia = styled.section`
  max-width: 1300px;
  width: 100%;
`;

export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  margin: 0px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const SocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;
  @media screen and (max-width: 820px) {
    margin-bottom: 9px;
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  @media screen and (max-width: 820px) {
    width: 150px;
  }
`;

export const SocialIconLink = styled.a`
  color: #fff;
  font-size: 24px;
`;

export const CreditMobile = styled.a`
  display: none;
  @media screen and (max-width: 820px) {
    color: #fff;
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 15px;
    padding-bottom: 2px;
  }
`;

export const CreditLaptop = styled.a`
  display: none;
  color: #fff;
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 17px;
  padding-bottom: 2px;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;
