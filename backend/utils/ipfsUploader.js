const axios = require('axios');
const FormData = require('form-data');

const pinataApiUrl = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretKey = process.env.PINATA_SECRET_KEY;

exports.uploadToIPFS = async (file) => {
  const form = new FormData();
  form.append('file', file);
  
  const res = await axios.post(pinataApiUrl, form, {
    headers: {
      ...form.getHeaders(),
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretKey,
    },
  });

  return res.data;
};
