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
import { Content } from "antd/es/layout/layout";
import { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";

type FormFields = {
  rules: string;
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const responseRef = useRef<HTMLElement>(null);

  const onFormFinish = async (data: FormFields) => {
    if (!responseRef.current) return;
    setIsLoading(true);
    try {
      const res = await axios.post("//localhost:5000/cmd", data);
      setResponse(res.data.data);
      responseRef.current.innerText = res.data.data;
    } catch (e) {
      responseRef.current.innerText = "Неверный запрос";
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <ActionCard title="Запрос">
        <Form<FormFields> onFinish={onFormFinish}>
          <FormSpace>
            <Form.Item name="rules" required>
              <Select>
                <Select.Option value={"ping"}>ping</Select.Option>
                <Select.Option value={"ipconfig"}>ipconfig</Select.Option>
                <Select.Option value={"pathping"}>pathping</Select.Option>
                <Select.Option value={"netstat"}>netstat</Select.Option>
              </Select>
              {/* <Input placeholder="Введите команду" type="text" required /> */}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Выполнить
              </Button>
            </Form.Item>
          </FormSpace>
        </Form>
      </ActionCard>
      <ActionCard title="Ответ">
        {!response && <Empty description={"Запрос пуст"} />}
        <Typography ref={responseRef} />
      </ActionCard>
      <Spin spinning={isLoading} fullscreen={isLoading} style={{zIndex: 100}}/>
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
