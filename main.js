const github = require("@actions/github");
const core = require("@actions/core");

async function run() {

try {
  const token = core.getInput("github-token");
  const octokit = github.getOctokit(token)
  const ctx = github.context

// TODO: Use GraphQL  
 
//   const q = `query listRepoURL($owner: String!, $repo: String!) {
//     repository(owner: $owner, name: $repo) {
//       deployments(first: 10, environments: "github-pages") {
//         totalCount
//         nodes {
//           commitOid
//         }
//       }
//     }
//   }
//   `

// const v = {
//   repo: ctx.repo.repo,
//   owner: ctx.repo.owner,
// }
// const r = await octokit.repos.listBranches({
//   repo: ctx.repo.repo,
//   owner: ctx.repo.owner
// }

// )
// console.log(r)
  // const result = await octokit.graphql(q,v)
  // console.log(result)

  const { data:branch, data:path } = await octokit.repos.getPages({
    owner: ctx.repo.owner,
    repo: ctx.repo.repo
  })

  console.log(`The branch is ${branch} the path is ${path}`)

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