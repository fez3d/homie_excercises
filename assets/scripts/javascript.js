var url = 'https://api.myjson.com/bins'

function fillInfo() {
  $.get(`${url}/${getUri()}`, data => {
    $("#first_name").text(data.first_name);
    $("#last_name").text(data.last_name);
    $("#email").text(data.email);
  });
}

function fillInputs() {
  $.get(`${url}/${getUri()}`, data => {
    $("#first_name").val(data.first_name);
    $("#last_name").val(data.last_name);
    $("#email").val(data.email);
  });
}

function updateUser() {
  let first_name = $("#first_name").val();
  let last_name = $("#last_name").val();
  let email = $("#email").val();
  let data = `{
    "first_name":"${first_name}", 
    "last_name":"${last_name}",
    "email":"${email}"
  }`;

  if (hasEmptyField() && validateEmail()) {
    $.ajax({
      url: `${url}/${getUri()}`,
      type: "PUT",
      data: data,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: () => {
        window.location.replace(`profile.html?uri=${getUri()}`);
      }
    });
  }
}

function saveUser() {
  let first_name = $("#first_name").val();
  let last_name = $("#last_name").val();
  let email = $("#email").val();
  let data = `{
    "first_name":"${first_name}", 
    "last_name":"${last_name}",
    "email":"${email}"
  }`;

  if (hasEmptyField() && validateEmail()) {
    $.ajax({
      url: url,
      type: "POST",
      data: data,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: data => {
        let uri = data.uri.split("/").pop();
        window.location.replace(`profile.html?uri=${uri}`);
      }
    });
  }
}

function editUser() {
  window.location.replace(`edit_user.html?uri=${getUri()}`);
}

function getUri() {
  let url = new URL(window.location.href);
  return url.searchParams.get("uri");
}

function hasEmptyField() {
  let first_name = $("#first_name").val();
  let last_name = $("#last_name").val();
  let email = $("#email").val();

  if (first_name == "" || last_name == "" || email == "") {
    alert("Campo Vacio");
    return false;
  }

  return true;
}

function validateEmail() {
  let email = $("#email").val();
  var regEx = /[a-zA-Z0-9._]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]{2,6}/;

  if (regEx.test(email)) {
    return true;
  }

  alert("No es un correo");
  return false;
}

if (window.location.pathname.split("/").pop() == "profile.html") {
  fillInfo();
}
if (window.location.pathname.split("/").pop() == "edit_user.html") {
  fillInputs();
}

$(document).on("click", "#edit", editUser);
$(document).on("click", "#update", updateUser);
$(document).on("click", "#save", saveUser);
