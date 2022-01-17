import * as CDK from "aws-cdk-lib";
import * as Pipeline from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";

interface PipelineStackProps extends CDK.StackProps {
  branch: string;
  awsAccount: string;
  awsRegion: string;
}

export class PipelineStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props: PipelineStackProps) {
    super(scope, id, props);

    const pipelineId = "CognitoPipeline".concat(props.branch);
    const pipeline = new Pipeline.CodePipeline(this, pipelineId, {
      pipelineName: pipelineId,
      dockerEnabledForSynth: true,
      crossAccountKeys: true,
      synth: new Pipeline.ShellStep("Synth", {
        input: Pipeline.CodePipelineSource.gitHub(
          "Dieg0F/AWS-Cognito",
          props.branch
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
