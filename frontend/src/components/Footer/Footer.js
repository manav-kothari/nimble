import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  FooterContainer,
  FooterWrap,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcons,
  SocialIconLink,
  CreditMobile,
  CreditLaptop,
} from "./FooterElements";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/">Nimble</SocialLogo>
            {/* <CreditLaptop
              href="https://manavkothari.netlify.app/"
              target="_blank"
            >
              Developed by Manav Kothari
            </CreditLaptop> */}
            <SocialIcons>
              <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="WhatsApp">
                <FaWhatsapp />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
      {/* <CreditMobile href="https://manavkothari.netlify.app/" target="_blank">
        Developed by Manav Kothari
      </CreditMobile> */}
    </FooterContainer>
  );
};

export default Footer;
