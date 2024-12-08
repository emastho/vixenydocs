<script>
    export let runtime = "main";
</script>

{#if runtime == "main"}

```javascript
import { petitions, wrap } from "vixeny";

const lotery = petitions.resolve()({
  // Generates a random number from 0 to 10000
  f:  () => Math.round(10000)
});

const routes = wrap()().get({
  path: "/winAPrice",
  resolve: { lotery },
  f: ({ resolve }) =>
    resolve.lotery 
      ? 'Winner!'
      : 'Try again',
});

// Inject the mocked resolve
const mockRoutes = await routes.handleRequest("/winAPrice")({
  resolve: {
    lotery: { f: () => 10000 },
  },
});

// Always a winner
await mockRoutes("/winAPrice")
  .then(async (res) => await res.text())
  .then(console.log)
```

{:else}

```javascript
import { petitions, wrap } from "vixeny";

// Real Resolve
const currentWeather = petitions.resolve()({
  f: async () =>
    await fetch("https://api.weather.com/current")
      .then((res) => res.json()) as { temperature: number },
});

// Mock the resolve function for testing
const mockedWeatherIsWarm = { f: () => ({ temperature: 80 }) };

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

// "It's warm outside"
await mockRoutes('/weather')
  .then(async (res) => await res.text())
  .then(console.log)
```

{/if}
