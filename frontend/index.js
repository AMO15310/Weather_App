const city = document.querySelector(".inp").value;
const submit = document.querySelector("#submit-btn");
const cityDisp = document.querySelector(".city");
const tempval = document.querySelector(".tval");
const body = document.querySelector("body");
const getLoc = document.querySelector(".getlocation");
const description = document.querySelector(".des");
description.innerHTML = "";

const kelvin = 273;
let num = "";
let town = "Nakuru";

const imageArray = [];
imageArray.push("/images/cloudy.jpg", "/images/cool.jpg", "/images/rainny.jpg");
body.addEventListener("click", () => {
  body.style.backgroundImage = `url(${
    imageArray[Math.floor(Math.random() * imageArray.length)]
  }`;
});

body.style.backgroundImage = "url(/images/rainny.jpg)";

const captureLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const long = position.coords.longitude;
      const lat = position.coords.latitude;
      const api = "92d75207ba94649b3431d688628c2713";
      const link =
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
        `lon=${long}&appid=92d75207ba94649b3431d688628c2713`;
      fetch(link).then((response) =>
        response.json().then((data) => {
          const temps = data.main.temp;
          num = Math.floor(temps - kelvin);
          console.log(data);
          cityDisp.innerHTML = data.name;
          tempval.innerHTML = num + `&#8451;`;
          description.innerHTML = data.weather[0].description;

          // console.log(data.weather[0].description);
        })
      );
    });
  }
};

getLoc.addEventListener("click", captureLoc);
