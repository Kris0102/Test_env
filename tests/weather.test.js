"use strict";

const { levenshteinDistance, formatTemperature } = require("../utils");
const { findCity, getWeather } = require("../weather");
const { loadConfig } = require("../config");
const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const REPO_ROOT = path.join(__dirname, "..");
const MAIN_JS = path.join(REPO_ROOT, "main.js");

describe("levenshteinDistance", () => {
  test("calculates distance between kitten and sitting as 3", () => {
    expect(levenshteinDistance("kitten", "sitting")).toBe(3);
  });

  test("calculates distance between berlin and berlin as 0", () => {
    expect(levenshteinDistance("berlin", "berlin")).toBe(0);
  });

  test("calculates distance between empty string and abc as 3", () => {
    expect(levenshteinDistance("", "abc")).toBe(3);
  });

  test("throws TypeError if either argument is not a string", () => {
    expect(() => levenshteinDistance(null, "abc")).toThrow(TypeError);
    expect(() => levenshteinDistance("abc", 123)).toThrow(TypeError);
  });
});

describe("findCity", () => {
  test("returns exact match", () => {
    expect(findCity("Munich")).toEqual({ city: "Munich", corrected: false });
  });

  test("returns case-insensitive match", () => {
    expect(findCity("munich")).toEqual({ city: "Munich", corrected: true });
  });

  test("returns closest match within distance 2", () => {
    expect(findCity("Berlim")).toEqual({ city: "Berlin", corrected: true });
  });

  test("throws Error for far-off name", () => {
    expect(() => findCity("Tokyo")).toThrow("Unknown city: Tokyo");
  });

  test("throws Error with suggestion for near miss (distance 3)", () => {
    // "Berlin" vs "Brlin" is 1, "Berlin" vs "Brl" is 3.
    // Let's find a string that is distance 3 from any city in DB.
    // Berlin (6), Munich (6), Hamburg (7)
    // "Brlin" is dist 1. "Brl" is dist 3.
    // Let's use a specific case: "Berln" is dist 1. "Bln" is dist 2. "B" is dist 5.
    // "Berli" is dist 1.
    // Let's try "Berl" -> dist 2.
    // Let's try "Brl" -> dist 3.
    expect(() => findCity("Brl")).toThrow(/Unknown city: Brl\. Did you mean Berlin\?/);
  });

  test("throws Error listing all tied cities alphabetically for equidistant query", () => {
    // "Munlin" is at Levenshtein distance 3 from both "Munich" and "Berlin",
    // and distance 7 from "Hamburg" (verified manually), so it ties within
    // the suggestion range and should list both cities alphabetically.
    expect(() => findCity("Munlin")).toThrow(
      "Unknown city: Munlin. Did you mean Berlin or Munich?"
    );
  });
});

describe("getWeather", () => {
  test("returns canonical city name for case-insensitive input", () => {
    const result = getWeather("hamburg");
    expect(result.city).toBe("Hamburg");
    expect(result.corrected).toBe(true);
  });

  test("returns correct data for exact match", () => {
    const result = getWeather("Berlin");
    expect(result.city).toBe("Berlin");
    expect(result.corrected).toBe(false);
  });

  test("returns unit 'C' by default, unchanged from previous behavior", () => {
    const result = getWeather("Berlin");
    expect(result).toEqual({
      city: "Berlin",
      temperature: 22,
      condition: "Sunny",
      unit: "C",
      corrected: false,
    });
  });

  test("returns Fahrenheit temperature and unit when unit 'F' is requested", () => {
    const result = getWeather("hamburg", "F");
    expect(result).toEqual({
      city: "Hamburg",
      temperature: 59,
      condition: "Rainy",
      unit: "F",
      corrected: true,
    });
  });
});

describe("formatTemperature", () => {
  test("rounds Celsius values to one decimal", () => {
    expect(formatTemperature(18, "C")).toBe(18);
    expect(formatTemperature(22.34, "C")).toBe(22.3);
  });

  test("converts Celsius to Fahrenheit and rounds to one decimal", () => {
    expect(formatTemperature(18, "F")).toBe(64.4);
    expect(formatTemperature(22, "F")).toBe(71.6);
    expect(formatTemperature(15, "F")).toBe(59);
  });

  test("throws TypeError for non-number value", () => {
    expect(() => formatTemperature("18", "C")).toThrow(TypeError);
  });

  test("throws Error for unsupported unit", () => {
    expect(() => formatTemperature(18, "K")).toThrow("Unsupported unit: K");
  });
});

describe("config.js loadConfig", () => {
  let tmpDir;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wrc-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test("returns defaults when no config file exists", () => {
    expect(loadConfig(tmpDir)).toEqual({ defaultUnit: "C", aliases: {} });
  });

  test("returns normalized config for a valid config file", () => {
    fs.writeFileSync(
      path.join(tmpDir, ".weatherrc.json"),
      JSON.stringify({ defaultUnit: "F", aliases: { muc: "Munich" } })
    );
    expect(loadConfig(tmpDir)).toEqual({
      defaultUnit: "F",
      aliases: { muc: "Munich" },
    });
  });

  test("throws Error for invalid JSON", () => {
    fs.writeFileSync(path.join(tmpDir, ".weatherrc.json"), "{ not valid json");
    expect(() => loadConfig(tmpDir)).toThrow("Invalid config: invalid JSON");
  });

  test("throws Error for bad defaultUnit", () => {
    fs.writeFileSync(
      path.join(tmpDir, ".weatherrc.json"),
      JSON.stringify({ defaultUnit: "K" })
    );
    expect(() => loadConfig(tmpDir)).toThrow(
      'Invalid config: defaultUnit must be "C" or "F"'
    );
  });

  test("throws Error for bad aliases", () => {
    fs.writeFileSync(
      path.join(tmpDir, ".weatherrc.json"),
      JSON.stringify({ aliases: { muc: 123 } })
    );
    expect(() => loadConfig(tmpDir)).toThrow(
      "Invalid config: aliases must be an object of string to string"
    );
  });
});

describe("main.js CLI", () => {
  test("prints usage and exits 1 when no city is given", () => {
    const result = spawnSync("node", [MAIN_JS], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Usage: node main.js <city> [<city> ...] [--unit C|F]"
    );
  });

  test("prints weather for a single valid city and exits 0", () => {
    const result = spawnSync("node", [MAIN_JS, "Berlin"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Weather in Berlin: 22°C, Sunny");
  });

  test("supports --unit F flag", () => {
    const result = spawnSync("node", [MAIN_JS, "hamburg", "--unit", "F"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain("Weather in Hamburg: 59°F, Rainy");
    expect(result.stdout).toContain('corrected "hamburg" -> "Hamburg"');
  });

  test("continues processing remaining cities after one fails, exits 1", () => {
    const result = spawnSync("node", [MAIN_JS, "Berlin", "Tokyo"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    });
    expect(result.status).toBe(1);
    expect(result.stdout).toContain("Weather in Berlin: 22°C, Sunny");
    expect(result.stderr).toContain("Unknown city: Tokyo");
  });

  test("resolves aliases from .weatherrc.json before fuzzy matching", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wrc-cli-"));
    try {
      fs.writeFileSync(
        path.join(tmpDir, ".weatherrc.json"),
        JSON.stringify({ aliases: { muc: "Munich" } })
      );
      const result = spawnSync("node", [MAIN_JS, "muc"], {
        cwd: tmpDir,
        encoding: "utf8",
      });
      expect(result.status).toBe(0);
      expect(result.stdout).toContain("Weather in Munich: 18°C, Partly Cloudy");
      expect(result.stdout).not.toContain("corrected");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
