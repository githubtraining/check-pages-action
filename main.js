const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  try {
    const token = core.getInput("github-token");
    const octokit = github.getOctokit(token);
    const ctx = github.context;
    const expectedBranch = "main";
    const expectedPath = "/docs";

    const { data: page } = await octokit.repos.getPages({
      owner: ctx.repo.owner,
      repo: ctx.repo.repo,
    });

    if (page.status !== "built") {
      core.setFailed(
        "Page failed to build, see the troubleshooting step for help"
      );
      core.setOutput("report", {
        type: "issue",
        level: "fatal",
        msg:
          "## Error:\nGitHub Pages has failed to successfully build your page.\n**[GitHub Pages Documentation](https://docs.github.com/en/github/working-with-github-pages)**",
      });
      return;
    }

    if (
      page.source.branch !== expectedBranch ||
      page.source.path !== expectedPath
    ) {
      core.setFailed("Your page was bult from the wrong branch or path");
      core.setOutput("report", {
        type: "issue",
        level: "warning",
        msg: `Wanted branch to equal ${expectedBranch} and path to equal ${expectedPath}\nGot branch: ${expectedBranch} path: ${expectedPath}`,
      });
      return;
    }
    core.info(`Great job!  Your page can be found at: ${page.html_url}`);
    core.setOutput("report", {
      type: "actions",
      level: "success",
      msg: `Great job!  Your page can be found at: ${page.html_url}`,
    });
  } catch (error) {
    core.setFailed(error);
  }
}

run();
