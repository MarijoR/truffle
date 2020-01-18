const command = {
  command: "serve",
  description: "Start Truffle's GraphQL UI playground",
  builder: {},
  help: {
    usage: "truffle db serve",
    options: []
  },

  /* This command does starts an express derived server that invokes
   * `process.exit()` on SIGINT. As a result there is no need to invoke
   * truffle's own `process.exit()` which is triggered by invoking the `done`
   * callback.
   *
   * Todo: blacklist this command for REPLs
   */
  run: async function(argv) {
    const { ApolloServer } = require("apollo-server");
    const Config = require("@truffle/config");
    const { TruffleDB } = require("truffle-db");

    const config = Config.detect(argv);
    const { context, schema } = new TruffleDB({
      contracts_build_directory: config.contracts_build_directory,
      contracts_directory: config.contracts_directory,
      working_directory: config.working_directory
    });

    const server = new ApolloServer({
      tracing: true,
      schema: schema,
      context: context
    });

    const port = config.db.PORT || 4444;

    const { url } = await server.listen({ port });
    console.log(`🚀 Playground listening at ${url}`);
    console.log(`ℹ  Press Ctrl-C to exit`);
  }
};

module.exports = command;
