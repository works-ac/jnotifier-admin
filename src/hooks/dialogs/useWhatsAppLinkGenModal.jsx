import React, { useCallback, useState } from "react";
import { WhatsAppLinkGenData } from "../../data/WhatsAppLinkGenData";
import { getWhatsAppLink } from "../../helpers";

function useWhatsAppLinkGenModal() {
  const [details, setDetails] = useState(WhatsAppLinkGenData);
  const [showCnfTxt, setShowCnfTxt] = useState(false);

  const handleTextBoxOnChange = useCallback(function (e) {
    e.preventDefault();

    const { name, value } = e.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmitBtn = useCallback(async function (mobile, message) {
    const link = getWhatsAppLink(mobile, message);
    await navigator.clipboard.writeText(link);
    setShowCnfTxt(true);

    setTimeout(() => {
      setShowCnfTxt(false);
    }, 2000);
  }, []);

  return { details, showCnfTxt, handleTextBoxOnChange, handleSubmitBtn };
}

export default useWhatsAppLinkGenModal;
