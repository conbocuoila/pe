import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleCancel = () => {
    setOpen(false);
    navigate("/dashboard");
  };
  const [form] = useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleSubmit = (values) => {
    axios.post(
      "https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement",
      values
    );
    setOpen(false);
    navigate("/dashboard");
  };
  const validateName = (_, value) => {
    if (!value || value.trim() === "") {
      return Promise.reject({ message: "" });
    }
    const words = value.split(" ").filter((word) => word.trim() !== "");
    return words.length >= 2
      ? Promise.resolve()
      : Promise.reject("Name must have at least two words");
  };
  return (
    <div>
      <Modal
        onOk={handleOk}
        onCancel={handleCancel}
        open={open}
        title="New Staff"
      >
        <Form form={form} labelCol={{ span: 24 }} onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Name is required",
              },
              { validator: validateName },
            ]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            label="Address"
            name={"address"}
            rules={[
              {
                required: true,
                message: "Address is required",
              },
            ]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>
          <Form.Item
            label="Age"
            name={"age"}
            rules={[
              {
                required: true,
                message: "Age is required",
              },
            ]}
          >
            <Input placeholder="Enter age" />
          </Form.Item>
          <Form.Item
            label="Image"
            name={"avatar"}
            rules={[
              {
                required: true,
                message: "Avatar is required",
              },
            ]}
          >
            <Input placeholder="URL image" />
          </Form.Item>
          <Form.Item
            label="Create Date"
            name={"createdAt"}
            rules={[
              {
                required: true,
                message: "Date is required",
              },
              {
                pattern: /^\d{4}-\d{2}-\d{2}$/,
                message: "Invalid date format",
              },
            ]}
          >
            <Input placeholder="Enter date (yyyy-mm-dd)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Add;
