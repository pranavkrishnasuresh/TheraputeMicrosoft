'use client'
import React from 'react';
import styled from 'styled-components';
import CopyrightIcon from '@mui/icons-material/Copyright';

const FooterContainer = styled.footer`
  background-color: rgba(0, 0, 0, 0.88);
  color: #fff;
  padding: 2px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999; /* Set a high z-index value */
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 16px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: underline;

  &:hover {
    color: #ffcc00; /* Change the color on hover */
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        <CopyrightIcon className="mr-1"/>
        Therapute{' '}|{' '}
        <FooterLink href="#">Privacy Policy</FooterLink> |{' '}
        <FooterLink href="#">Terms of Service</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;