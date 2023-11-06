import { Form, Input, InputNumber, Switch } from "antd";

const PathpingCommands = () => {
  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "pathping" && (
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-g" name="-g">
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-h" name="-h">
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-i" name="-i">
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-p" name="-p">
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-q" name="-q">
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-w" name="-w">
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
          getFieldValue("rules") === "pathping" && (
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-4" name="-4" valuePropName="checked">
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
          getFieldValue("rules") === "pathping" && (
            <Form.Item label="-6" name="-6" valuePropName="checked">
              <Switch />
            </Form.Item>
          )
        }
      </Form.Item>
    </>
  );
};

export default PathpingCommands;
