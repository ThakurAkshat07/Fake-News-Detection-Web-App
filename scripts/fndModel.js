import child_process from "child_process";
import path from "path";
import { fileURLToPath } from "url";
const { spawn } = child_process;

const predictNews = async (news) => {
  let prediction = null;
  await new Promise((res, rej) => {
    // finding the directory name of our script
    const fileName = fileURLToPath(import.meta.url);
    const dirName = path.dirname(fileName);

    // absolute path to our script
    const scriptPath = dirName + "/run_script.py";

    // Executing python script using spawn method of child_process
    const response = spawn("python", [scriptPath, news]);

    // Each time python script returns generates terminal o/p
    // we update that into our prediction
    response.stdout.on("data", (terminalOp) => {
      let data = terminalOp.toString();
      prediction = data[0];
    });

    // When the child_process is executed, we resolve our promise with final prediction
    response.on("close", (code) => {
      console.log(
        "The python script invoked as child process exited with code",
        code
      );
      res(prediction);
    });
  });
  //console.log(prediction);
  return prediction;
};
// predictNews(
//   "'Want to achieve parity': India on decision to reduce Canadian diplomats amid row"
// );
export default predictNews;
