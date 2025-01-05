import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => name, // name is a string
    
  },
  {
    title: 'Email',
    dataIndex: 'email',
   
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
];

const SellerListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/auth/userByRole/seller`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const  results  = response.data;
      console.log('API Response:', results); // Log response to check data
      setData(results || []); // Ensure results is an array
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200, // Mock data, should be fetched from the API in real use case
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className='m-20'>
      <h2 className="text-2xl font-bold text-gray-800 mb-5">Seller List</h2>
      <Table
        columns={columns}
        rowKey={(record) => record._id} // Use _id from the response
        dataSource={data}
        // pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default SellerListing;