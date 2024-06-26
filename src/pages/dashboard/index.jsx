import { Button, Image, Popconfirm, Table, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";

const Dashboard = () => {
  const [dataSource, setDataSource] = useState([]);
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement/${id}`
    );
    console.log(response);
    message.success("Delete Success");
    setDataSource(dataSource.filter((item) => item.id !== id));
  };
  const navigate = useNavigate();
  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      render: (avatar) => <Image src={avatar} width={100} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Popconfirm
            title="Delete the staff"
            description="Are you sure to delete this staff ?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ background: "#dc3545", color: "#fff", border: "none" }}
            >
              Delete
            </Button>
          </Popconfirm>
          <Button
            onClick={() => handleUpdate(id)}
            style={{ background: "#17a2b8" }}
            type="primary"
          >
            Update
          </Button>
        </div>
      ),
    },
  ];
  const fetchData = async () => {
    const response = await axios.get(
      "https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement"
    );
    setDataSource(response.data);
  };
  useEffect(() => {
    let timeId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);
  const handleNavigateAdd = () => {
    navigate("/add");
  };
  return (
    <div className="dashboard">
      <Button
        onClick={handleNavigateAdd}
        style={{
          display: "flex",
          background: "rgb(23, 162, 184)",
          color: "#fff",
          border: "none",
        }}
      >
        Add New Staff
        <HiOutlineArrowRightStartOnRectangle size={18} />
      </Button>
      <Table
        style={{ border: "1px solid #ccc" }}
        bordered={1}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default Dashboard;
