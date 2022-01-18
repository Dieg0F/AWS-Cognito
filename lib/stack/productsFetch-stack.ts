import * as CDK from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaJs from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class ProductsFetchStack extends CDK.Stack {
  readonly productsFetchHandler: lambdaJs.NodejsFunction;

  constructor(scope: Construct, id: string, props?: CDK.StackProps) {
    super(scope, id, props);

    this.productsFetchHandler = new lambdaJs.NodejsFunction(
      this,
      "ProductsFetch",
      {
        functionName: "ProductsFetch",
        entry: "lambda/products/productsFetchFuncions.js",
        handler: "handler",
        bundling: {
          minify: true,
          sourceMap: false,
        },
        memorySize: 128,
        timeout: CDK.Duration.seconds(5),
        tracing: lambda.Tracing.ACTIVE,
        insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_119_0,
      }
    );
  }
}
