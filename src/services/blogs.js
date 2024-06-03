import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = async () => {
  try {
    const request = await axios.get(baseUrl);
    return request.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getAll };
