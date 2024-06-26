import { Image, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.scss";
const Details = () => {
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
      title: "Image",
      dataIndex: "avatar",
      render: (avatar) => <Image src={avatar} width={100} />,
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
    },
  ];
  const { id } = useParams();
  const [dataSource, setDataSource] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      `https://662f3bdb43b6a7dce30ec40b.mockapi.io/staffManagement/${id}`
    );
    setDataSource([...dataSource, response.data]);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="table">
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Details;
