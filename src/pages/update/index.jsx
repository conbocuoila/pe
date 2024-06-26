import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  console.log(id);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState({});
  const [form] = useForm();
  const handleOk = () => {
    form.submit();
  };
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    axios
      .put(
        "https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement/" + id,
        values
      )
      .then(() => {
        setOpen(false);
        navigate("/dashboard");
      });
  };
  useEffect(() => {
    axios
      .get("https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement/" + id)
      .then((res) => {
        setValue({
          ...value,
          name: res.data.name,
          address: res.data.address,
          age: res.data.age,
          createdAt: res.data.createdAt,
          avatar: res.data.avatar,
        });
        form.setFieldsValue({
          name: res.data.name,
          address: res.data.address,
          age: res.data.age,
          createdAt: res.data.createdAt,
          avatar: res.data.avatar,
        });
      });
  }, []);
  const validateName = (_, value) => {
    if (!value || value.trim() === "") {
      return Promise.reject({ message: "" });
    }
    const words = value.split(" ").filter((word) => word.trim() !== "");
    return words.length >= 2
      ? Promise.resolve()
      : Promise.reject("Name must have at least two words");
  };
  const handleCancel = () => {
    setOpen(false), navigate("/dashboard");
  };
  return (
    <div className="update">
      <Modal
        onCancel={handleCancel}
        onOk={handleOk}
        title="Update staff"
        open={open}
      >
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 24 }}>
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
            <Input
              name="name"
              value={value.name}
              onChange={(e) => setValue({ ...value, name: e.target.value })}
            />
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
            <Input
              name="address"
              value={value.address}
              onChange={(e) => setValue({ ...value, address: e.target.value })}
            />
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
            <Input
              name="age"
              value={value.age}
              onChange={(e) => setValue({ ...value, age: e.target.value })}
            />
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
            <Input
              name="createdAt"
              value={value.createdAt}
              onChange={(e) =>
                setValue({ ...value, createdAt: e.target.value })
              }
            />
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
            <Input
              name="avatar"
              value={value.avatar}
              onChange={(e) => setValue({ ...value, avatar: e.target.value })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Update;
