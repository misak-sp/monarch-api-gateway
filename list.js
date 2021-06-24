const axios = require("axios");
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

exports.handler = async(event) => {
  const cliniciansSerialized = await axios.get("https://rev01.monarch-staging.com/api/clinicians",{
    headers: {
      Authorization: "Basic YmV0YTpoZWFsdGgxMw=="
    }
  });

  let clinicians = null;
  const cliniciansDeserialized = new JSONAPIDeserializer();
  try {
    clinicians = await cliniciansDeserialized.deserialize(cliniciansSerialized.data);
  } catch (e) {
    console.log(e.message);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(clinicians)
  };
};
