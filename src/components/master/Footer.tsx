import styled from 'styled-components';
import { cssVars } from './Theme';

const FooterView = styled.footer`
  margin-top: calc(${cssVars.spacing.gap2x} * 3);
  padding: ${cssVars.spacing.gap2x} 0px;
  border-top: 1px solid ${cssVars.color.tertiary};
  font-size: ${cssVars.fontSize.small};
`;

const Footer = () => {
  return (
    <FooterView>
      The content of this page is absolutely free for everyone. Heck, you can even access the source code on{' '}
      <a href="https://github.com/orosznyet/themostannoyingwebsite">GitHub</a>. And... You know what? You can even
      contribute your of stuff as well.
    </FooterView>
  );
};

export default Footer;
