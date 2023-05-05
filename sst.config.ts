import { SSTConfig } from "sst";
import { Bucket, NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "powermat",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {

      //Add S3 Bucket
      const bucket = new Bucket(stack, "public", {
        cors: true,
      });

      const site = new NextjsSite(stack, "site", {
        bind: [bucket],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
