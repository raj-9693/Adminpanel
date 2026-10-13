
const HomesDeta=require("../../Src/models/HomeSchema")

const PostDeta = async (req, res) => {
  const data = req.body;

  if (
    !data.titalPrime ||
    !data.titalTech ||
    !data.titalBase ||
    !data.Bridesitem ||
    !data.years ||
    !data.review
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const Deta = await HomesDeta.create({
      titalPrime: data.titalPrime,
      titalTech: data.titalTech,
      titalBase: data.titalBase,
      Bridesitem: data.Bridesitem,
      years: data.years,
      review: data.review,
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


module.exports={PostDeta}