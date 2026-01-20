import StyleDictionary from "style-dictionary";

const brands = ["BrandA", "BrandB"];

function sanitizeBrandName(name) {
  // Convert BrandA -> brand-a, BrandB -> brand-b
  // Insert hyphen before capital letters (except the first one), then lowercase
  return name
    .replace(/([A-Z])/g, (match, p1, offset) => (offset > 0 ? "-" + p1 : p1))
    .toLowerCase();
}

// 1. NAME TRANSFORM: Clean the variable names for CSS
StyleDictionary.registerTransform({
  name: "name/clean-ids",
  type: "name",
  transform: (token) => {
    return token.path
      .filter(
        (part) =>
          ![
            "Primitives",
            "Default",
            "Mapped",
            "Alias colours",
            "Alias",
            ...brands.map((brand) => sanitizeBrandName(brand)),
          ].includes(part),
      )
      .join("-")
      .replace(/[↘︎]/g, "")
      .replace(/[\s\/]/g, "-")
      .replace(/%/g, "")
      .replace(/-+/g, "-")
      .toLowerCase();
  },
});

// 1b. VALUE TRANSFORM: Add px unit to numeric values
StyleDictionary.registerTransform({
  name: "size/pxUnit",
  type: "value",
  transitive: true,
  filter: (token) => {
    // Only apply to numeric values (Scale, spacing, sizes, etc.) - not colors or strings
    return (
      typeof token.value === "number" &&
      token.type !== "color" &&
      !token.path.includes("Font") &&
      !token.path.includes("weight")
    );
  },
  transform: (token) => {
    return token.value === 0 ? "0" : `${token.value}px`;
  },
});

