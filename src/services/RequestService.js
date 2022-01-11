import RestfulProvider from "../utils/RestfulProvider";


  const register = (data) => {
    return RestfulProvider.post("api/register/", data);
  };
  const login = (data) => {
    return RestfulProvider.post("api/login/", data);
  };
  const logout = (data) => {
    return RestfulProvider.post("api/logout/", data);
  };
  const getUserStore = (id) => {
    return RestfulProvider.get("api/store/getStoreByOwnerId/"+id);
  };
  const addStore = (data) => {
    return RestfulProvider.post("api/store/addStore/", data);
  }; 

  const addCategory = (data) => {
    return RestfulProvider.post("api/category/addCategory/", data);
  }; 
  const updateCategory = (data) => {
    return RestfulProvider.put("api/category/updateCategory/"+data.categoryId, data);
  }; 
  const getCategoryByStoreId = (id) =>{
    return RestfulProvider.get("api/category/getCategoryByStoreId/"+id);
  };

 const deleteCategory = (id) =>{
    return RestfulProvider.delete("api/category/deleteCategory/"+id);
 };
 const getCategory = () =>{
  return RestfulProvider.get("api/category/getCategory");
};

 

  const addProduct = (data) => {
    return RestfulProvider.post("api/product/addProduct/", data);
  }; 
  const updateProduct = (data) => {
    return RestfulProvider.put("api/product/updateProduct/"+data.productId, data);
  }; 
  const getProduct = () =>{
    return RestfulProvider.get("api/product/getProduct/");
  };
  const getProductByStoreId = (id) =>{
    return RestfulProvider.get("api/product/getProductByStoreId/"+id);
  };
 const deleteProduct = (id) =>{
    return RestfulProvider.delete("api/product/deleteProduct/"+id);
 };


  const verifyEmail = (token) => {
    return RestfulProvider.get("api/email-verify/?token="+token);
  };
const requestResetEmail = (data) =>{
  return RestfulProvider.post("api/request-reset-email/",data)
}
const passwordResetTokenCheck = (uidb,token) =>{
  return RestfulProvider.get("api/password-reset/"+uidb+"/"+token)
}
const passwordResetComplete = (data) =>{
  return RestfulProvider.patch("api/password-reset-complete/",data)
}
const getOwnerByEmail = (email) =>{
  return RestfulProvider.get("api/getOwnerByEmail/?email="+email)
}
const updateStore = (data) => {
  return RestfulProvider.put("api/store/updateStore/", data);
}; 
  export {
      register,
      login,
      logout,
      getUserStore,
      addStore,

      addCategory,
      getCategory,
      updateCategory,
      getCategoryByStoreId,
      deleteCategory,
  
      addProduct,
      updateProduct,
      getProduct,
      getProductByStoreId,
      deleteProduct,


      verifyEmail,
      requestResetEmail,
      passwordResetTokenCheck,
      passwordResetComplete,

      getOwnerByEmail,
      updateStore
  };

