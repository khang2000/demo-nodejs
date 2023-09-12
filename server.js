const http = require("http");
const url = require("url");
const PORT = 8000;

const server = http.createServer((req, res) => {
  const method = req.method.toUpperCase();
  const path = url.parse(req.url);

  switch (method) {
    case "GET":
      if (path === "/getall") {
        const products = ["product A", "product B", "product C"];
        res.end(JSON.stringify(products));
      } else {
        res.statusCode = 404;
        res.end("Not found");
      }
      break;
    case "POST":
      console.log("day la method post");
      break;
  }
});

server.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
