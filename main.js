const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  try {
    const token = core.getInput("github-token");
    const octokit = github.getOctokit(token);
    const ctx = github.context;

    const res = await octokit.repos.getPages({
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
    });

    core.info(res);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
