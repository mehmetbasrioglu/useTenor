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
      setResult(temporary);
    });

    return;
  };
    
React.useEffect(() => {
    searchHandle(text);
  }, [text]);

  return result;
}


export default useTenor;
