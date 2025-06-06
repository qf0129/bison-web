import styled from "styled-components";

interface Menu {
  title: string;
  path?: string;
  icon?: string;
  children?: Menu[];
}

const menus: Menu[] = [
  {
    title: "Home",
    path: "/",
    icon: "home",
  },
  {
    title: "About",
    path: "/about",
    icon: "about",
  },
  {
    title: "Contact",
    path: "/contact",
    icon: "contact",
  },
  {
    title: "Settings",
    icon: "settings",
    children: [
      {
        title: "Profile",
        path: "/settings/profile",
      },
    ],
  },
];

export default () => {
  const Sidebar = styled.div`
    width: 180px;
    background-color: #999;
  `;
  return <Sidebar></Sidebar>;
};
