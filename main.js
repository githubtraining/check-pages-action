const github = require("@actions/github");
const core = require("@actions/core");
// const yaml = require("js-yaml");
// const fs = require("fs");
// const { graphql } = require("@octokit/graphql");

async function run() {

try {
  const token = core.getInput("github-token");
  const octokit = github.getOctokit(token)
  const ctx = github.context

  // console.log(`Owner: ${ctx.repo.owner}, repo: ${ctx.repo.repo}`)
  
 
  const q = `query listRepoURL($owner:String!, $repo:String!){
    repository(owner: $owner, name: $repo){
        url
    }
  }`

const v = {
  repo: ctx.repo.repo,
  owner: ctx.repo.owner,
}
// const r = await octokit.repos.listBranches({
//   repo: ctx.repo.repo,
//   owner: ctx.repo.owner
// }

// )
// console.log(r)
  const result = await octokit.graphql(q,v)
  console.log(result)



} catch (error) {
  core.setFailed(error);
  console.log('uh oh')
}

}

run();

// Get document, or throw exception on error
// try {
// } catch (e) {
//   console.log(e);
// }