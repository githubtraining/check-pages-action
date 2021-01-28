const github = require('@actions/github')
const core = require('@actions/core')

async function run () {
  try {
    const token = core.getInput('github-token')
    const octokit = github.getOctokit(token)
    const ctx = github.context

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
    const q = `query getLinkedIssues($owner: String!, $repo: String!) {
        __typename
        repository(name: $repo, owner: $owner) {
          pullRequest(number: 4) {
            timelineItems(itemTypes: CONNECTED_EVENT, first: 100) {
              nodes {
                ... on ConnectedEvent {
                  subject {
                    ... on Issue {
                      number
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }  
      `

    const v = {
      repo: ctx.repo.repo,
      owner: ctx.repo.owner
    }

    const result = await octokit.graphql(q, v)
    console.log(`The result is: ${JSON.stringify(result)}`)
  } catch (error) {
    core.setFailed(error)
    console.log('uh oh')
  }
}

run()

// Get document, or throw exception on error
// try {
// } catch (e) {
//   console.log(e);
// }
