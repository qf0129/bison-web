import { useMatch, useNavigate, useRoutes } from "react-router";
import styled from "styled-components";

const Header = styled.div`
  background-color: #f1f1f1;
  color: #333;
  height: 50px;
  display: flex;
  align-items: center;
`;
const Logo = styled.div`
  padding: 0 20px;
  font-size: 18px;
  font-weight: bold;
`;
const MenuGroup = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  padding-left: 100px;
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  &:hover {
    background-color: #eaeaea;
  }
  &.active {
    background-color: #ddd;
    border-bottom: 1px solid var(--main-color);
  }
`;

export default () => {
  const menus = [
    { path: "/requirement", title: "需求" },
    { path: "/release", title: "发布" },
    { path: "/manage", title: "管理" },
  ];
  const nav = useNavigate();
  return (
    <Header>
      <Logo>xxx</Logo>
      <MenuGroup>
        {menus.map((item) => (
          <MenuItem key={item.path} onClick={() => nav(item.path)} className={useMatch(item.path) ? "active" : ""}>
            {item.title}
          </MenuItem>
        ))}
      </MenuGroup>
      <div>User</div>
    </Header>
  );
};
