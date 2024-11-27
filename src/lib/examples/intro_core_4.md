<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```ts
import { currentWeather, mockedWeatherIsWarm, request, wrap } from "./setup.ts";

// Define the original asynchronous resolve function for fetching weather data
const routes = wrap()().get({
  path: "/weather",
  resolve: { currentWeather },
  f: ({ resolve }) =>
    resolve.currentWeather.temperature > 75
      ? "It's warm outside"
      : "It's cool outside",
});

// Inject the mocked resolve
const mockRoutes = await routes.handleRequest("/weather")({
  resolve: {
    currentWeather: mockedWeatherIsWarm,
  },
});

console.log(
  // "It's warm outside"
  await mockRoutes(request).then((res) => res?.text()),
);
```

{:else}

```ts
import { petitions, wrap } from "vixeny";

const request = new Request("http://localhost/weather");

const currentWeather = petitions.resolve()({
  f: async () =>
    await fetch("https://api.weather.com/current")
      .then((res) => res.json()) as { temperature: number },
});

// Mock the resolve function for testing
const mockedWeatherIsWarm = { f: () => ({ temperature: 80 }) };

export { currentWeather, mockedWeatherIsWarm, request, wrap };
```

{/if}
