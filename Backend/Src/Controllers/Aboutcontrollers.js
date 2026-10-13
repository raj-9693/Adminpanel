
const AboutDeta=require("../../Src/models/AboutSchema")

const PostDeta = async (req, res) => {
  const data = req.body;

  if (
    !data.titalPrime ||
    !data.titalTech ||
    !data.titalBase 
   
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const Deta = await AboutDeta.create({
      titalPrime: data.titalPrime,
      titalTech: data.titalTech,
      titalBase: data.titalBase,
      
    });

    return res.status(201).json({
      success: true,
      message: "Deta Post Sucessfull",
      Deta: Deta,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get deta

const GetDeta=async(req,res)=>{
  try{
    const Deta=await AboutDeta.find();
    return res.status(200).json({
      success:true,
      message:"Deta Sucessful send",
      aboutdeta:Deta

    })

  }catch(error){
console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
}}



module.exports={PostDeta,GetDeta}

