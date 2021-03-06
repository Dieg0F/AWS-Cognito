import * as CDK from "aws-cdk-lib";
import { Construct } from "constructs";
import { CognitoAppStack } from "../stack/cognitoApp-stack";
import { ProductsFetchStack } from "../stack/productsFetch-stack";

interface CognitoStageProps extends CDK.StackProps {
  branch: string;
}

export class CognitoStage extends CDK.Stage {
  constructor(scope: Construct, id: string, props: CognitoStageProps) {
    super(scope, id, props);

    const productsFetchStack = new ProductsFetchStack(this, "ProductsFetch");

    const cognitoAppStack = new CognitoAppStack(this, "CognitoApp", {
      branch: props.branch,
      productsFetchHandler: productsFetchStack.productsFetchHandler,
    });
    cognitoAppStack.addDependency(productsFetchStack);
  }
}
