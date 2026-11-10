import Apiaxios from "../api/apiClients";


export const getDetaHome = async () => {
  const BaseUrl = "/Api/home/getDeta";
  console.log(`🚀 [API START] - Calling GET-Home (Deta) | Endpoint: ${BaseUrl}`);
  try {
    const response = await Apiaxios.get(BaseUrl);
    console.log(`✅ [API SUCCESS] - HomeDeta Successful | Success: ${response.data?.success} | Status: ${response.status} | message: ${response.data?.message}`);
    console.log("📬 [RESPONSE DATA]", JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - HomeDeta Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - getDetaHome | ${err.message} || Check Network`);
    }
    throw err;
  }
};


export const putDetaHome = async (data) => {
  const BaseUrl = "/Api/home/putDeta";
  console.log(`🚀 [API START] - Calling PUT-Home (Deta) | Endpoint: ${BaseUrl}`);
  try {
    const response = await Apiaxios.put(BaseUrl, data);
    console.log(`✅ [API SUCCESS] - Home PUT Successful | Success: ${response.data?.success} | Status: ${response.status} | message: ${response.data?.message}`);
    console.log("📬 [RESPONSE DATA]", JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - Home PUT Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - putDetaHome | ${err.message} || Check Network`);
    }
    throw err;
  }
};

// Image upload: ek File/Blob object lo, ImageKit pe upload karo, URL wapas lo
// Parameter: imageFile — File object ya Blob (base64 nahi, actual file chahiye)
export const postImageHome = async (imageFile) => {
  const BaseUrl = "/Api/upload";
  console.log(`🚀 [API START] - Calling POST-Upload (Image) | Endpoint: ${BaseUrl}`);
  try {
    const formData = new FormData();
    formData.append("image", imageFile); // key "image" — backend multer yahi expect karta hai

    const response = await Apiaxios.post(BaseUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(`✅ [API SUCCESS] - Image Upload Successful | Status: ${response.status} | url: ${response.data?.image}`);
    return response; // response.data.image = ImageKit URL
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - Image Upload Failed | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - postImageHome | ${err.message} || Check Network`);
    }
    throw err;
  }
};

