#!/usr/bin/env node
require('epipebomb')();
const osm2obj = require("osm2obj");
const stringify = require("stringify-stream")

const {
  BinarySplitter,
  // sinks: { Kinesis },
  sources: { Changesets, Kinesis }
} = require("..");

async function main() {
  // const rs = Changesets({
  //   infinite: true,
  //   checkpoint: sequenceNumber => console.warn(`${sequenceNumber} fetched.`)
  // });
  //
  // rs.pipe(process.stdout);
  // rs.pipe(osm2obj({
  //   coerceIds: false
  // })).pipe(stringify()).pipe(process.stdout);
  // rs.pipe(new BinarySplitter("\u001e")).pipe(new KinesisStream("changesets-xml"))
  // rs.pipe(new BinarySplitter("\u001e")).pipe(new KinesisStream("changesets-xml"))

  // TODO when writing to kinesis, make sure that elements are ordered such that they don't depend on entities that haven't been flushed
  const rs = await Kinesis({
    streamName: "changesets-xml"
  });

  // rs.pipe(process.stdout);
  rs.on("data", data => console.log(data))
}

main();
