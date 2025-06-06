import { Outlet } from "react-router";
import Header from "./Header";
import styled from "styled-components";
import { Flex } from "antd";

export default () => {
  const ConsoleLayout = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
  `;

  return (
    <ConsoleLayout>
      <Header />
      <Flex>
        <Outlet />
      </Flex>
    </ConsoleLayout>
  );
};
