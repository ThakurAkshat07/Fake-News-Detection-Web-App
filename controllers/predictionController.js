import predictNews from "../scripts/fndModel.js";
const predictController = async (req, res) => {
  try {
    console.log(req.params.news);
    const data = await predictNews(req.params.news);
    res.status(200).send({
      status: "success",
      prediction: data,
    });
  } catch (error) {
    res.status(400).send({
      status: "failure",
      message: error,
    });
  }
};

export default predictController;
