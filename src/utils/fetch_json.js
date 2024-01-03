const date = new Date().getTime()

const fetch_json = async (URL) => {


  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const str = await response.json();
    return str;

  } catch (error) {
    console.error('Error during GET request:', error);
    throw error;
  }
};


export {
    fetch_json
}