import { Form, Input, Select } from "antd";

const hasParamValue = ["/release", "/renew", "/showclassid", "/setclassid"];

const IpconfigCommands = () => {
  const showParamValueField = (getFieldValue: (name: any) => any) =>
    getFieldValue("rules") === "ipconfig" &&
    hasParamValue.includes(getFieldValue("param"));
  return (
    <>
      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.rules !== currentValue.rules
        }
      >
        {({ getFieldValue }) =>
          getFieldValue("rules") === "ipconfig" && (
            <Form.Item label="Параметр" name="param">
              <Select>
                <Select.Option value="/?">/?</Select.Option>
                <Select.Option value="/all">/all</Select.Option>
                <Select.Option value="/release">/release</Select.Option>
                <Select.Option value="/renew">/renew</Select.Option>
                <Select.Option value="/flushdns">/flushdns</Select.Option>
                <Select.Option value="/displaydns">/displaydns</Select.Option>
                <Select.Option value="/registerdns">/registerdns</Select.Option>
                <Select.Option value="/showclassid">/showclassid</Select.Option>
                <Select.Option value="/setclassid">/setclassid</Select.Option>
              </Select>
            </Form.Item>
          )
        }
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValue, currentValue) =>
          prevValue.param !== currentValue.param
        }
      >
        {({ getFieldValue }) =>
          showParamValueField(getFieldValue) && (
            <Form.Item label="Значение" name="paramValue">
              <Input type="text" />
            </Form.Item>
          )
        }
      </Form.Item>
    </>
  );
};

export default IpconfigCommands;
