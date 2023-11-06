import { Form, Input, InputNumber, Switch } from "antd";

const NetstatCommands = () => {
  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="Интервал" name="interval">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-p" name="-p">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-a" name="-a" valuePropName="checked">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-aon" name="-aon" valuePropName="checked">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-n" name="-n" valuePropName="checked">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-e" name="-e" valuePropName="checked">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-s" name="-s" valuePropName="checked">
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
          getFieldValue("rules") === "netstat" && (
            <Form.Item label="-r" name="-r" valuePropName="checked">
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>
    </>
  );
};

export default NetstatCommands;
