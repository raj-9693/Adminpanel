const ReviewsDeta=require("../../Src/models/ReviewsSchema")

const PostDeta = async (req, res) => {
  const data = req.body;

  if (
    !data.titalPrime ||
    !data.titalTech ||
    !data.titalBase ||

    !data.titalheader||
    !data.titaldes||

    !data.processSteps||
    !data.artistsCard
    
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const Deta = await ReviewsDeta.create({
      titalPrime: data.titalPrime,
      titalTech: data.titalTech,
      titalBase: data.titalBase,

      profiles: data.profiles,
      titalheader: data.titalheader,
      titaldes: data.titaldes,

      processSteps: data.processSteps,
      artistsCard: data.artistsCard,
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
    const Deta = await ReviewsDeta.find()

    return res.status(200).json({
      success: true,
      message: "Deta Sends Sucessfull",
      Reviews: Deta,
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

module.exports={PostDeta, GetDeta}

