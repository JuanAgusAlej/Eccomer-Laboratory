const url = "https://fakestoreapi.com/products";

const fetchData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    localStorage.setItem("products", JSON.stringify(data));
    console.log(data);

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const fetchDataDetallado = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const SearchProduct = async (text) => {
  try {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const data = products.filter((product) =>
      product.title.toLowerCase().includes(text.toLowerCase())
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export { fetchData, fetchDataDetallado, SearchProduct };
