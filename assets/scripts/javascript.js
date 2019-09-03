const url = "https://api.myjson.com/bins";
initialize();

function showUserInfo() {
  $.get(`${url}/${getUri()}`, data => {
    $("#js-first-name").text(data.first_name);
    $("#js-last-name").text(data.last_name);
    $("#js-email").text(data.email);
  });
}

function editUserInfo() {
  $.get(`${url}/${getUri()}`, data => {
    $("#js-first-name").val(data.first_name);
    $("#js-last-name").val(data.last_name);
    $("#js-email").val(data.email);
  });
}

function updateUser() {
  let firstName = $("#js-first-name").val();
  let lastName = $("#js-last-name").val();
  let email = $("#js-email").val();
  let data = `{
    first_name: ${firstName}, 
    last_name: ${lastName},
    email:${email}
  }`;
  let jsonData = JSON.stringify(data);

  if (!hasEmptyField() && isEmail()) {
    $.ajax({
      url: `${url}/${getUri()}`,
      type: "PUT",
      data: jsonData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: () => {
        window.location.replace(`profile.html?uri=${getUri()}`);
      },
      error: () => {
        alert("Error al actualizar");
      }
    });
  }
}

function saveUser() {
  let firstName = $("#js-first-name").val();
  let lastName = $("#js-last-name").val();
  let email = $("#js-email").val();
  let data = `{
    first_name:${firstName}, 
    last_name:${lastName},
    email:${email}
  }`;
  let jsonData = JSON.stringify(data)


  if (!hasEmptyField() && isEmail()) {
    $.ajax({
      url: url,
      type: "POST",
      data: jsonData,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: data => {
        let uri = data.uri.split("/").pop();
        window.location.replace(`profile.html?uri=${uri}`);
      },
      error: () => {
        alert("Error al crear");
      }
    });
  }
}

function editUser() {
  window.location.replace(`form.html?uri=${getUri()}&edit=true`);
}

function getUri() {
  let url = new URL(window.location.href);
  return url.searchParams.get("uri");
}

function hasEmptyField() {
  let firstName = $("#js-first-name").val();
  let lastName = $("#js-last-name").val();
  let email = $("#js-email").val();

  if (firstName.trim() == "" || lastName.trim() == "" || email.trim() == "") {
    alert("Campo Vacio");
    return true;
  }

  return false;
}

function isEmail() {
  let email = $("#js-email").val();
  var regEx = /[a-zA-Z0-9._]+[@]+[a-zA-Z0-9]+[.]+[a-zA-Z]{2,6}/;

  if (regEx.test(email)) {
    return true;
  }

  alert("No es un correo");
  return false;
}

function isEditable() {
  let url = new URL(window.location.href);
  return url.searchParams.get("edit") == "true";
}

function initialize() {
  if (window.location.pathname.split("/").pop() == "profile.html") {
    showUserInfo();
    $(document).on("click", "#js-edit", editUser);
    return;
  }

  if (isEditable()) {
    editUserInfo();
    $(document).on("click", "#js-save", updateUser);
  } else {
    $(document).on("click", "#js-save", saveUser);
  }
}
