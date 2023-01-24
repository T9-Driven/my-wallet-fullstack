import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5008";

export function createTransaction(body, type, jwt) {
  const transaction = {
    ...body,
    type,
  };

  const response = axios
    .post(`${REACT_APP_API_URL}/transactions`, transaction, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((err) => {
      return err.response;
    });
  return response;
}

export function findAllTransactions(jwt) {
  const response = axios
    .get(`${REACT_APP_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    .catch((err) => {
      return err.response;
    });

  return response;
}
