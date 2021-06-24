const axios = require("axios");

exports.handler = async(event) => {
  const clinicians = await axios.get("https://meetmonarch.com/api/clinicians");

  let resp = { data: [] };

  clinicians.data.data.forEach(c => {
    resp.data.push(c);
  });

  return {
    statusCode: 200,
    body: { test: 1 }
  };
};
