const server = require('../server');

const ds = server.dataSources.mongodb;

ds.automigrate(null, (er) => {
  if (er) throw er;
  console.log(`Loopback tables created in ${ds.adapter.name}`);
  ds.disconnect();
});
