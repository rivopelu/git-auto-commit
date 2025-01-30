const simpleGit = require("simple-git");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

// Path ke repository lokal Anda
const repoPath = path.join(__dirname, "automation-commit");
const git = simpleGit(repoPath);

// Fungsi untuk mengubah isi README.md
function updateReadme() {
  const readmePath = path.join(repoPath, "README.md");
  const date = new Date().toLocaleString();
  const content = `# My Daily Commit\n\nTerakhir diupdate: ${date}`;

  fs.writeFileSync(readmePath, content, "utf8");
}

// Fungsi untuk melakukan commit dan push
async function commitAndPush() {
  try {
    updateReadme(); // Update README.md
    await git.add("README.md");
    await git.commit(`Update README.md - ${new Date().toLocaleString()}`);
    await git.push("origin", "main"); // Ganti 'main' dengan branch Anda
    console.log("Commit dan push berhasil!");
  } catch (error) {
    console.error("Gagal melakukan commit dan push:", error);
  }
}

cron.schedule("0 0 * * *", () => {
  console.log("Memulai commit otomatis...");
  commitAndPush();
});

console.log("Scheduler berjalan. Menunggu waktu yang dijadwalkan...");
