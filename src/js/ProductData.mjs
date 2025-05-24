const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function sortByPrice(result) {
  return result.sort((a,b) => a.FinalPrice - b.FinalPrice);
}

export default class ProductData {
  constructor(){

  }
  
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    const sort = sortByPrice(data.Result)
    return sort;
  }
  async findProductById(id) {
    const products = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(products);
    console.log(data.Result);
    return data.Result;
  }
}
