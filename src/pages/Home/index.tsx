import { useEffect, useState } from "preact/hooks";
import preactLogo from "../../assets/preact.svg";

import "./style.css";

export function Home() {
  const [currentTheme, setCurrentTheme] = useState("brand-a");
  useEffect(() => {
    //set brand-a as the default theme
    document.body.setAttribute("data-theme", "brand-a");
  }, []);

  const switchBrand = () => {
    const newTheme = currentTheme === "brand-a" ? "brand-b" : "brand-a";
    document.body.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
  };

  return (
    <div class="min-h-screen bg-page p-8">
      <div class="max-w-4xl mx-auto space-y-8">
        {/* Theme Status */}
        <div class="bg-secondary rounded-lg p-6 border border-border-primary">
          <h2 class="text-2xl font-heading text-text-heading mb-4">
            Current Theme: <span class="text-text-brand">{currentTheme}</span>
          </h2>
          <button
            onClick={switchBrand}
            class="bg-action-primary hover:bg-action-primary-hover text-text-heading px-6 py-3 rounded-md font-medium transition-colors"
          >
            Switch Brand
          </button>
        </div>

        {/* Color Samples */}
        <div class="bg-secondary rounded-lg p-6 border border-border-primary">
          <h3 class="text-xl font-heading text-text-heading mb-4">
            Action Colors
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="h-20 bg-action-primary rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Primary Action</p>
            </div>
            <div>
              <div class="h-20 bg-action-secondary rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Secondary Action</p>
            </div>
            <div>
              <div class="h-20 bg-accent rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Accent</p>
            </div>
            <div>
              <div class="h-20 bg-primary rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Brand Primary</p>
            </div>
          </div>
        </div>

        {/* State Colors */}
        <div class="bg-secondary rounded-lg p-6 border border-border-primary">
          <h3 class="text-xl font-heading text-text-heading mb-4">
            State Colors
          </h3>
          <div class="grid grid-cols-3 gap-4">
            <div>
              <div class="h-16 bg-error rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Error</p>
            </div>
            <div>
              <div class="h-16 bg-warning rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Warning</p>
            </div>
            <div>
              <div class="h-16 bg-success rounded-md mb-2"></div>
              <p class="text-sm text-text-body">Success</p>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div class="bg-secondary rounded-lg p-6 border border-border-primary space-y-4">
          <h3 class="text-xl font-heading text-text-heading mb-4">
            Interactive Elements
          </h3>

          <div class="space-x-4">
            <button class="bg-action-primary hover:bg-action-primary-hover text-text-heading px-4 py-2 rounded-md">
              Primary Button
            </button>
            <button class="bg-action-secondary hover:bg-action-secondary-hover text-text-inverse px-4 py-2 rounded-md">
              Secondary Button
            </button>
          </div>

          <div class="space-y-2">
            <input
              type="text"
              placeholder="Text input with border"
              class="w-full px-4 py-2 border-2 border-border-primary rounded-md focus:border-border-selected outline-none"
            />
            <input
              type="text"
              placeholder="Selected state"
              class="w-full px-4 py-2 border-2 border-border-selected rounded-md outline-none"
            />
            <input
              type="text"
              placeholder="Error state"
              class="w-full px-4 py-2 border-2 border-border-error rounded-md outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
