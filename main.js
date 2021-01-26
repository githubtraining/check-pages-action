const github = require("@actions/github");
const core = require("@actions/core");
const yaml = require("js-yaml");
const fs = require("fs");
const { graphql } = require("@octokit/graphql");

async function run() {

try {
  token = core.getInput("github-token");
  octokit = github.getOctokit(token)

  const result = await octokit.graphql(
    `
      {
        {
          repository(owner: "hectorsector", name: "scratch") {
            url
          }
        }
      }
    `
  )

  console.log(result)

} catch (error) {
  core.setFailed(error);
  console.log('uh oh')
}

}

run();

// Get document, or throw exception on error
try {
} catch (e) {
  console.log(e);
}