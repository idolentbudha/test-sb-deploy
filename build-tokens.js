import StyleDictionary from "style-dictionary";
import {
  brands,
  createConfigForBrand,
  createPrimitivesConfig,
  createResponsiveConfig,
  sanitizeBrandName,
} from "./config.js";

async function runBuild() {
  console.log(
    "🚀 Starting Multi-Brand Token Build (following $metadata.tokenSetOrder)...",
  );
  console.log(
    "Order: Primitives → Brand Aliases → Brand Mapped → Responsive\n",
  );

  // 1. Build primitives FIRST (Primitives/Default only)
  console.log(`📦 Building: primitives.css (Primitives/Default only)`);
  globalThis.currentBuildBrand = "Primitives";

  try {
    const config = createPrimitivesConfig();
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  } catch (err) {
    console.error(`❌ Failed building primitives.css:`, err.message);
  }

  // 2. Build each brand (Alias colours + Mapped, NO primitives)
  for (const brand of brands) {
    const brandSlug = sanitizeBrandName(brand);
    console.log(`\n📦 Building: ${brandSlug}.* files`);
    console.log(`   Sections: Alias colours/${brand} + Mapped/${brand}`);

    // Set the brand context globally BEFORE creating the config
    globalThis.currentBuildBrand = brand;

    try {
      const config = createConfigForBrand(brand);
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
    } catch (err) {
      console.error(
        `❌ Failed building brand-${brand.toLowerCase()}.css:`,
        err.message,
      );
    }
  }

  // 3. Build responsive tokens
  console.log(
    `\n📦 Building: responsive.css (Responsive/Desktop + Responsive/Mobile)`,
  );
  globalThis.currentBuildBrand = "Responsive";

  try {
    const config = createResponsiveConfig();
    const sd = new StyleDictionary(config);
    await sd.buildAllPlatforms();
  } catch (err) {
    console.error(`❌ Failed building responsive.css:`, err.message);
  }

  console.log("\n✅ All builds complete!");
  console.log("\n📂 Output files:");
  console.log("   - build/css/primitives.css (base values, :root)");
  console.log(
    "   - build/css/brand-branda.css (brand overrides, .brand-branda)",
  );
  console.log(
    "   - build/css/brand-brandb.css (brand overrides, .brand-brandb)",
  );
  console.log("   - build/css/responsive.css (responsive values, :root)");
}

runBuild();
