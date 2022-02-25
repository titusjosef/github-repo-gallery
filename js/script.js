// I am targeting the section whre my info will appear //
const overview = document.querySelector(".overview");
const username = "titusjosef";

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





















