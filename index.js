const x = document.getElementById("timeZone-name");

const warningDisplay = document.getElementById("warningDisplay");
const baseURL = "https://api.geoapify.com/v1/";
const baseURL1 = "https://api.geoapify.com/v1/geocode/search";
const API_KEY = "8f21f84b506a4390af691e8287484153";
warningDisplay.classList.add("display-none");
let locationTime = document.getElementById("location-time-container");
locationTime.classList.add("display-none");

const timeZoneName = document.getElementById("timeZone-name");
const lat = document.getElementById("lat");
const OffsetStdName = document.getElementById("Offset-std-name");
const OffsetStdSecondsName = document.getElementById("Offset-std-seconds-name");
const OffsetDstName = document.getElementById("Offset-dst-name");
const OffsetDstSecondsName = document.getElementById("Offset-dst-seconds-name");
const country = document.getElementById("country");
const postcode = document.getElementById("postcode");
const city = document.getElementById("city");
const lan = document.getElementById("lan");
const NameArr = [
  timeZoneName,
  lat,
  lan,
  OffsetStdName,
  OffsetStdSecondsName,
  OffsetDstName,
  OffsetDstSecondsName,
  country,
  postcode,
  city,
];
let ValueArr = [];

const timeZoneName1 = document.getElementById("timeZone-name1");
const lat1 = document.getElementById("lat1");
const OffsetStdName1 = document.getElementById("Offset-std-name1");
const OffsetStdSecondsName1 = document.getElementById(
  "Offset-std-seconds-name1"
);
const OffsetDstName1 = document.getElementById("Offset-dst-name1");
const OffsetDstSecondsName1 = document.getElementById(
  "Offset-dst-seconds-name1"
);
const country1 = document.getElementById("country1");
const postcode1 = document.getElementById("postcode1");
const city1 = document.getElementById("city1");
const lan1 = document.getElementById("lan1");
const NameArr1 = [
  timeZoneName1,
  lat1,
  lan1,
  OffsetStdName1,
  OffsetStdSecondsName1,
  OffsetDstName1,
  OffsetDstSecondsName1,
  country1,
  postcode1,
  city1,
];
let ValueArr1 = [];

function makeArr(data) {
  let arr = [];
  arr.push(data.timezone.name);
  arr.push(data.lat);
  arr.push(data.lon);
  arr.push(data.timezone.offset_STD);
  arr.push(data.timezone.offset_STD_seconds);
  arr.push(data.timezone.offset_DST);
  arr.push(data.timezone.offset_DST_seconds);
  arr.push(data.country);
  arr.push(data.postcode ? data.postcode : "-");
  arr.push(data.city ? data.city : data.country);
  
  return arr;
}

function warning(text) {
  if (warningDisplay.classList.contains("display-none")) {
    warningDisplay.classList.remove("display-none");
    warningDisplay.innerText = text;
  } else {
    warningDisplay.innerText = text;
  }
}
function displayDetails2() {}

getLocation();
async function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function showPosition(position) {
  console.log(position.coords.latitude + " " + position.coords.longitude);

  var requestOptions = {
    method: "GET",
  };

  await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=${API_KEY}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      ValueArr = makeArr(result.features[0].properties);
      const current = document.getElementById("current");

      current.innerText=ValueArr[9]+" "+ValueArr[7]+"(Your Time)";
    })
    .catch((error) => console.log("error", error));

  NameArr.map((e, index) => {
    e.innerText = " " + ValueArr[index];
  });

  // x.innerText = info?.features[0]?.properties?.timezone?.name;
  // lan.innerText = info?.features[0]?.geometry?.coordinates[1];
  // lat.innerText = info?.features[0]?.geometry?.coordinates[0];
}

function fill(data) {
  locationTime.classList.remove("display-none");
  console.log(data);

  ValueArr1 = makeArr(data.results[1] ? data.results[1] : data.results[0]);
  const current = document.getElementById("located");
  current.innerText=ValueArr1[9]+" "+ValueArr1[7]+" ";

  NameArr1.map((e, index) => {
    e.innerText = ValueArr1[index];
  });
  console.log(ValueArr1);
}
async function showPositionByText(city) {
  
  const queryParams = {
    text: city,
    format: "json",
    apiKey: API_KEY,
  };

  const queryString = Object.entries(queryParams)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  let finalURL = `${baseURL1}?${queryString}`;
  var requestOptions = {
    method: "GET",
  };

  await fetch(`${finalURL}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      result?.results[0] ? fill(result) : warning("enter valid location");
    })
    .catch((error) => console.log("error", error));
}

let button = document.getElementById("btn").addEventListener("click", (e) => {
  const input = document.getElementById("input");

  if (input.value?.length > 0) {
    warningDisplay.classList.add("display-none");

    showPositionByText(input.value);
  } else {
    warning("Enter Location");
  }
});

const time = document.getElementById("time");
const time1 = document.getElementById("time1");

setInterval(() => {
  const newDate = new Date();

  const newTime =
    (newDate.getHours() < 10 ? "0" + newDate.getHours() : newDate.getHours()) +
    ":" +
    (newDate.getMinutes() < 10
      ? "0" + newDate.getMinutes()
      : newDate.getMinutes()) +
    ":" +
    (newDate.getSeconds() < 10
      ? "0" + newDate.getSeconds()
      : newDate.getSeconds());
  time.innerText = newTime;
}, 1000);

function calculateDifference(a, b) {
  

  const parseOffset = (offset) => {
    const match = offset.match(/([+-])(\d+):(\d+)/);
    if (!match) {
      return 0;
    }

    const sign = match[1] === "+" ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);

    return sign * (hours * 3600 + minutes * 60);
  };

  const offsetA = parseOffset(a);
  const offsetB = parseOffset(b);

  return offsetA - offsetB;
}

setInterval(() => {
  let difference = calculateDifference(
    OffsetStdName.innerText,
    OffsetStdName1.innerText
  );

  const localTime = new Date();

  const targetTime = new Date(localTime.getTime() - difference * 1000);



  const hours = targetTime.getHours().toString().padStart(2, "0");
  const minutes = targetTime.getMinutes().toString().padStart(2, "0");
  const seconds = targetTime.getSeconds().toString().padStart(2, "0");

  time1.textContent = `${hours}:${minutes}:${seconds}`;
}, 1000);

