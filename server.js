const http = require("http");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let reqBody = "";
  req.on("data", (data) => {
    reqBody += data;
  });

  req.on("end", () => {
    let parsedBody;
    
    if (req.headers["content-type"] === "application/json") {
  
        parsedBody = JSON.parse(reqBody);
      
    } else if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
      parsedBody = parseFormUrlEncoded(reqBody);
    }
    
    if (parsedBody) {
      console.log(parsedBody);
    }

    const resBody = {
      Hello: "World!",
    };

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(resBody));
  });
});

function parseFormUrlEncoded(body) {
  return body
    .split("&")
    .map((keyValuePair) => keyValuePair.split("="))
    .map(([key, value]) => [key, value.replace(/\+/g, " ")])
    .map(([key, value]) => [key, decodeURIComponent(value)])
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

const port = 5000;

server.listen(port, () => console.log("Server is listening on port", port));
