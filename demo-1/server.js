const http = require("http");
const PORT = 8000;

const server = http.createServer((req, res) => {
  const method = req.method.toUpperCase();
  // const path = url.parse(req.url);
  const path = req.url;

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
      console.log("Day la method POST");
      break;
  }
});

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
