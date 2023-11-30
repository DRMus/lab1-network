import { Layout, Space, Switch } from "antd";
import "./App.css";
import { useState } from "react";
import styled from "styled-components";
import Lab3 from "./components/Lab3";
import Lab1 from "./components/Lab1";

export type FormFields = {
  rules: string;
  [key: string]: string | number | boolean | undefined;
};

export type Commands = "ping" | "ipconfig" | "netstat" | "pathping" | "";

function App() {
  const [isSocketPage, setIsSocketPage] = useState<boolean>(false);

  return (
    <MainLayout>
      <Space>
        <Switch
          checked={isSocketPage}
          onChange={() => setIsSocketPage(!isSocketPage)}
        />
      </Space>
      {isSocketPage && <Lab3 />}
      {!isSocketPage && <Lab1 />}
    </MainLayout>
  );
}

export default App;

const MainLayout = styled(Layout)`
  padding: 8px;
  height: 100%;
`;
