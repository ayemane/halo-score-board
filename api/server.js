const express = require("express");
const graphqlHTTP = require("express-graphql");

//const schema = require("./schemaUsingJS");
const schema = require("./schemaUsingGraphQlLang");

const app = express();
const cors = require("cors");

//Allow cross-origin
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use(express.static(__dirname + "client/build"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
