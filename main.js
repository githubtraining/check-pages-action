const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  try {
    const token = core.getInput("github-token");
    const octokit = github.getOctokit(token);
    const ctx = github.context;

    const { html_url: url, status, source } = await octokit.repos.getPages({
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
    });

    core.info(status);
    core.info(`url: ${url}`);
    core.info(source);
  } catch (error) {
    core.setFailed(error);
  }
}

run();
