import Apiaxios from "../api/apiClients";


export const getDetaServices = async () => {
  const BaseUrl = "/Api/services/getDeta";
  console.log(`🚀 [API START] - Calling GET-Services (Deta) | Endpoint: ${BaseUrl}`);
  try {
    const response = await Apiaxios.get(BaseUrl);
    console.log(`✅ [API SUCCESS] - ServicesDeta Successful | Success: ${response.data?.success} | Status: ${response.status} | message: ${response.data?.message}`);
    console.log("📬 [RESPONSE DATA]", JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - ServicesDeta Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - getDetaServices | ${err.message} || Check Network`);
    }
    throw err;
  }
};


export const putDetaServices = async (data) => {
  const BaseUrl = "/Api/services/putDeta";
  console.log(`🚀 [API START] - Calling PUT-Services (Deta) | Endpoint: ${BaseUrl}`);
  try {
    const response = await Apiaxios.put(BaseUrl, data);
    console.log(`✅ [API SUCCESS] - Services PUT Successful | Success: ${response.data?.success} | Status: ${response.status} | message: ${response.data?.message}`);
    console.log("📬 [RESPONSE DATA]", JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - Services PUT Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - putDetaServices | ${err.message} || Check Network`);
    }
    throw err;
  }
};


// Image upload: ek File/Blob object lo, ImageKit pe upload karo, URL wapas lo
export const postImageServices = async (imageFile) => {
  const BaseUrl = "/Api/upload";
  console.log(`🚀 [API START] - Calling POST-Upload (Services Image) | Endpoint: ${BaseUrl}`);
  try {
    const formData = new FormData();
    formData.append("image", imageFile); // key "image" — backend multer yahi expect karta hai

    const response = await Apiaxios.post(BaseUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(`✅ [API SUCCESS] - Services Image Upload Successful | Status: ${response.status} | url: ${response.data?.image}`);
    return response; // response.data.image = ImageKit URL
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - Services Image Upload Failed | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - postImageServices | ${err.message} || Check Network`);
    }
    throw err;
  }
};
