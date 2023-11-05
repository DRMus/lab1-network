import { Form, Input, InputNumber, Switch } from "antd";

const PingCommands = () => {
  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              rules={[{ required: true, message: "Это обязательное поле" }]}
              label="Адрес"
              name="link"
            >
              <Input type="text" />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-n"
              name="-n"
            >
              <InputNumber />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-l"
              name="-l"
            >
              <InputNumber />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-i"
              name="-i"
            >
              <InputNumber />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-r"
              name="-r"
            >
              <InputNumber />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-w"
              name="-w"
            >
              <InputNumber />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-f"
              name="-f"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-t"
              name="-t"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ping" && (
            <Form.Item
              label="-a"
              name="-a"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>
    </>
  );
};

export default PingCommands;
