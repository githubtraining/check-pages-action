const github = require("@actions/github");
const core = require("@actions/core");
const yaml = require("js-yaml");
const fs = require("fs");
const { graphql } = require("@octokit/graphql");

async function run() {

try {
  const token = core.getInput("github-token");
  const octokit = github.getOctokit(token)
  const ctx = github.context

  console.log(`Owner: ${ctx.repo.owner}, repo: ${ctx.repo.repo}`)
  


  const result = await octokit.graphql(
    `
      {
        {
          repository($owner:String!, $repo:String!) {
            url
          }
        }
      }
    `,{
      repo: ctx.repo.repo,
      owner: ctx.repo.owner,
    }
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