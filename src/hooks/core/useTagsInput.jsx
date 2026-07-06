import React, { useCallback } from "react";

function useTagsInput(setForm) {
  const handleAddTag = useCallback((tag) => {
    const trimmed = tag.trim();
    if (!trimmed) return;

    setForm((prev) => ({
      ...prev,
      tags: prev.tags.includes(trimmed) ? prev.tags : [...prev.tags, trimmed],
    }));
  }, []);

  const handleRemoveTag = useCallback((tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }, []);

  return { handleAddTag, handleRemoveTag };
}

export default useTagsInput;
