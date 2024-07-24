const config = require("./utils/config");
const app = require("./app");
const logger = require("./utils/loggers");

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
