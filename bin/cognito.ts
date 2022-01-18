#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PipelineStack } from "../lib/pipeline/pipeline-stack";

const app = new cdk.App();

new PipelineStack(app, "CognitoDevPipelineStack", {
  branch: "dev",
  awsRegion: "sa-east-1",
  awsAccount: "178038539521",
  env: {
    account: "088048809983",
    region: "sa-east-1",
  },
});

// new PipelineStack(app, "CognitoProdPipelineStack", {
//   branch: "prod",
//   awsRegion: "sa-east-1",
//   awsAccount: "970857331170",
//   env: {
//     account: "088048809983",
//     region: "sa-east-1",
//   },
// });

app.synth();
