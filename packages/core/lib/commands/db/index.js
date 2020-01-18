const OS = require("os");
const serveCommand = require("./commands/serve");
const queryCommand = require("./commands/query");

const usage =
  "truffle db <sub-command> [options]" +
  OS.EOL +
  OS.EOL +
  "  Available sub-commands: " +
  OS.EOL +
  OS.EOL +
  "  serve \tStart the GraphQL server" +
  OS.EOL +
  "  query \tExecute a query against TruffleDB" +
  OS.EOL;

const command = {
  command: "db",
  description: "Database interface commands",
  builder: function(yargs) {
    return yargs.commandDir("commands").demandCommand();
  },

  subCommands: {
    serve: {
      help: serveCommand.help,
      description: serveCommand.description
    },

    query: {
      help: queryCommand.help,
      description: queryCommand.description
    }
  },

  help: {
    usage,
    options: []
  },

  run: function(args, done) {
    const [subCommand, ...cmdArgs] = args._;
    switch (subCommand) {
      case "serve":
        serveCommand.run(args, done);
        break;

      case "query":
        console.log("query the server thing");
        console.log("with args...", cmdArgs);
        queryCommand.run(args, done);
        break;

      default:
        console.log(`Unknown command: ${subCommand}`);
        done();
    }
  }
};

module.exports = command;
