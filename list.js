const axios = require("axios");
const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;

exports.handler = async(event) => {
  console.log("EVENT DUMP:", event);
  const page = event.query.page || 1;
  const count = event.query.count || 10;
  const baseUri = "https://qa02.monarch-staging.com";
  const cliniciansSerialized = await axios.get(`${baseUri}/api/clinicians?page[number]=${page}&page[size]=${count}`, {
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
      "per_page": cliniciansSerialized.data.meta.query.perPage,
      "page_count": cliniciansSerialized.data.meta.pageCount,
      "record_count": cliniciansSerialized.data.meta.recordCount
    },
    "api_url": baseUri
  };
};
