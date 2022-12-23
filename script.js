let randomName = document.querySelector("#name");
let randomImg = document.querySelector("img");
let details = document.querySelector("p");

let age = document.querySelector('[data-attr="age"]');
let email = document.querySelector('[data-attr="email"]');
let phone = document.querySelector('[data-attr="phone"]');
let anotherUser = document.querySelector("#getUser");

async function getRandomUser() {
  const response = await fetch(`https://randomuser.me/api/`);

  const { results } = await response.json();

  let [{ dob, email, name, picture, phone }] = results;
  name = `${name.first} ${name.last}`;
  age = dob.age;
  picture = picture.large;
  // only information we need
  return { age, email, name, picture, phone };
}

// on page load adding details, although not good practice to modify the window object
getRandomUser().then(updateUser);

email.addEventListener("click", handleClick);
phone.addEventListener("click", handleClick);
age.addEventListener("click", handleClick);

function handleClick(event) {
  let action = event.target.innerText;

  if (action == "Age") {
    details.innerText = userDetails.age;
  } else if (action == "Email") {
    details.innerText = userDetails.email;
  } else if (action == "Phone") {
    details.innerText = userDetails.phone;
  }
}
anotherUser.addEventListener("click", getNewUser);

function getNewUser() {
  getRandomUser().then(updateUser);
  details.innerText = "";
}
function updateNameAndPhoto() {
  randomName.innerText = userDetails.name;
  randomImg.src = userDetails.picture;
}

function updateUser(data) {
  window.userDetails = data;
  updateNameAndPhoto();
}
