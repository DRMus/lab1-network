import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { SocketApi } from "../api/socket.api";
import Paragraph from "antd/es/typography/Paragraph";

interface FormValues {
  query: string;
}

const Lab3 = () => {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);
  const onFormFinish = (data: FormValues) => {
    if (!data.query) return;

    if (data.query.indexOf("hello") === 0) {
      const splitedQuery = data.query.split(" ");
      SocketApi.createConnection(setIsSocketConnected);
      SocketApi.createListenner("error", (data: any) =>
        setResponseMessage(data.message)
      );
      SocketApi.createListenner("hello-res", (data: any) =>
        setResponseMessage(data.message)
      );
      SocketApi.sendMessage("hello", { variant: splitedQuery[1] });
      return;
    }

    if (data.query.indexOf("bye") === 0) {
      if (!SocketApi.socket) setResponseMessage("Socket is not connected");
      const splitedQuery = data.query.split(" ");
      SocketApi.createListenner("bye-res", (data: any) => {
        setResponseMessage(data.message);
        SocketApi.disconnect();
      });
      SocketApi.sendMessage("bye", { variant: splitedQuery[1] });
      return;
    }

    if (data.query.indexOf("encrypt") === 0) {
      if (!SocketApi.socket) setResponseMessage("Socket is not connected");
      const splitedQuery = data.query.split(" ");
      SocketApi.createListenner("encrypt-res", (data: any) => {
        setResponseMessage(data.message);
      });
      SocketApi.sendMessage("encrypt", {
        message: splitedQuery[1],
        key: splitedQuery[2],
      });
      return;
    }

    if (data.query.indexOf("decrypt") === 0) {
      if (!SocketApi.socket) setResponseMessage("Socket is not connected");
      const splitedQuery = data.query.split(" ");
      SocketApi.createListenner("decrypt-res", (data: any) => {
        setResponseMessage(data.message);
      });
      SocketApi.sendMessage("decrypt", {
        message: splitedQuery[1],
        key: splitedQuery[2],
      });
      return;
    }

    setResponseMessage("Invalid command");
  };

  useEffect(() => {
    return () => {
      SocketApi.disconnect();
    };
  }, []);

  return (
    <>
      <ActionCard title="Сообщение сокету">
        <Form onFinish={onFormFinish}>
          <Form.Item label="Текст запроса" name={"query"}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Отправить
            </Button>
          </Form.Item>
        </Form>
        <SocketState $isConnected={isSocketConnected} />
      </ActionCard>
      <ActionCard title="Ответное сообщение">
        <Paragraph>{responseMessage}</Paragraph>
      </ActionCard>
    </>
  );
};

export default Lab3;

const ActionCard = styled(Card)`
  position: relative;
  margin-bottom: 16px;
`;

const SocketState = styled.div<{ $isConnected?: boolean }>`
  position: absolute;
  top: 18px;
  right: 24px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${({ $isConnected }) => ($isConnected ? "green" : "red")};
`;
