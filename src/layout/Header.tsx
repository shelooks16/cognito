import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { getBasketTotal, useBasket } from '../features/basket/useBasket';
import { formatMoney } from '../utils/format';

const StyledHeader = styled.header`
  overflow: hidden;
  background-color: #f4f4f4;
  padding: 15px 20px;
  position: sticky;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  box-shadow: 0px 0px 2px 0px ${({ theme }) => theme.colors.mainDark};

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
  color: ${({ theme }) => theme.colors.mainDark};
`;

const StyledNavs = styled.div`
  display: flex;
  overflow: auto;
  max-width: 100%;

  ${StyledNavLink} {
    padding: 5px 20px;
    color: ${({ theme }) => theme.colors.mainDark};
    white-space: nowrap;

    &.active {
      text-decoration: underline;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.mainDark};
    }
  }
`;

type NavLinkItem = {
  href: string;
  text: string;
};

const navLinks: NavLinkItem[] = [{ href: '/', text: 'Home' }];

const Header = () => {
  const basket = useBasket();
  const totalBasketPrice = getBasketTotal(basket);

  return (
    <StyledHeader>
      <StyledLogoNavLink to="/">SuperMarketLogo</StyledLogoNavLink>
      <StyledNavs>
        {navLinks.map(l => (
          <StyledNavLink key={l.href} to={l.href}>
            {l.text}
          </StyledNavLink>
        ))}
        <StyledNavLink to="/basket">
          Basket | {formatMoney(totalBasketPrice)}
        </StyledNavLink>
      </StyledNavs>
    </StyledHeader>
  );
};

export default Header;
