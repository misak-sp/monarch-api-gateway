const axios = require("axios");
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

exports.handler = async(event) => {
  const baseUri = "https://qa02.monarch-staging.com/api/clinicians";
  const cliniciansSerialized = await axios.get(`${baseUri}?page[size]=20&page[number]=100`, {
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
    "data": clinicians,
    "meta": {
      "page": cliniciansSerialized.data.meta.query.page,
      "perPage": cliniciansSerialized.data.meta.query.perPage,
      "pageCount": cliniciansSerialized.data.meta.pageCount,
      "recordCount": cliniciansSerialized.data.meta.recordCount
    },
    "apiUrl": baseUri
  };
};