// 2. PARSER: Lift tokens to the root so references can find them
StyleDictionary.registerParser({
  name: "token-unwrapper",
  pattern: /\.json$/,
  // @ts-ignore
  parser: ({ contents }) => {
    const rawData = JSON.parse(contents);
    const unwrappedData = {};
    const currentBrand = globalThis.currentBuildBrand;

    console.log(`🔍 Parsing for brand: ${currentBrand}`);

    // Deep merge helper
    const deepMerge = (target, source) => {
      for (const key in source) {
        if (
          source[key] &&
          typeof source[key] === "object" &&
          !Array.isArray(source[key])
        ) {
          if (!target[key]) target[key] = {};
          deepMerge(target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
      return target;
    };

    Object.keys(rawData).forEach((key) => {
      let shouldInclude = false;

      // For primitives build: ONLY Primitives/Default (no brand values)
      if (currentBrand === "Primitives") {
        shouldInclude = key === "Primitives/Default";
      }
      // For responsive build: Primitives + Responsive sections
      else if (currentBrand === "Responsive") {
        shouldInclude =
          key === "Primitives/Default" || key.includes("Responsive/");
      }
      // For brand builds: Include Primitives for ref resolution + Alias + Mapped
      else {
        shouldInclude =
          key === "Primitives/Default" ||
          key === "Alias colours/" + currentBrand ||
          key === "Mapped/" + currentBrand;
      }

      if (shouldInclude) {
        console.log(`  ✓ Including: ${key}`);
        let dataToMerge = rawData[key];

        deepMerge(unwrappedData, dataToMerge);
      }
    });
    return unwrappedData;
  },
});

// 3. REFERENCE CLEANER: This fixes the "{Colour.Grey.100}" strings
// It strips the "Category" prefixes from the internal references
const fixReferenceStrings = (dictionary) => {
  const recursiveFix = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        recursiveFix(obj[key]);
      } else if (
        key === "value" &&
        typeof obj[key] === "string" &&
        obj[key].includes("{")
      ) {
        // Remove prefixes that our Parser stripped from the actual paths
        let cleaned = obj[key]
          .replace(/\{Colour\./g, "{")
          .replace(/\{Brand\./g, "{")
          .replace(/\{Alias\./g, "{")
          .replace(/\{Font\./g, "{")
          .replace(/\{Scale\./g, "{")
          .replace(/\{Surface\./g, "{")
          .replace(/\{Text\./g, "{")
          .replace(/\{Icon\./g, "{")
          .replace(/\{Border\./g, "{");

        // Handle nested patterns like {Font.Brand.BrandA.Font family.Heading}
        // After stripping Font., becomes {Brand.BrandA.Font family.Heading}
        // Then strip Brand. → {BrandA.Font family.Heading}
        // Then strip "Font family." → {BrandA.Heading}
        cleaned = cleaned.replace(/Font family\./gi, "");
        cleaned = cleaned.replace(/Font weight\./gi, "");

        // Convert spaces to hyphens
        cleaned = cleaned.replace(/ /g, "-");

        obj[key] = cleaned;
      }
    }
  };
  recursiveFix(dictionary);
  return dictionary;
};

// 4. CONFIG GENERATOR FUNCTION
function createConfigForBrand(brand) {
  return {
    source: ["tokens-custom/**/*.json"],
    parsers: ["token-unwrapper"],
    log: {
      warnings: "warn",
      verbosity: "verbose",
    },
    preprocessors: [
      (dict) => {
        return fixReferenceStrings(dict);
      },
    ],
    platforms: {
      css: {
        transforms: [
          "attribute/cti",
          "name/clean-ids",
          "color/css",
          "size/pxUnit",
        ],
        buildPath: "build/css/",
        files: [
          // 1. Brand Primitives (Colour.Brand.BrandX, Font.Brand.BrandX)
          {
            destination: `${sanitizeBrandName(brand)}.primitives.css`,
            format: "css/variables",
            filter: (token) => {
              const path = token.path.join(".");
              // Only brand-specific primitives from Primitives/Default section
              return path.includes(`Brand.${brand}`);
            },
            options: {
              outputReferences: false,
              selector: `[data-theme="${sanitizeBrandName(brand)}"]`,
            },
          },
          // 2. Brand Alias (Alias colours/BrandX)
          {
            destination: `${sanitizeBrandName(brand)}.alias.css`,
            format: "css/variables",
            filter: (token) => {
              const pathStr = token.path.join(".");
              // Alias tokens: Primary, Secondary, Tertiary, etc.
              const isAlias =
                pathStr.includes("Primary") ||
                pathStr.includes("Secondary") ||
                pathStr.includes("Tertiary") ||
                pathStr.includes("Neutral") ||
                pathStr.includes("Accent") ||
                pathStr.includes("Positive") ||
                pathStr.includes("Error") ||
                pathStr.includes("Warning") ||
                pathStr.includes("Information");
              return isAlias;
            },
            options: {
              outputReferences: true,
              selector: `[data-theme="${sanitizeBrandName(brand)}"]`,
            },
          },
          // 3. Brand Mapped (Mapped/BrandX)
          {
            destination: `${sanitizeBrandName(brand)}.mapped.css`,
            format: "css/variables",
            filter: (token) => {
              const pathStr = token.path.join(".");
              // Mapped tokens: Surface, Text, Icon, Border, Font
              const isMapped =
                pathStr.includes("Surface") ||
                pathStr.includes("Text") ||
                pathStr.includes("Icon") ||
                pathStr.includes("Border") ||
                pathStr.includes("Font.Font");
              return isMapped;
            },
            options: {
              outputReferences: true,
              selector: `[data-theme="${sanitizeBrandName(brand)}"]`,
            },
          },
        ],
      },
    },
  };
}

// Primitives config - ONLY Primitives/Default (no brand-specific values)
function createPrimitivesConfig() {
  return {
    source: ["tokens-custom/**/*.json"],
    parsers: ["token-unwrapper"],
    preprocessors: [
      (dict) => {
        return fixReferenceStrings(dict);
      },
    ],
    platforms: {
      css: {
        transforms: [
          "attribute/cti",
          "name/clean-ids",
          "color/css",
          "size/pxUnit",
        ],
        buildPath: "build/css/",
        files: [
          {
            destination: "primitives.css",
            format: "css/variables",
            filter: (token) => {
              // Exclude brand-specific tokens (Colour.Brand.*, Font.Brand.*)
              const path = token.path.join(".");
              return !path.includes("Brand");
            },
            options: { selector: ":root", outputReferences: false },
          },
        ],
      },
    },
  };
}

// Responsive config - Responsive tokens only
function createResponsiveConfig() {
  return {
    source: ["tokens-custom/**/*.json"],
    parsers: ["token-unwrapper"],
    preprocessors: [
      (dict) => {
        return fixReferenceStrings(dict);
      },
    ],
    platforms: {
      css: {
        transforms: [
          "attribute/cti",
          "name/clean-ids",
          "color/css",
          "size/pxUnit",
        ],
        buildPath: "build/css/",
        files: [
          {
            destination: "responsive.css",
            format: "css/variables",
            filter: (token) => {
              // Only include tokens from Responsive sections (exclude primitives)
              const path = token.path;
              // Check if token is from responsive by excluding primitive categories
              const isNotPrimitive = !["Colour", "Font", "Scale"].includes(
                path[0],
              );
              return isNotPrimitive;
            },
            options: { selector: ":root", outputReferences: true },
          },
        ],
      },
    },
  };
}

export {
  brands,
  sanitizeBrandName,
  createConfigForBrand,
  createPrimitivesConfig,
  createResponsiveConfig,
};
