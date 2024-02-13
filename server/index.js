const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post("/compile", (req, res) => {
  //getting the required data from the request
  let code = req.body.code;
  let language = req.body.language;
  let input = req.body.input;

  if (language === "python") {
    language = "python3";
  }

  if (language === "C++") {
    language = "cpp";
  }
  if (language === "C") {
    language = "c";
  }

  let data = {
    language: language,
    version: "latest",
    code: code,
    input: input,
  };

  const options = {
    method: "POST",
    url: "https://online-code-compiler.p.rapidapi.com/v1/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "838197df65mshb50be832a93a68dp1ed45cjsneb48fa59543b",
      "X-RapidAPI-Host": "online-code-compiler.p.rapidapi.com",
    },
    data: data,
  };
  //calling the code compilation API
  axios(options)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
