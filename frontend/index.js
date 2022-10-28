// SELECT ALL ELEMENTS

const city = document.querySelector(".inp").value;
const submit = document.querySelector("#submit-btn");
const cityDisp = document.querySelector(".city");
const tempval = document.querySelector(".tval");
const body = document.querySelector("body");
const message = document.querySelector(".message");
const getLoc = document.querySelector(".getlocation");
const description = document.querySelector(".des");
const snow = document.querySelector(".snow");
const rain = document.querySelector(".rain");
const cloud = document.querySelector(".cloud");
const partcloud = document.querySelector(".part-cloud");
const sun = document.querySelector(".sun");
description.innerHTML = "";
// DECLARE THE DISPLAYING ELEMENTS

const kelvin = 273;
let num = "";
// CONSTRUCT THE ARRAY FOR BACKGROIUND IMAGES

const imageArray = [];
imageArray.push("/images/cloudy.jpg", "/images/cool.jpg", "/images/rainny.jpg");
body.addEventListener("click", () => {
  body.style.backgroundImage = `url(${
    imageArray[Math.floor(Math.random() * imageArray.length)]
  }`;
});
// DEFAULT BACKGROUND IMAGE

body.style.backgroundImage = "url(/images/rainny.jpg)";

// CONSTRUCT THE SUBMITT BUTTON EVENT

const validate = () => {
  if (!city) {
    setTimeout(() => {
      message.innerHTML = `City cannot be empty!`;
    }, 2000);
  }
  console.log(city);
  // FETCH THE LONGITUDES AND LATITUDES FOR THE INPUT CITY
  fetch(
    `http://api.positionstack.com/v1/forward?access_key=11063./AMOS/.5fe69f08182d8f70ea6cac4fe50e21dc&query=${city}`
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
        `lon=${longs}&appid=11063./AMOS/.92d75207ba94649b3431d688628c2713`;
      // FETCH THE TEMPERATURE FOR THE CITY

      fetch(links)
        .then((response) => response.json())
        .then((data) => {
          // DISPLAY DATA ON SCREEN

          let temper = data.main.temp;
          num = Math.floor(temper - kelvin);
          console.log(data);
          tempval.innerHTML = num + `&#8451;`;
          description.innerHTML = data.weather[0].description;
          cityDisp.innerHTML = data.name;
          // console.log(data.name);

          // WEATHER ICON CONTROL CONDITIONS FOR BUTTON SUBMIT

          if (num < 10) {
            snow.style.display = "flex";
          }
          if (num > 10 && num <= 16) {
            rain.style.display = "flex";
          }
          if (num > 16 && num <= 21) {
            cloud.style.display = "flex";
          }
          if (num > 22 && num <= 25) {
          }
          if (num > 26) {
            sun.style.display = "flex";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET LOCATION EVENT

const captureLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      // DECLARE THE LINK AND THE API TO USE

      const api = "11063./AMOS/.92d75207ba94649b3431d688628c2713";
      const link =
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
        `lon=${long}&appid=11063./AMOS/.92d75207ba94649b3431d688628c2713`;

      // FETCH DATA FOR THE LOCATION OBTAINED ABOVE BY BROWSER

      fetch(link).then((response) =>
        response.json().then((data) => {
          // DISPLAY DATA ON SCREEN

          let temps = data.main.temp;
          num = Math.floor(temps - kelvin);
          console.log(data);
          tempval.innerHTML = num + `&#8451;`;
          description.innerHTML = data.weather[0].description;

          // CONTROL STATEMENT FOR ICON DISPLAY ON GET LOCATION EVENT

          if (num < 10) {
            snow.style.display = "flex";
          }
          if (num > 10 && num <= 16) {
            rain.style.display = "flex";
          }
          if (num > 16 && num <= 21) {
            cloud.style.display = "flex";
          }
          if (num > 22 && num <= 25) {
          }
          if (num > 26) {
            sun.style.display = "flex";
          }
          // DECODE THE LATS AND LONGS TO DISPLAY CITY ON SCREEN

          fetch(
            `
            http://api.positionstack.com/v1/reverse?access_key=11063./AMOS/.5fe69f08182d8f70ea6cac4fe50e21dc&query=${lat},${long}`
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
// ADD EVENT LISTENERS TO THE TWO BUTTONS ON SCREEN

getLoc.addEventListener("click", captureLoc);

submit.addEventListener("click", validate);

// END ...
