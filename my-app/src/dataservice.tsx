import axios from "axios";

export async function postData(url = "", data = {}) {
  const res = await axios({
    method: "post",
    url,
    timeout: 0, // Let's say you want to wait at least 8 seconds
    data: JSON.stringify(data),
  });

  return res.data;
}
