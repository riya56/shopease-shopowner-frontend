import React,{useState,useReact, useEffect} from 'react';
import { Card,Modal, Button,Form,Input,InputNumber,Table, Tag, Space,Popconfirm, DatePicker, Typography, message } from 'antd';
import { Link } from "react-router-dom";
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import {
  DownloadOutlined,
    DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined
  } from '@ant-design/icons';
 import { values } from 'mobx';

 const Order = () => {
    const [sortedInfo, setSortedInfo] = useState({});   
    const [attendOrderVisible, setAttendOrderVisible] = useState(false);
    const [tableData, setTableData] = useState([
        {
          orderId: '1',
          amount: 'CAD 12.5',
          status: "picked-up",
        },
        {
            orderId: '2',
            amount: 'CAD 12.5',
            status: "picked-up",
          },
  
          {
            orderId: '7',
            amount: 'CAD 12.5',
            status: "pending",
          },
    ]);
   const showAttendOrderModal = () =>
    {
            setAttendOrderVisible(true);
    };
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter)
      };
    const handleAttendOrderCancel = () => {
        setAttendOrderVisible(false);
      };
      const handleAttendOrderDelete = () => {
        /* write code/API for deleting the order
        render: (text, record) => (
            <Popconfirm title="Sure to delete order?(Order once deleted can't be recovered)"
              onConfirm={() => handleOrderDeleteConfirm(record.key)}>
            <DeleteOutlined style={{color:"red"}}/>
          </Popconfirm>
        )
        */
      };
      
      const handleOrderDeleteConfirm = (key) => {
        console.log(key);
        let newFilteredData = tableData.filter((record) => record.key != key);
        setTableData(newFilteredData);
        // write delete API here
       };

       const handleAttendOrderEdition = () => {
        setAttendOrderVisible(false);
        // write put API here

       };

       const columns = [
        {
            title: 'Order No.',
            dataIndex: 'orderId',
            key: 'orderId',
          }, 
          {
            title: 'Amount receiveable',
            dataIndex: 'amount',
            key: 'amount',
            
          },    
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
            ellipsis: true,
          },
          {
            title: 'Attend',
            key: 'action',
            width:80,
            render: (text, record) => (  
                <EditOutlined style={{color:"blue"}} onClick={showAttendOrderModal}/>    
            )
          }
        ];
     
        return ( 
            <>
    
            { /* give use state in place of tableData in datasource */ }
             <Table columns={columns} dataSource={tableData} onChange={handleChange}/>
 
    {/* AttendOrder modal start  */}
        <Modal title="Attend Order" visible={attendOrderVisible} onCancel={handleAttendOrderCancel}
          footer={[
            <Button key="delete" onClick={handleAttendOrderDelete}>
              Cancel Order
            </Button>,
             <Button key="save" type="primary submit" onClick={handleAttendOrderEdition}>
              Save changes
            </Button>
            ]}
        >
                        
            <Form.Item name="orderId"  label="Order ID">
              <Input.TextArea  />
           </Form.Item>

           <Form.Item name="product"  label="Products">
              <Input.TextArea  />
           </Form.Item>

           <Form.Item name="discount"  label="Discounted Amount">
              <Input.TextArea  />
           </Form.Item>


           <Form.Item name="amount"  label="Amount Receiveable">
              <Input.TextArea  />
           </Form.Item>


           <Form.Item name="Due Date"  label="Due Date">
              <Input.TextArea  />
           </Form.Item>

           <RadioGroup horizontal>
             {/* onChange={ this.onChange } */}
  <RadioButton value="pending">
    Pending
  </RadioButton>
  <RadioButton value="picked-up">
    Picked-up
  </RadioButton>
  <RadioButton value="ready">
    Ready
  </RadioButton>

   <ReversedRadioButton value="melon">
    Melon
  </ReversedRadioButton>        
        </RadioGroup> 
          </Modal>
        </>
         );
      
    
    
    }

    export default Order;

