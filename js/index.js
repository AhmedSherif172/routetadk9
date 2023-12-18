var webname = document.getElementById("sitename");
var url = document.getElementById("siteurl");
var NameInput = document.querySelector("#sitename");
var LinkInput = document.querySelector("#siteurl");

var websites = [];

if (localStorage.getItem("websites") != null) {
  websites = JSON.parse(localStorage.getItem("websites"));
  displaywebsite();
}

function addwebsite() {
  var website = {
    name: webname.value,
    link: "https://" + url.value,
  };

  if (NameVerification(webname.value) && LinkVerification(url.value)) {
    websites.push(website);
    localStorage.setItem("websites", JSON.stringify(websites));

    displaywebsite();
    clearinputs();
  } else {
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid",
    });
  }

  NameInput.classList.remove("valid-border");
  NameInput.classList.remove("is-valid");
  LinkInput.classList.remove("valid-border");
  LinkInput.classList.remove("is-valid");
}

function displaywebsite() {
  var tds = "";
  for (let i = 0; i < websites.length; i++) {
    tds += `<tr>
            <td>${[i + 1]}</td>
            <td>${websites[i].name}</td>
            <td><a target="_blank" href="${
              websites[i].link
            }"><button class=" text-white visitbtn border-0 rounded-2 px-3 py-2"><i class="fa-solid fa-eye"></i> Visit</button></td></a>
            <td><button onclick="deletewebsite(${[
              i,
            ]})" class="text-white deletebtn border-0 rounded-2 px-3 py-2"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("webinfo").innerHTML = tds;
}
function clearinputs() {
  webname.value = "";
  url.value = "";
}
function deletewebsite(index) {
  websites.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(websites));
  displaywebsite();
}
function NameVerification(WebName) {
  var verifyName = /^\w{3,}$/i;
  return verifyName.test(WebName);
}
function LinkVerification(WebLink) {
  var VerifyLink = /^(https?:\/\/)?(\w{1,20}\.)?\w{2,}\.\w{2,}$/;
  return VerifyLink.test(WebLink);
}
NameInput.addEventListener("input", function () {
  if (NameVerification(webname.value)) {
    NameInput.classList.add("is-valid");
    NameInput.classList.add("valid-border");
    NameInput.classList.remove("invalid-border");
    NameInput.classList.remove("is-invalid");
    NameInput.classList.remove("focus-border");
  } else {
    NameInput.classList.add("is-invalid");
    NameInput.classList.add("invalid-border");
    NameInput.classList.remove("focus-border");
  }
});
LinkInput.addEventListener("input", function () {
  if (LinkVerification(url.value)) {
    LinkInput.classList.add("is-valid");
    LinkInput.classList.add("valid-border");
    LinkInput.classList.remove("invalid-border");
    LinkInput.classList.remove("is-invalid");
    LinkInput.classList.remove("focus-border");
  } else {
    LinkInput.classList.add("is-invalid");
    LinkInput.classList.add("invalid-border");
    LinkInput.classList.remove("focus-border");
  }
});
