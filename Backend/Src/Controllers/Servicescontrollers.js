const servicesDeta=require("../../Src/models/ServicesSchema")

const PostDeta = async (req, res) => {
  const data = req.body;

  if (
    !data.titalPrime ||
    !data.titalTech ||
    !data.titalBase ||
    
     // Arrays deta
    !data.cards||
    !data.tableRows
   
    
    
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required Raj bahi " });
  }

  try {
    const Deta = await servicesDeta.create({

       
   
      titalPrime: data.titalPrime,
      titalTech: data.titalTech,
      titalBase: data.titalBase,

     cards: data.cards,
     tableRows: data.tableRows,

             
      
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
    const Deta = await servicesDeta.find()

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Services: Deta,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

module.exports={PostDeta, GetDeta}

