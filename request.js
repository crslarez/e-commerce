const API_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  try {
    const request = await (await fetch(API_URL)).json();
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const getSearchProducts = async (search) => {
  try {
    const request = await (await fetch(API_URL + search)).json();
    console.log(request);
    return request;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id, newValue = {}) => {
  try {
    const propertyById = await getSearchProducts("/" + id);
    let response = await fetch(API_URL + "/" + id, {
      method: "PUT",
      body: JSON.stringify({ ...propertyById, ...newValue }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};