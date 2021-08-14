export default class useTenor {
  constructor() {
    this.searchTerm = "";
    this.limit = 10;
  }

  //Setters
  setSearchTerm (searchTerm) {
    this.searchTerm = searchTerm;
  }

  setLimit(limit){
    if(typeof limit === "string") {
      return console.error("Limit must be an integer");
      }
    else{
    this.limit = limit
    }
  }

  async Suggestions(key) {
    const data = await fetch(`https://g.tenor.com/v1/search_suggestions?q=${this.searchTerm}&key=${key}&limit=${this.limit}`)
    .then((response) => {
      if(response.status == 200){
        return response.json();
      }
      else{
        return console.error("Error:", response.status);
      }
    })
    .then((response) => {
      const DataTransformedObject = [];
      for (var i = 0; i < response.results.length; i++) {
        DataTransformedObject.push({
          "keyword": response.results[i],
        });
      }
      return DataTransformedObject;
    }
    );

    return data;
  }

  //Getters
  async searchOnTenor(key) {
    const data = await fetch(
      `https://g.tenor.com/v1/search?q=${this.searchTerm}&key=${key}&limit=${this.limit}`
    )
    .then((response) => {
      if(response.status == 200) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      if (data.error){
        throw new Error(data.error);
      }
      const DataTransformedObject = [];
      for (var i = 0; i < data.results.length; i++) {
        DataTransformedObject.push({
          "src": data.results[i].media[0].tinygif
        });
      }

      return DataTransformedObject.map((dto) => {
        return dto.src
        });
    });
    return data;
  }

  async getCategories(locale) {
    const data = await fetch(
      "https://g.tenor.com/v1/categories?locale=" + locale
    )
      .then((response) => {
        if (
          response.status == 400 ||
          response.status == 404 ||
          response.status == 500
        ) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((response) => {
        if (response.error) {
          return { error: response.error };
        }
      const DataTransformedObject = [];
      for (var i = 0; i < response.tags.length; i++) {
        DataTransformedObject.push({
          searchTerm: response.tags[i].searchterm,
          url: response.tags[i].image,
        });
      }
        return DataTransformedObject;
      });
    return data;
  }

  async randomImages(key) {
    const data = await fetch(
      `https://g.tenor.com/v1/random?q=${this.searchTerm}&key=${key}`
    )
      .then((response) => {
        if (
          response.status == 400 ||
          response.status == 404 ||
          response.status == 500
        ) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.error) {
          return { error: data.error };
        }
        const DataTransformedObject = [];
        for (var i = 0; i < data.results.length; i++) {
          DataTransformedObject.push({
            src: data.results[i].media[0].tinygif,
          });
        }
        return DataTransformedObject.map((item) => {
          return item.src;
        });
      });
    return data;
  }
}
