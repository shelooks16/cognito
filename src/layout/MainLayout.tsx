import { Outlet } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

const StyledContentWrap = styled.div`
  padding: 15px 20px;
`;

const MainLayout = () => {
  return (
    <div>
      <Header />

      <StyledContentWrap>
        <Outlet />
      </StyledContentWrap>
    </div>
  );
};

export default MainLayout;
