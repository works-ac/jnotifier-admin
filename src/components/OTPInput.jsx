import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";

const OtpInput = ({
  length = 6,
  onComplete,
  onResend,
  username,
  isVerifying = false,
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes
  const inputRefs = useRef([]);

  // Auto-focus the first input field on component mount
  useEffect(() => {
    if (inputRefs.current[0] && !isVerifying) {
      inputRefs.current[0].focus();
    }
  }, [isVerifying]);

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft <= 0 || isVerifying) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isVerifying]);

  const handleChange = (index, e) => {
    const value = e.target.value;

    // Allow only numbers
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take the last character in case the user types very fast
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Trigger onComplete callback if all fields are filled
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length && onComplete) {
      onComplete(combinedOtp);
    }

    // Move focus to the next input if the current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    // Ensure the cursor is always at the end of the text
    inputRefs.current[index].setSelectionRange(1, 1);

    // Optional: Auto-focus the first empty field to prevent users from skipping
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous field and clear it if current is empty
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Stop if pasted data isn't numbers
    if (isNaN(pastedData)) return;

    const pastedArray = pastedData.slice(0, length).split("");
    const newOtp = [...otp];

    pastedArray.forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtp(newOtp);

    // Focus the last filled input, or the end if fully filled
    const focusIndex =
      pastedArray.length < length ? pastedArray.length : length - 1;
    inputRefs.current[focusIndex].focus();

    if (pastedArray.length === length && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleResendClick = () => {
    if (timeLeft === 0 && onResend) {
      onResend({ username });
      setTimeLeft(120); // Reset timer back to 2 minutes
      setOtp(new Array(length).fill("")); // Optional: Clear inputs on resend
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    }
  };

  // Helper to format seconds into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Conditional Rendering for Verifying State
  if (isVerifying) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "120px", // Keeps the layout stable when swapping from textboxes to loader
          width: "100%",
        }}
      >
        <CircularProgress size={40} />
        <span
          style={{
            marginTop: "16px",
            fontSize: "16px",
            fontWeight: "500",
            color: "#555",
          }}
        >
          Verifying OTP...
        </span>
      </div>
    );
  }

  return (
    // Outer wrapper set to inline-flex column to align child items to the right
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-end",
        width: "100%", // Ensures responsive alignment within parent
      }}
    >
      {/* OTP Inputs Container */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%", // Keeps textboxes centered properly
        }}
      >
        {otp.map((value, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            style={{
              width: "50px",
              height: "60px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              borderRadius: "8px",
              border: "2px solid #ccc",
              outline: "none",
              transition: "border-color 0.2s, transform 0.2s ease-in-out", // Added transform transition
              transform: "scale(1)", // Base scale
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
              e.target.style.transform = "scale(1.1)"; // Scale up smoothly
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.transform = "scale(1)"; // Scale back down
            }}
          />
        ))}
      </div>

      {/* Resend Link Container */}
      <div style={{ marginTop: "12px", fontSize: "14px", fontWeight: "500" }}>
        {timeLeft > 0 ? (
          <span style={{ color: "#888" }}>
            Resend OTP in{" "}
            <span style={{ fontWeight: "bold" }}>{formatTime(timeLeft)}</span>
          </span>
        ) : (
          <button
            onClick={handleResendClick}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: 0,
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {/* Refresh / Send Icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.27l1.75 1.7" />
            </svg>
            Resend OTP
          </button>
        )}
      </div>
    </div>
  );
};

OtpInput.propTypes = {
  length: PropTypes.number,
  onComplete: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  isVerifying: PropTypes.bool, // Added prop validation
};

export default React.memo(OtpInput);
