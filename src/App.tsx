import {
  Button,
  Card,
  Empty,
  Form,
  InputNumber,
  Layout,
  Select,
  Space,
  Spin,
  Switch,
  Typography,
  message,
} from "antd";
import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PingCommands from "./components/PingCommands";
import { pingFormater } from "./utils/pingFormater";
import IpconfigCommands from "./components/IpconfigCommands";
import { ipconfigFormater } from "./utils/ipconfigFormater";
import PathpingCommands from "./components/PathpingCommands";
import NetstatCommands from "./components/NetstatCommands";
import { netstatFormater } from "./utils/netstatFormater";

export type FormFields = {
  rules: string;
  [key: string]: string | number | boolean | undefined;
};

export type Commands = "ping" | "ipconfig" | "netstat" | "pathping" | "";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasText, setHasText] = useState<boolean>(false);
  const [selectedCommand, setSelectedCommand] = useState<Commands>("");
  const responseRef = useRef<HTMLElement>(null);

  const clearProcess = async () => {
    try {
      await axios.post("//localhost:5000/cmd/delete");
      message.success("Процессы очищены");
    } catch (e) {
      message.error("Ошибка");
    }
  };

  const onFormFinish = async (data: FormFields & { timeout: number }) => {
    if (!responseRef.current) return;

    let { timeout, ...clearedData } = data;
    let requestString: string = "";

    if (selectedCommand === "ping" || selectedCommand === "pathping") {
      requestString = pingFormater(clearedData);
    }

    if (selectedCommand === "ipconfig") {
      requestString = ipconfigFormater(clearedData);
    }

    if (selectedCommand === "netstat") {
      requestString = netstatFormater(clearedData);
    }

    setIsLoading(true);
    try {
      const res = await axios.post("//localhost:5000/cmd", {
        rules: requestString,
        timeout,
      });
      responseRef.current.innerText = res.data.data;
    } catch (e) {
      responseRef.current.innerText = "Запрос невыполнен";
    } finally {
      setHasText(true);
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <ActionCard title="Запрос">
        <Form<FormFields & { timeout: number }> onFinish={onFormFinish}>
          <Form.Item
            label="Время таймаута (мс)"
            name="timeout"
            initialValue={15000}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="rules"
            label="Команда"
            rules={[{ required: true, message: "Данное поле обязательно" }]}
          >
            <Select onChange={setSelectedCommand}>
              <Select.Option value={"ping"}>ping</Select.Option>
              <Select.Option value={"ipconfig"}>ipconfig</Select.Option>
              <Select.Option value={"pathping"}>pathping</Select.Option>
              <Select.Option value={"netstat"}>netstat</Select.Option>
            </Select>
            {/* <Input placeholder="Введите команду" type="text" required /> */}
          </Form.Item>
          <PingCommands />
          <IpconfigCommands />
          <PathpingCommands />
          <NetstatCommands />
          <Space>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Выполнить
              </Button>
            </Form.Item>
            <Form.Item>
              <Button danger onClick={clearProcess}>
                Очистить процессы
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </ActionCard>
      <ActionCard title="Ответ">
        {!hasText && <Empty description={"Запрос пуст"} />}
        <Typography ref={responseRef} />
      </ActionCard>
      <Spin
        spinning={isLoading}
        fullscreen={isLoading}
        style={{ zIndex: 100 }}
      />
    </MainLayout>
  );
}

export default App;

const MainLayout = styled(Layout)`
  padding: 8px;
  height: 100%;
`;

const ActionCard = styled(Card)`
  margin-bottom: 16px;
`;

const FormSpace = styled(Space)`
  width: 100%;

  > .ant-space-item:nth-child(1) {
    flex-grow: 1;
  }
`;
