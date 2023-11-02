import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledHeader = styled.header`
  overflow: hidden;
  background-color: #f1f1f1;
  padding: 15px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media ${({ theme }) => theme.media.sm} {
    margin-bottom: 0px;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;

const StyledLogoNavLink = styled(StyledNavLink)`
  color: red;
`;

const StyledNavs = styled.div`
  display: flex;

  ${StyledNavLink} {
    padding: 5px 20px;
    color: ${({ theme }) => theme.colors.main};

    &.active {
      text-decoration: underline;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.mainHover};
    }
  }
`;

type NavLinkItem = {
  href: string;
  text: string;
};

const navLinks: NavLinkItem[] = [
  { href: '/', text: 'Home' },
  { href: '/basket', text: 'Basket' },
];

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogoNavLink to="/">SuperMarketLogo</StyledLogoNavLink>
      <StyledNavs>
        {navLinks.map(l => (
          <StyledNavLink key={l.href} to={l.href}>
            {l.text}
          </StyledNavLink>
        ))}
      </StyledNavs>
    </StyledHeader>
  );
};

export default Header;
