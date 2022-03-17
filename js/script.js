// I am targeting the section whre my info will appear //
const overview = document.querySelector(".overview");
const username = "titusjosef";
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const repoClassData = document.querySelector(".repo-data");
const backRepo = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitInfo = async function () {

  const userInfo = await fetch (`https://api.github.com/users/${username}`);
  
  const data = await userInfo.json();

  displayUserInfo(data);

};

gitInfo();

const displayUserInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add = ("user-info");
    div.innerHTML = ` <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name: ${data.name}</strong></p>
    <p><strong>Bio: ${data.bio}</strong></p>
    <p><strong>Location: ${data.location}</strong></p>
    <p><strong>Number of public repos:${data.public_repos}</strong></p>
</div>`;

overview.append(div);
};

const gitRepos = async function () {
  const getRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await getRepos.json();
  infoRepos(repoData);
};

const infoRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};

gitRepos();

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  }
});

const getRepoInfo = async function (repoName) {
  const fetchRequest = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const requestInfo = await fetchRequest.json();
  console.log(requestInfo);
  const fetchLanguages = await fetch (requestInfo.languages_url); 
  const languageData = await fetchLanguages.json();
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  }

  diplayRepoInfo(requestInfo, languages);
};

  const diplayRepoInfo = function (requestInfo, languages) {
    backRepo.classList.remove("hide");
    repoClassData.innerHTML = "";
    repoClassData.classList.remove("hide");
    allRepos.classList.add ("hide");
    const div = document.createElement ("div");
    div.innerHTML = `
    <h3>Name: ${requestInfo.name}</h3>
    <p>Description: ${requestInfo.description}</p>
    <p>Default Branch: ${requestInfo}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${requestInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `; 
   repoClassData.append(div);


};

backRepo.addEventListener("click", function (e) {
  allRepos.classList.remove("hide");  
  repoClassData.classList.add("hide");
  backRepo.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowerCase = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(lowerCase)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});

































