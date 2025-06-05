const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  const data = res.json()
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data};
  }
}

function sortByPrice(result) {
  return result.sort((a,b) => a.FinalPrice - b.FinalPrice);
}

export default class ExternalServices {
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

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
