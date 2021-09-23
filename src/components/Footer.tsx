import styled from 'styled-components';

const FooterView = styled.footer`
  font-size: var(--font-size-small);
`;

const Footer = () => {
  return (
    <FooterView>
      The content of this page is absolutely free for everyone. Heck, you can even access the source code on
      <a href="https://github.com/orosznyet/themostannoyingwebsite">GitHub</a>. And... You know what? You can even
      contribute your of stuff as well.
    </FooterView>
  );
};

export default Footer;
