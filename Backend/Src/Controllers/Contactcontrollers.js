const contactDeta=require("../../Src/models/ContactSchema")

const PostDeta = async (req, res) => {
  const data = req.body;

  if (
    !data.titalPrime ||
    !data.titalTech ||
    !data.titalBase ||
    !data.contactCards
    
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const Deta = await contactDeta.create({
      titalPrime: data.titalPrime,
      titalTech: data.titalTech,
      titalBase: data.titalBase,
      
      contactCards:data.contactCards,
      
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

const GetDeta = async (req, res) => {
  try {
    const Deta = await contactDeta.find()

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Contact: Deta,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

module.exports={PostDeta, GetDeta}

