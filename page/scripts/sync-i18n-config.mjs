import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const i18nDir = join(root, "public", "i18n");
const configPath = join(root, "tradux.config.json");
const publicConfigPath = join(root, "public", "tradux.config.json");

const languages = (await readdir(i18nDir))
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""))
  .sort();

if (languages.length === 0) {
  throw new Error(`No translation files found in ${i18nDir}`);
}

const config = JSON.parse(await readFile(configPath, "utf8"));
config.i18nPath = config.i18nPath || "./i18n";
config.defaultLanguage = languages.includes(config.defaultLanguage)
  ? config.defaultLanguage
  : languages.includes("en")
    ? "en"
    : languages[0];
config.availableLanguages = languages;

const serializedConfig = `${JSON.stringify(config, null, 2)}\n`;
await writeFile(configPath, serializedConfig);
await writeFile(publicConfigPath, serializedConfig);
console.log(`Synced Tradux languages: ${languages.join(", ")}`);
