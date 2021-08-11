import axios from "axios";
import React from "react";



function useTenor(text,key) {
  const [result, setResult] = React.useState([]);
  
  const searchHandle = (searchTerm) => {
    var apikey = key;
    var search =
      "https://g.tenor.com/v1/search?q=" + searchTerm + "&key=" + apikey + "&limit="+50;
    var trend = "https://g.tenor.com/v1/trending?key=" + apikey + "&limit=50";
    axios.get(text ? search : trend).then(function(response) {
      const temporary = [];
      for (var i = 0; i < response.data.results.length; i++) {
        temporary.push({
          src: response.data.results[i].media[0].tinygif,
        });
      }
      setResult(temporary.map((item) => {return item.src}));
    });

    return;
  };
  React.useEffect(() => {
    searchHandle(text);
  }, [text]);
  return result;
}


export function useTenorCategories(locale) {
  const [result, setResult] = React.useState([]);

  const categoryHandle = (locale) => {
    var categories = "https://g.tenor.com/v1/categories?locale="+locale;
    
    axios.get(categories).then(function(response) {
        const temporary = [];
        for (var i = 0; i < response.data.tags.length; i++) {
          temporary.push({
            searchTerm: response.data.tags[i].searchterm,
            url: response.data.tags[i].image,
          });
        }
        setResult(temporary);
    });
    return;
  };

  React.useEffect(() => {
    categoryHandle(locale);
  });

  return result;
}



export default useTenor;
