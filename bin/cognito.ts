#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import "source-map-support/register";
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

new PipelineStack(app, "CognitoProdPipelineStack", {
  branch: "prod",
  awsRegion: "sa-east-1",
  awsAccount: "970857331170",
  env: {
    account: "088048809983",
    region: "sa-east-1",
  },
});

app.synth();

// cdk bootstrap --profile dev --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws:/178038539521/sa-east-1
// cdk bootstrap --profile prod --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws:/178038539521/sa-east-1
// cdk bootstrap --profile awsconsole --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws:/088048809983/sa-east-1
