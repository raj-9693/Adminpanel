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
