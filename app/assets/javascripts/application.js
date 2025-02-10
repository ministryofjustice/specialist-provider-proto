//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  function search() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
})

// Set cookies
const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = ";expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${value}${expires};path=/;samesite=lax`;
}

// Cookies for remembering which case has been selected
const choiceMary = document.getElementById("0")
choiceMary?.addEventListener("click", setCookieMary);

const choiceJamil = document.getElementById("1");
choiceJamil?.addEventListener("click", setCookieJamil);

const choiceMonkey = document.getElementById("2");
choiceMonkey?.addEventListener("click", setCookieMonkey);

const choiceRoronoa = document.getElementById("3");
choiceRoronoa?.addEventListener("click", setCookieRoronoa);

const choiceNami = document.getElementById("4");
choiceNami?.addEventListener("click", setCookieNami);

const choiceMaya = document.getElementById("5");
choiceMaya?.addEventListener("click", setCookieMaya);

const choiceTrystan = document.getElementById("6");
choiceTrystan?.addEventListener("click", setCookieTrystan);


function setCookieMary() {
  setCookie("cookieValueForCaseSelected", "0", 30);
};

function setCookieJamil() {
  setCookie("cookieValueForCaseSelected", "1", 30);
};

function setCookieMonkey() {
  setCookie("cookieValueForCaseSelected", "2", 30);
};

function setCookieRoronoa() {
  setCookie("cookieValueForCaseSelected", "3", 30);
};

function setCookieNami() {
  setCookie("cookieValueForCaseSelected", "4", 30);
};

function setCookieMaya() {
  setCookie("cookieValueForCaseSelected", "5", 30);
};

function setCookieTrystan() {
  setCookie("cookieValueForCaseSelected", "6", 30);
};

// Set `cookieValueForCaseSelected` to '2' if it doesn't exist
const setCookieIfNotExists = (name, value, days) => {
  if (!getCookie(name)) {
      let expires = "";
      if (days) {
          const date = new Date();
          date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
          expires = ";expires=" + date.toUTCString();
      }
      document.cookie = `${name}=${value}${expires};path=/;samesite=lax`;
  }
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

setCookieIfNotExists("cookieValueForCaseSelected", "2", 30);

// Cookie for remembering which form, change link, was pressed on
const changeLinkClickedOnForm = document.getElementsByClassName("change");

Array.from(changeLinkClickedOnForm).forEach(link =>{ 
    if (document.referrer.includes("new")) {
      link.addEventListener("click", setCookieFormNew);
     } else if (document.referrer.includes("accepted")){
      link.addEventListener("click", setCookieFormAccepted);
    } else {
      link.addEventListener("click", setCookieFormClosed);
    }
  }
);

function setCookieFormNew() {
  setCookie("theFormChangeLinkClicked", "New", 30);
}

function setCookieFormAccepted() {
  setCookie("theFormChangeLinkClicked", "Accepted", 30);
}

function setCookieFormClosed() {
  setCookie("theFormChangeLinkClicked", "Closed", 30);
}

