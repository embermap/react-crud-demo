import { Server, RestSerializer, Model } from "@miragejs/server";

window.server = new Server({
  timing: 500,

  models: {
    todo: Model
  },

  serializers: {
    application: RestSerializer.extend({
      root: false,
      embed: true
    })
  },

  baseConfig() {
    this.namespace = "api";

    this.resource("todo");
  },

  scenarios: {
    default(server) {
      server.create("todo", { text: "Work it" });
      server.create("todo", { text: "Make it" });
      server.create("todo", { text: "Do it" });
    }
  }
});
