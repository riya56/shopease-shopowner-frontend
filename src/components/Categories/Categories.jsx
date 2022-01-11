import React,{useState,useReact, useEffect} from 'react';
import { Card,Modal, Button,Form,Input,InputNumber,Table, Tag, Space,Popconfirm, DatePicker, Typography, message } from 'antd';
import { Link } from "react-router-dom";
import {
  DownloadOutlined,
    DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined
  } from '@ant-design/icons';
  import {
    addCategory,
    updateCategory,
    getCategoryByStoreId,
    getCategory,
    deleteCategory
  } from "./../../services/RequestService";
  import moment from "moment";
import { values } from 'mobx';
  

const Categories = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editCategoryVisible, setEditCategoryVisible] = useState(false);
    const [AddCategoryVisible, setAddCategoryVisible] = useState(false);
    const [formEditCategory] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});  
   const [editRecord, setEditRecord] = useState(null);
    const [formAddCategory] = Form.useForm();
    const [category,setCategory] = useState([]);
    const [tableData, setTableData] = useState([ {
      key: '',
      category:"",
      description:"",
      rackNo: 1,
    dateCreated : ""
    }]);
    /* const [tableData, setTableData] = useState([
        {
          key: '1',
          category:"category1",
          description:"des 1",
          rackNo: 1,
        dateCreated : "12/06/2021"
        },
        {
          key: '2',
          category:"category2",
          description:"des 1",
          rackNo: 4,
        dateCreated: "01/05/2021"
        },
        {
          key: '3',
          category:"category3",
          description:"des 3",
          rackNo: 2,
        dateCreated: "01/05/2021"
        },
      ])  ;
    */
    const onFinish = (values) => {
      console.log(values);
    };

    const showAddCategoryModal = () => {
      setAddCategoryVisible(true);
  };

      const showEditCategoryModal = (record) => {
        console.log(record);
        setEditRecord(record);
        setEditCategoryVisible(true);
        formEditCategory.setFieldsValue({
            category_name : record.category_name,
            description:record.description,
            rackNumber: record.rackNumber
          });
      };
      const handleEditCategorySubmit = () => {
        
        formEditCategory
        .validateFields()  
        .then((values) =>{
          console.log(values);
            updateCategory(
            {
              categoryId:editRecord.categoryId,
            storeId:  JSON.parse(localStorage.getItem("ownerInfo")).store.storeId,
            category_name: values["category_name"],
            description: values["description"],
            rackNumber:values["rackNumber"],
            modifier: JSON.parse(localStorage.getItem("userInfo")).username,
            modified: moment().format("YYYY-MM-DD"),
            fromDate: moment().format("YYYY-MM-DD"),
            })
            .then((data) => {
              console.log(data);
              
              if (data.type !== "error")  {
               // error(unexeceted use of history) history.push("/categories")
                message.success("Category updated successfully!!")
                setEditCategoryVisible(false);
              }
              formEditCategory.resetFields();
              getCategoryFunction()
            })
            .catch((error) => {
              //loaderchange not implemented, check if required
              console.log(error.response)
              if (error) {
                message.error(error.response.data.detail);
              }
            })
        })
      };
    
      const handleEditCategoryCancel = () => {
        setEditCategoryVisible(false);
       
      };
      const handleAddCategoryCancel = () => {
        setAddCategoryVisible(false);
      };
     
      const handleAddCategorySubmit = () => {
        formAddCategory
        .validateFields()  
        .then((values) =>{
          console.log(values);
            addCategory(
            {
            storeId:  JSON.parse(localStorage.getItem("ownerInfo")).store.storeId,
            category_name: values["category"],
            description: values["description"],
            rackNumber:values["rackNo"],
            creator: JSON.parse(localStorage.getItem("userInfo")).username,
            created: moment().format("YYYY-MM-DD"),
            fromDate: moment().format("YYYY-MM-DD"),
            })
            .then((data) => {
              console.log(data);
              
              if (data.type !== "error")  {
               // error(unexeceted use of history) history.push("/categories")
                message.success("Category added successfully!!")
                setAddCategoryVisible(false);
              }
              formAddCategory.resetFields();
              getCategoryFunction()
            })
            .catch((error) => {
              //loaderchange not implemented, check if required
              console.log(error.response)
              if (error) {
                message.error(error.response.data.detail);
              }
            })
        })
        
        

      };
    
     const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter)
      };
    
      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      
      const columns = [
        {
            title: 'Category',
            dataIndex: 'category_name',
            key: 'category_name',
            
            sorter: (a, b) => a.category_name.localeCompare(b.category_name),
            sortOrder: sortedInfo.columnKey === 'category_name' && sortedInfo.order,
            ellipsis: true,
          },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },

        {
          title: 'Rack No.',
          dataIndex: 'rackNumber',
          key: 'rackNumber',
          
        },  
      
        {
          title: '',
          key: 'action',
          width:80,
          render: (text, record) => (
              
              <EditOutlined style={{color:"blue"}} onClick={() => showEditCategoryModal(record)}/>
           
          ),
        },
      
          {
            title: '',
            key: 'action',
           width:80,
            render: (text, record) => (
                <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(record.categoryId)}>
                <DeleteOutlined style={{color:"red"}}/>
              </Popconfirm>
            ),
          },
       
      ];
    
      const handleDelete = (key) => {
       console.log(key);
        deleteCategory(key)
        .then((data)=>{
          console.log(data);
          
          getCategoryFunction()
            message.success(data.message);
         
        })
        

       let newFilteredData = tableData.filter((record) => record.key != key);
       
      setTableData(newFilteredData);
      };
      const getCategoryFunction = () => {
        getCategoryByStoreId(JSON.parse(localStorage.getItem("ownerInfo")).store.storeId)
        .then((data) => {
          console.log(data);
          setCategory(
            data
          )
          })
        .catch((error) => {
          console.log(error.response)
          if (error) {
            message.error(error.response.data.message);
          }
        });
      }
      useEffect(() => {
        getCategoryFunction()
    }, []); 
    return ( 
        <>

        <Button  type="primary" onClick={showAddCategoryModal} >
            Add Category
        </Button>

        <Modal title="Add New Category"
        visible={AddCategoryVisible}
          onCancel={handleAddCategoryCancel}
          footer={
            [
            <Button key="back" onClick={handleAddCategoryCancel}>
              Cancel
            </Button>,
             <Button key="submit" type="primary submit" onClick={handleAddCategorySubmit}>
              Submit
            </Button>
            ]
          }
          >
          <Form  form={formAddCategory}>
            <Form.Item
              name="category" label="Category"
              rules={[
                {
                  required: true,
                  message: "Please input Category name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description"  label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item name="rackNo" label="Rack No" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>

          </Form>
      </Modal>
         <Table columns={columns} scroll={{ y: 500 }} dataSource={category} onChange={handleChange}/>
         <Modal title="Edit Category" visible={editCategoryVisible}  onCancel={handleEditCategoryCancel} footer={[

            <Button key="submit" type="primary" onClick={handleEditCategorySubmit}>
              Submit
            </Button>,
            
          ]}>
      <Form form={formEditCategory} initialValues={{ size: "small" }}>
                    <Form.Item
                     name="category_name" 
                     rules={[
                        {
                            required: true,
                            message: "Please input category name!",
                        },
                        ]}
                    >
                        <Input placeholder="Category Name"  />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[
                        {
                            required: true,
                            message: "Please input description!",
                        },
                        ]}
                    >
                        <Input placeholder="Description"  />
                    </Form.Item>
                    <Form.Item
                        name="rackNumber"
                        rules={[
                        {
                            required: true,
                            message: "Please input Rack no.!",
                        },
                        ]}
                    >
                        <Input placeholder="Rack No."  />
                    </Form.Item>
                    
                   
                </Form>
      </Modal>
    </>
     );
}
 
export default Categories;