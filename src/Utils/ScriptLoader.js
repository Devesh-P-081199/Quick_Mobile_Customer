import { useEffect } from "react";

/**
 * ScriptLoader Utility
 * Loads third-party scripts (like GTM, FB Pixel) only when the main thread is idle.
 * Prevents blocking the Critical Rendering Path.
 */
const loadScript = (src, id, async = true, defer = true) => {
  if (document.getElementById(id)) return;

  const script = document.createElement("script");
  script.src = src;
  script.id = id;
  script.async = async;
  script.defer = defer;

  script.onerror = () => {
    console.warn(
      `Failed to load script: ${src}. This may be due to an ad blocker.`,
    );
  };

  document.body.appendChild(script);
};

export const useScriptLoader = (scripts) => {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        scripts.forEach(({ src, id }) => loadScript(src, id));
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        scripts.forEach(({ src, id }) => loadScript(src, id));
      }, 3000);
    }
  }, [scripts]);
};

export default useScriptLoader;
