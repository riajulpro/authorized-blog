import app from "./app";
import config from "./app/config";

app.listen(config.port, () => {
  console.log(`Blog app listening on port ${config.port}`);
});
