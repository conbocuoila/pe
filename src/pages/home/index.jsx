import axios from "axios";

import { useEffect } from "react";
import { useState } from "react";
import { Button, Image, Table } from "antd";

import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const handleViewDetails = (id) => {
    navigate(`/details/${id}`);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.address.length - b.address.length,
    },
    {
      title: "Age",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Image",
      dataIndex: "avatar",
      render: (avatar) => <Image src={avatar} width={200} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          style={{ background: "#17a2b8" }}
          onClick={() => handleViewDetails(id)}
          type="primary"
          danger
        >
          View Details
        </Button>
      ),
    },
  ];
  const [dataSource, setDataSource] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      "https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement"
    );
    setDataSource(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Home;
