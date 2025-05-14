console.log("IT'S ALIVE!");

// Helper function
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Page list
let pages = [
  { url: "/my-webpage/index.html", title: "Home" },
  { url: "/my-webpage/projects/index.html", title: "Projects" },
  { url: "/my-webpage/contact/index.html", title: "Contact" },
  { url: "/my-webpage/resume/index.html", title: "Resume" },
  { url: "https://github.com/williamguy11", title: "GitHub", target: "_blank" }
];

// Create nav bar
let nav = document.createElement("nav");
document.body.prepend(nav);

// Add links
for (let p of pages) {
  let a = document.createElement("a");
  a.href = p.url;
  a.textContent = p.title;
  if (p.target === "_blank") a.target = "_blank";
  nav.append(a);

  // Highlight current page
  const currentPath = location.pathname.replace(/\/$/, "");
  const pagePath = new URL(a.href, location.origin).pathname.replace(/\/$/, "");
  if (currentPath === pagePath) {
    a.classList.add("current");
  }
}

// GitHub Stats Fetching
async function fetchGitHubStats(username) {
  const isDevelopment = true;
  if (isDevelopment) {
    return {
      followers: 1,
      following: 10,
      publicRepos: 5,
      publicGists: 0
    };
  }

  try {
    const response = await fetch(`https://api.github.com/users/${williamguy11}`);
    if (!response.ok) throw new Error("GitHub fetch failed");
    const data = await response.json();
    return {
      followers: data.followers,
      following: data.following,
      publicRepos: data.public_repos,
      publicGists: data.public_gists
    };
  } catch (error) {
    console.error("GitHub stats error:", error);
    return null;
  }
}

// Display GitHub stats
function displayGitHubStats(stats) {
  if (!stats) return;
  document.getElementById("followers").textContent = stats.followers;
  document.getElementById("following").textContent = stats.following;
  document.getElementById("publicRepos").textContent = stats.publicRepos;
  document.getElementById("publicGists").textContent = stats.publicGists;
}

fetchGitHubStats("williamguy11").then(displayGitHubStats);
