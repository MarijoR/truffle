const Config = require("@truffle/config");

const command = {
  command: "query",
  description: "Query truffle db",
  builder: {},
  help: {
    usage: "truffle query '<query-expression>'",
    options: []
  },

  run: function(argv, done) {
    const config = Config.detect(argv);
    const { working_directory: workingDirectory } = config;

    const query = argv._;
    query.shift();

    console.log("working_directory", workingDirectory);
    console.log(`Executing query..."${query}"`);
    done();
  }
};

module.exports = command;
