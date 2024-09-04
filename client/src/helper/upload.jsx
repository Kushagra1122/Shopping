const url = `https://api.cloudinary.com/v1_1/dypgk6xao/auto/upload`;

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "General Store");

  const response = await fetch(url, {
    method: "post",
    body: formData,
  });
  console.log(response);
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
};

export default uploadFile;
