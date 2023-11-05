import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  Layout,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PingCommands from "./components/PingCommands";

type FormFields = {
  rules: string;
  [key: string]: string | number | boolean | undefined;
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasText, setHasText] = useState<boolean>(false);

  const responseRef = useRef<HTMLElement>(null);

  const onFormFinish = async (data: FormFields) => {
    if (!responseRef.current) return;
    let requestString: string = data.rules;

    Object.keys(data).map((key) => {
      if (!data[key] || key === "rules") return;

      if (key === "link") {
        requestString = `${requestString} ${data[key]}`
        return;
      }

      if (typeof data[key] === "string" || typeof data[key] === "number") {
        requestString = `${requestString} ${key} ${data[key]}`;
      } else {
        requestString = `${requestString} ${key}`;
      }
    });

    setIsLoading(true);
    try {
      const res = await axios.post("//localhost:5000/cmd", {rules: requestString});
      responseRef.current.innerText = res.data.data;
    } catch (e) {
      responseRef.current.innerText = "Неверный запрос";
    } finally {
      setHasText(true);
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <ActionCard title="Запрос">
        <Form<FormFields> onFinish={onFormFinish}>
          <Form.Item
            name="rules"
            label="Команда"
            rules={[{ required: true, message: "Данное поле обязательно" }]}
          >
            <Select>
              <Select.Option value={"ping"}>ping</Select.Option>
              <Select.Option value={"ipconfig"}>ipconfig</Select.Option>
              <Select.Option value={"pathping"}>pathping</Select.Option>
              <Select.Option value={"netstat"}>netstat</Select.Option>
            </Select>
            {/* <Input placeholder="Введите команду" type="text" required /> */}
          </Form.Item>
          <PingCommands />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Выполнить
            </Button>
          </Form.Item>
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
