"use strict";

const { getWeather, compareCities } = require("../weather");

/**
 * Since main.js is a script that executes immediately and uses process.argv,
 * we need to mock process.argv and capture console.log/console.error.
 * We can wrap the main.js logic in a function or just re-require it after
 * modifying process.argv. However, since main.js is not exported as a function,
 * we will use a helper to run it in a separate process or mock the environment.
 * 
 * A better way for unit testing a CLI script is to mock the dependencies 
 * and the global process/console objects.
 */

describe("main.js CLI", () => {
  let logSpy;
  let errorSpy;
  let originalArgv;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    originalArgv = process.argv;
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    process.argv = originalArgv;
    jest.resetModules();
  });

  function runMain() {
    // We require main.js inside the function to ensure it executes with the current process.argv
    require("../main.js");
  }

  test("Running 'node main.js compare CityA CityB' prints the warmer city and difference", () => {
    // Setup: Berlin (22) is warmer than Munich (18) by 4
    process.argv = ["node", "main.js", "compare", "Berlin", "Munich"];
    
    runMain();

    expect(logSpy).toHaveBeenCalledWith("Berlin is warmer than Munich by 4");
  });

  test("Running 'node main.js compare CityA CityB' prints 'same temperature' on a tie", () => {
    // Setup: Compare a city with itself to force a tie
    process.argv = ["node", "main.js", "compare", "Munich", "Munich"];
    
    runMain();

    expect(logSpy).toHaveBeenCalledWith("same temperature");
  });

  test("Running 'node main.js compare UnknownCity CityB' prints 'Unknown city: UnknownCity'", () => {
    // Setup: First city is unknown
    process.argv = ["node", "main.js", "compare", "UnknownCity", "Munich"];
    
    runMain();

    expect(errorSpy).toHaveBeenCalledWith("Unknown city: UnknownCity");
  });
});
