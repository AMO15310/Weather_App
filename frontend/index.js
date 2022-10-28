// const { response } = require("express");

const city = document.querySelector(".inp").value;
const submit = document.querySelector("#submit-btn");
const cityDisp = document.querySelector(".city");
const tempval = document.querySelector(".tval");
const body = document.querySelector("body");
const message = document.querySelector(".message");
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

const validate = () => {
  if (!city) {
    setTimeout(() => {
      message.innerHTML = `City cannot be empty!`;
    }, 2000);
    // setTimeout(clearTimeout(timeout), 3000);
  }
  console.log(city);
  fetch(
    `http://api.positionstack.com/v1/forward?access_key=5fe69f08182d8f70ea6cac4fe50e21dc&query=${city}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      console.log(data.data[0].latitude);
      console.log(data.data[0].longitude);
      const lats = data.data[0].latitude;
      const longs = data.data[0].longitude;
      const links =
        `http://api.openweathermap.org/data/2.5/weather?lat=${lats}&` +
        `lon=${longs}&appid=92d75207ba94649b3431d688628c2713`;
      fetch(links)
        .then((response) => response.json())
        .then((data) => {
          let temper = data.main.temp;
          num = Math.floor(temper - kelvin);
          console.log(data);
          tempval.innerHTML = num + `&#8451;`;
          description.innerHTML = data.weather[0].description;
          cityDisp.innerHTML = data.name;
          // console.log(data.name);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const captureLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      const api = "92d75207ba94649b3431d688628c2713";
      const link =
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
        `lon=${long}&appid=92d75207ba94649b3431d688628c2713`;
      fetch(link).then((response) =>
        response.json().then((data) => {
          let temps = data.main.temp;
          num = Math.floor(temps - kelvin);
          console.log(data);
          tempval.innerHTML = num + `&#8451;`;
          description.innerHTML = data.weather[0].description;
          fetch(
            `
            http://api.positionstack.com/v1/reverse?access_key=5fe69f08182d8f70ea6cac4fe50e21dc&query=${lat},${long}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // console.log(data.data[0].county);
              cityDisp.innerHTML = data.data[0].county;
            })
            .catch((err) => {
              console.log(err);
            });

          // console.log(data.weather[0].description);
        })
      );
    });
  }
};

getLoc.addEventListener("click", captureLoc);

submit.addEventListener("click", validate);
