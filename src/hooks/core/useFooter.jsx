import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * useFooter Hook
 *
 * Manages navigation actions and provides dynamic values for the Footer component.
 * Supports custom onNavigate callback or falls back to React Router navigation.
 *
 * @param {Object} [options]
 * @param {function(string): void} [options.onNavigate] - Optional custom navigation handler
 * @returns {Object} { handleNavigate, currentYear }
 */
function useFooter({ onNavigate } = {}) {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigate = useCallback(
    (view) => {
      if (typeof onNavigate === "function") {
        onNavigate(view);
        return;
      }

      if (view === "terms") {
        navigate("/terms");
      } else if (view === "privacy") {
        navigate("/privacy");
      }
    },
    [navigate, onNavigate]
  );

  return {
    handleNavigate,
    currentYear,
  };
}

export default useFooter;
