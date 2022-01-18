import * as CDK from "aws-cdk-lib";
import * as apiGateway from "aws-cdk-lib/aws-apigateway";
import * as lambdaJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as cwLogs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

interface CognitoAppStackProps extends CDK.StackProps {
  branch: string;
  productsFetchHandler: lambdaJs.NodejsFunction;
}

export class CognitoAppStack extends CDK.Stack {
  constructor(scope: Construct, id: string, props: CognitoAppStackProps) {
    super(scope, id, props);

    const logDestination = new cwLogs.LogGroup(this, "CognitoAPILogs");
    const api = new apiGateway.RestApi(this, "CognitoAPI", {
      restApiName: "Cognito API",
      deployOptions: {
        accessLogDestination: new apiGateway.LogGroupLogDestination(
          logDestination
        ),
        accessLogFormat: apiGateway.AccessLogFormat.jsonWithStandardFields({
          caller: true,
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          user: true,
        }),
      },
    });

    const productsFetchFunctionIntegration = new apiGateway.LambdaIntegration(
      props.productsFetchHandler
    );
    const productsResource = api.root.addResource("products");
    productsResource.addMethod("GET", productsFetchFunctionIntegration);
  }
}
