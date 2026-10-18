import { useCallback, useState } from "react";

function useAppMdEditor(setForm) {
  const [showMdEditor, setShowMdEditor] = useState(false);

  const handleMdEditorDialog = useCallback(function () {
    setShowMdEditor((prev) => !prev);
  }, []);

  const handleMdEditorSubmitBtnClick = useCallback(function (value, name) {
    if (!name || value === undefined || value === null) return;

    setForm((prev) => ({ ...prev, [name]: value }));
    handleMdEditorDialog();
  }, []);

  return { showMdEditor, handleMdEditorDialog, handleMdEditorSubmitBtnClick };
}

export default useAppMdEditor;
