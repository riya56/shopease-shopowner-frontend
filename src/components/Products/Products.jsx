import React,{useState,useReact, useEffect} from 'react';
import { Card,Modal, Button,Form,Input,InputNumber,Table, Tag, Space,Popconfirm, Select, message,Upload,Progress } from 'antd';
import { Link } from "react-router-dom";
import {
  DownloadOutlined,
    DeleteColumnOutlined,
  DeleteOutlined,
  EditOutlined
  } from '@ant-design/icons';
  import {
    addProduct,
    updateProduct,
    getProduct,
    deleteProduct,
    getCategory,
    getCategoryByStoreId,
    getProductByStoreId
  } from "./../../services/RequestService";
  import moment from "moment";
  import axios from "axios"

  const { Option } = Select;
  const Products = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editProductVisible, setEditProductVisible] = useState(false);
    const [AddProductVisible, setAddProductVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [formEditProduct] = Form.useForm();
    const [sortedInfo, setSortedInfo] = useState({});  
    const [categoriesDropdown, setCategoriesDropdown] = useState([])
    const [formAddProduct] = Form.useForm();
    const [editRecord, setEditRecord] = useState(null);
    const [tableData, setTableData] = useState([ {
      key: '',
      category:"",
      description:"",
      rackNo: 1,
    dateCreated : ""
    }]);
    const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

    const onFinish = (values) => {
        console.log(values);
      };
  
      const showAddProductModal = () => {
        setAddProductVisible(true);
    };

    const showEditProductModal = (record) => {
      console.log(record);
        setEditProductVisible(true);
       setEditRecord(record)
        formEditProduct.setFieldsValue({
          
          category:record.categoryId,
          product_name: record.product_name,
          description: record.description,
          quantity:record.quantity,
          price:record.price,
          discount:record.discount,
          company:record.company,
          }); 
      };
      const handleEditProductSubmit = () => {
        formEditProduct
        .validateFields()  
        .then((values) =>{
          console.log(values);
            updateProduct({
              storeId:  JSON.parse(localStorage.getItem("ownerInfo")).store.storeId,
              categoryId:values["category"],
              product_name: values["product_name"],
              description: values["description"],
              quantity:values["quantity"],
              price:values["price"],
              discount:values["discount"],
              company:values["company"],
              modifier: JSON.parse(localStorage.getItem("userInfo")).username,
              modified: moment().format("YYYY-MM-DD"),
             productId:editRecord.productId
            })
            .then((data) => {
              console.log(data);
              setEditProductVisible(false);
              if (data.type !== "error")  {
                getProductFunction()
                message.success("Product updated successfully!!")
                setAddProductVisible(false);
              }
              formAddProduct.resetFields();
            })
            .catch((error) => {
              //loaderchange not implemented, check if required
              console.log(JSON.stringify(error.response.data))
             
                message.error(JSON.stringify(error.response.data.price));
              
            })


        })
       
      };
    
      const handleEditProductCancel = () => {
        // setIsModalVisible(false);
        setEditProductVisible(false);
      };
      const handleAddProductCancel = () => {
        setAddProductVisible(false);
      };
     
      const handleAddProductSubmit = () => {
        /*removed time out function with loading     if(createdAt.getTime() > expiredAt.getTime()){  setErrorMessage("Expire date should be later")  }*/
          formAddProduct
          .validateFields()  
          .then((values) =>{
            console.log(values);
              addProduct({
                storeId:  JSON.parse(localStorage.getItem("ownerInfo")).store.storeId,
                categoryId:values["category"],
                product_name: values["product_name"],
                description: values["description"],
                quantity:values["quantity"],
                price:values["price"],
                discount:values["discount"],
                company:values["company"],
                creator: JSON.parse(localStorage.getItem("userInfo")).username,
                created: moment().format("YYYY-MM-DD"),
                fromDate: moment().format("YYYY-MM-DD"),
              })
              .then((data) => {
                console.log(data);
                setAddProductVisible(1)
                if (data.type !== "error")  {
                  getProductFunction()
                  message.success("Product added successfully!!")
                  setAddProductVisible(false);
                }
                formAddProduct.resetFields();
              })
              .catch((error) => {
                //loaderchange not implemented, check if required
                console.log(error.response)
                if (error) {
                  message.error((error.response.data.price[0]));
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
           const onFileChange = event => {
    
              // Update the state
              setImage(event.target.files[0]);
            
            };
            
            // On file upload (click the upload button)
          const  onFileUpload = (record) => {
            console.log(record);
              // Create an object of formData
              const formData = new FormData();
            
              // Update the formData object
              formData.append(
                "imagePath",
               image,
               
              );
              formData.append(
                "title",
               record.productId,
               
              );
            
              // Details of the uploaded file
              console.log(image);
            
              // Request made to the backend api
              // Send formData object
              axios.post("http://ec2-52-56-96-88.eu-west-2.compute.amazonaws.com/api/upload/", formData);
            };
        const columns = [
          // {
          //   title: '',
          //   key: 'action',
          //  width:200,
          //   render: (text, record) => (
               
          //   ),
          // },
        {
            title: 'Product',
            dataIndex: 'product_name',
            key: 'product_name',
            sorter: (a, b) => a.product_name.localeCompare(b.product_name),
            sortOrder: sortedInfo.columnKey === 'product_name' && sortedInfo.order,
            ellipsis: true,
        },
        {
          title: 'Category',
          dataIndex: 'categoryId',
          key: 'categoryId',
          render: (text, record) => (
            categoriesDropdown.map((category)=>{
              return(
                category.categoryId == record.categoryId ? category.category_name : ""
              )
             
            })
        ),
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },

        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          width:90,
        },  
      {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          width:80,
        }, 
        {
          title: 'Discount',
          dataIndex: 'discount',
          key: 'discount',
          width:90,
        },  
       
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          
        }, 
        {
          title: 'Ingredients',
          dataIndex: 'ingredients',
          key: 'ingredients',
          
        }, 
        {
            title: '',
            key: 'action',
            width:80,
            render: (text, record) => (
                
                <EditOutlined style={{color:"blue"}} onClick={() => showEditProductModal(record)}/>
             
            ),
          },
        
            {
              title: '',
              key: 'action',
             width:80,
              render: (text, record) => (
                  <Popconfirm title="Sure to delete?"  onConfirm={() => handleDelete(record.productId)}>
                  <DeleteOutlined style={{color:"red"}}/>
                </Popconfirm>
              ),
            },
         
        ];
      
        const handleDelete = (key) => {
         console.log(key);
         deleteProduct(key)
        .then((data)=>{
          console.log(data);
          
          getProductFunction()
            message.success(data.message);
          
        })
         let newFilteredData = tableData.filter((record) => record.key != key);

         setTableData(newFilteredData);
      };
      const getProductFunction = () => {
        getProductByStoreId(JSON.parse(localStorage.getItem("ownerInfo")).store.storeId)
        .then((data) => {
          console.log(data);
          setProducts(
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
      const getCategoryFunction = () => {
        getCategoryByStoreId(JSON.parse(localStorage.getItem("ownerInfo")).store.storeId)
        .then((data) => {
          console.log(data);
          setCategoriesDropdown(
            data
          )
          })
        .catch((error) => {
          console.log(error.response)
          if (error) {
            // message.error(error.response.data.detail);
          }
        });
      }
      useEffect(() => {
        getProductFunction()
        getCategoryFunction()
    }, []); 
    return ( 
        <>

        <Button  type="primary" onClick={showAddProductModal} >
            Add Product
        </Button>

        <Modal title="Add New Product"
        visible={AddProductVisible}
          onCancel={handleAddProductCancel}
          footer={
            [
            <Button key="back" onClick={handleAddProductCancel}>
              Cancel
            </Button>,
             <Button key="submit" type="primary submit" onClick={handleAddProductSubmit}>
              Submit
            </Button>
            ]
          }
          >
              <Form  form={formAddProduct} onFinish={onFinish} validateFields={validateMessages}>
            <Form.Item
              name="product_name" label="Product"
              rules={[
                {
                  required: true,
                  message: "Please input Product name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description"  label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                {
                  required: true,

                  message: "please select category",
                },
              ]}
            >
             
              <Select placeholder="Select a category" onSelect={(option)=>console.log(option)}>
                {categoriesDropdown.map((category) => {
              return (
                <Option key={category.categoryId} value={category.categoryId} >
                  {category.category_name}
                </Option>
              );
            })}
              </Select> 
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ type: 'number', min: 0}]}>
            <InputNumber />
            </Form.Item>

            <Form.Item name="discount" label="Discount" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
            </Form.Item>

           
             <Form.Item name="company" label="Company">
               <Input />
             </Form.Item>

             <Form.Item name="ingredients"  label="Ingredients">
              <Input.TextArea />
            </Form.Item>

            

           </Form>
       </Modal>
 
          <Table rowKey={(record) => record.productId} columns={columns} 
          scroll={{ y: 400 }} 
           expandable={{
              expandedRowRender: record =>  <>
              <input type="file" onChange={onFileChange} />
                <button onClick={()=>onFileUpload(record)}>
                  Upload!
                </button>
             </>,
              rowExpandable: record => record.name !== 'Not Expandable',
            }} 
            dataSource={products} 
            onChange={handleChange}/>
          <Modal title="Edit Product" visible={editProductVisible}  onCancel={handleEditProductCancel} footer={[
            
             <Button key="submit" type="primary" onClick={handleEditProductSubmit}>
               Submit
             </Button>,
             
           ]}>

                <Form form={formEditProduct} initialValues={{ size: "small" }}>
                    <Form.Item
              // how will the value get mapped ? should not there be uneditabel fields like date created?
                     //   dataIndex="category"
                     name="product_name" 
                     rules={[
                        {
                            required: true,
                            message: "Please input product name!",
                        },
                        ]}
                    >
                        <Input placeholder="Product Name"  />
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
                      name="category"
                      label="Category"
                      rules={[
                        {
                          required: true,

                          message: "please select category",
                        },
                      ]}
                    >
                    
                      <Select placeholder="Select a category" onSelect={(option)=>console.log(option)}>
                        {categoriesDropdown.map((category) => {
                      return (
                        <Option key={category.categoryId} value={category.categoryId} >
                          {category.category_name}
                        </Option>
                      );
                    })}
                      </Select> 
                    </Form.Item>
                    <Form.Item
                        name="quantity"
                        rules={[
                        {
                            required: true,
                            message: "Please input Quantity no.!",
                        },
                        ]}
                    >
                        <Input placeholder="Quantity"  />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[
                        {
                            required: true,
                            message: "Please input Price",
                        },
                        ]}
                    >
                        <Input placeholder="Price"  />
                    </Form.Item>

                    <Form.Item
                        name="discount"
                        rules={[
                        {
                            required: true,
                            message: "Please input Discount",
                        },
                        ]}
                    >
                        <Input placeholder="Discount"  />
                    </Form.Item>

                    <Form.Item
                        name="company"
                        rules={[
                        {
                            required: true,
                            message: "Please input Company name!",
                        },
                        ]}
                    >
                        <Input placeholder="Company"  />
                    </Form.Item>
                    
                    <Form.Item
                        name="ingredients"
                        rules={[
                        {
                           
                            message: "Please input ingredients!",
                        },
                        ]}
                    >
                        <Input placeholder="Ingredients"  />
                    </Form.Item>
                   
                  
            
                    </Form>
          </Modal>
          {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form form={formStore} initialValues={{ size: "small" }}>
                    <Form.Item
                        name="storeName"
                        rules={[
                        {
                            required: true,
                            message: "Please input store name!",
                        },
                        ]}
                    >
                        <Input placeholder="Store Name"  />
                    </Form.Item>
                </Form>
      </Modal> */}
    </>
     );
}
 
export default Products;
  