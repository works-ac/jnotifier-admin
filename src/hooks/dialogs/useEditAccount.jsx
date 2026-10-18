import { useCallback, useEffect, useState } from "react";
import ApplicationApi from "../../api/ApplicationApi";
import useAppAlert from "../useAppAlert";
import { EditAccountSchema } from "../../data/schema/EditAccountSchema";
import { showZodValidationError } from "../../helpers";

/**
 * API function to edit user profile
 * Defined directly in the hook file per requirements.
 */
async function updateProfileApi(payload) {
  return await ApplicationApi.put("/users/edit-profile", payload);
}

const INITIAL_FORM = {
  fullName: "",
  mobile: "",
  category: "",
  gender: "",
  companyName: "",
  address: "",
};

function useEditAccount(profile, isOpen = false) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, handleAlertOnClose, reset, showErrorMsg } = useAppAlert();

  useEffect(() => {
    if (isOpen && profile) {
      setForm({
        fullName: profile.fullName ?? "",
        mobile: profile.mobile ?? "",
        category: profile.category ?? "",
        gender: profile.gender ?? "",
        companyName: profile.companyName ?? "",
        address: profile.address ?? "",
      });
      reset();
    }
  }, [isOpen, profile]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = useCallback(() => {
    reset();
    const validationResult = EditAccountSchema.safeParse(form);
    if (!validationResult.success) {
      showErrorMsg(
        new Error(
          showZodValidationError(validationResult.error.flatten().fieldErrors),
        ),
      );
      return false;
    }
    return true;
  }, [form, reset, showErrorMsg]);

  const handleSubmit = useCallback(
    async (successCallback, closeCallback) => {
      if (isSubmitting) return;

      reset();
      setIsSubmitting(true);

      try {
        const validationResult = EditAccountSchema.safeParse(form);
        if (!validationResult.success) {
          throw new Error(
            showZodValidationError(validationResult.error.flatten().fieldErrors),
          );
        }

        const payload = {
          fullname: form.fullName.trim(),
          mobile: form.mobile ? form.mobile.trim() : null,
          category: form.category ? form.category.trim() : null,
          gender: form.gender,
          companyName: form.companyName ? form.companyName.trim() : null,
          address: form.address ? form.address.trim() : null,
        };

        await updateProfileApi(payload);

        if (typeof successCallback === "function") {
          await successCallback();
        }
        if (typeof closeCallback === "function") {
          closeCallback();
        }
      } catch (error) {
        showErrorMsg(error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [form, isSubmitting, reset, showErrorMsg],
  );

  return {
    form,
    setForm,
    handleChange,
    validateForm,
    handleSubmit,
    isSubmitting,
    alert,
    handleAlertOnClose,
  };
}

export default useEditAccount;
