export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../images/day/day-clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../images/day/day-cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../images/day/day-fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../images/day/day-rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../images/day/day-snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../images/day/day-storm.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../images/night/night-clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../images/night/night-cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../images/night/night-fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../images/night/night-rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../images/night/night-snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL("../images/night/night-storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../images/day/day-default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../images/night/night-default.png", import.meta.url).href,
  },
};

export const apiKey = "a1a166424413165d763f24f6a1c3daaf";

export const getDefaultCoordinates = () => {
  return {
    latitude: 29.760427,
    longitude: -95.369804,
  };
};
