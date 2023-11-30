import {
  message,
  Form,
  InputNumber,
  Select,
  Space,
  Button,
  Empty,
  Typography,
  Spin,
  Card,
} from "antd";
import axios from "axios";
import { useState, useRef } from "react";
import { Commands, FormFields } from "../App";
import { ipconfigFormater } from "../utils/ipconfigFormater";
import { netstatFormater } from "../utils/netstatFormater";
import { pingFormater } from "../utils/pingFormater";
import IpconfigCommands from "./IpconfigCommands";
import NetstatCommands from "./NetstatCommands";
import PathpingCommands from "./PathpingCommands";
import PingCommands from "./PingCommands";
import styled from "styled-components";

const Lab1 = () => {
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
    <>
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
    </>
  );
};

export default Lab1;

const ActionCard = styled(Card)`
  margin-bottom: 16px;
`;
