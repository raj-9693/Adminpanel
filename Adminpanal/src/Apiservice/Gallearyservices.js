import Apiaxios from "../api/apiClients";


export const getDetaGallery = async () => {
  const BaseUrl = "/Api/gallery/getDeta";
  console.log(`🚀 [API START] - Calling GET-Gallery (Deta) | Endpoint: ${BaseUrl}`);
  try {
    const response = await Apiaxios.get(BaseUrl);
    console.log(`✅ [API SUCCESS] - GalleryDeta Successful | Success: ${response.data?.success} | Status: ${response.status} | message: ${response.data?.message}`);
    console.log("📬 [RESPONSE DATA]", JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - GalleryDeta Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - getDetaGallery | ${err.message} || Check Network`);
    }
    throw err;
  }
};


export const putDetaGallery = async (data) => {
  const BaseUrl = "/Api/gallery/putDeta";
  console.log(`🚀 [API START] - Calling PUT-Gallery (Deta) | Endpoint: ${BaseUrl}`);
  try {
    const response = await Apiaxios.put(BaseUrl, data);
    console.log(`✅ [API SUCCESS] - Gallery PUT Successful | Success: ${response.data?.success} | Status: ${response.status} | message: ${response.data?.message}`);
    console.log("📬 [RESPONSE DATA]", JSON.stringify(response.data, null, 2));
    return response;
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - Gallery PUT Failed | Success: ${err.response?.data?.success} | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - putDetaGallery | ${err.message} || Check Network`);
    }
    throw err;
  }
};


// Image upload: ek File/Blob object lo, ImageKit pe upload karo, URL wapas lo
// Parameter: imageFile — File object ya Blob (base64 nahi, actual file chahiye)
export const postImageGallery = async (imageFile) => {
  const BaseUrl = "/Api/upload";
  console.log(`🚀 [API START] - Calling POST-Upload (Gallery Image) | Endpoint: ${BaseUrl}`);
  try {
    const formData = new FormData();
    formData.append("image", imageFile); // key "image" — backend multer yahi expect karta hai

    const response = await Apiaxios.post(BaseUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log(`✅ [API SUCCESS] - Gallery Image Upload Successful | Status: ${response.status} | url: ${response.data?.image}`);
    return response; // response.data.image = ImageKit URL
  } catch (err) {
    if (err.response) {
      console.error(`❌ [API ERROR] - Gallery Image Upload Failed | Status: ${err.response?.status} | message: ${err.response?.data?.message}`);
      console.error("🔍 [SERVER ERROR BODY]", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ [NETWORK ERROR] - postImageGallery | ${err.message} || Check Network`);
    }
    throw err;
  }
};
