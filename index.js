require("dotenv").config();
const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");
const git = simpleGit();

const { GITHUB_USERNAME, GITHUB_REPO } = process.env;
const REPO_PATH = path.resolve(__dirname, GITHUB_REPO);

async function updateReadme() {
  const readmePath = path.join(REPO_PATH, "README.md");

  // Update file README.md dengan timestamp terbaru
  const timestamp = new Date().toISOString();
  fs.writeFileSync(readmePath, `Last updated: ${timestamp}\n`, { flag: "w" });

  console.log("README.md updated:", timestamp);

  try {
    await git
      .cwd(REPO_PATH)
      .add("README.md")
      .commit(`Auto-update README.md - ${timestamp}`)
      .push(["origin", "main"]);

    console.log("Commit & Push Success!");
  } catch (error) {
    console.error("Error during git operations:", error);
  }
}

updateReadme();
