import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import PropTypes from "prop-types";

/**
 * ResponsiveImage — displays an image that scales responsively inside its
 * container while respecting a max dimensions, aspect ratio, and object-fit.
 *
 * Props:
 *   src          – image URL (required)
 *   alt          – alt text (required for accessibility)
 *   aspectRatio  – CSS aspect-ratio string, e.g. "16/9" | "4/3" | "1/1"
 *                  When set the image is placed inside a padded wrapper that
 *                  preserves the ratio regardless of the container width.
 *   objectFit    – CSS object-fit value (default: "cover")
 *   borderRadius – CSS border-radius (default: 8)
 *   maxWidth     – max CSS width of the image wrapper (default: "100%")
 *   maxHeight    – max CSS height when no aspectRatio is provided
 *   showSkeleton – show a spinner while loading (default: true)
 *   caption      – optional caption text rendered below the image
 *   sx           – extra sx props forwarded to the outermost Box
 *   imgSx        – extra sx props forwarded to the <img> element Box
 *   onClick      – click handler (adds pointer cursor)
 */
function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  objectFit = "cover",
  borderRadius = 2,
  maxWidth = "100%",
  maxHeight,
  showSkeleton = true,
  caption,
  sx = {},
  imgSx = {},
  onClick,
}) {
  const [status, setStatus] = useState("loading"); // "loading" | "loaded" | "error"

  const isClickable = typeof onClick === "function";

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...sx,
      }}
    >
      {/* Aspect-ratio wrapper (optional) */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          ...(aspectRatio
            ? { aspectRatio, overflow: "hidden" }
            : { maxHeight: maxHeight ?? "auto" }),
          borderRadius,
          overflow: "hidden",
          bgcolor: "grey.100",
          cursor: isClickable ? "pointer" : "default",
          transition: "box-shadow 0.2s",
          ...(isClickable && {
            "&:hover": { boxShadow: 4 },
          }),
        }}
        onClick={onClick}
      >
        {/* Loading spinner */}
        {showSkeleton && status === "loading" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
              zIndex: 1,
            }}
          >
            <CircularProgress size={32} color="primary" />
          </Box>
        )}

        {/* Error state */}
        {status === "error" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "grey.100",
              gap: 1,
            }}
          >
            <BrokenImageIcon sx={{ fontSize: 48, color: "text.disabled" }} />
            <Typography variant="caption" color="text.disabled">
              Image unavailable
            </Typography>
          </Box>
        )}

        {/* The actual image */}
        <Box
          component="img"
          src={src}
          alt={alt}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          sx={{
            display: "block",
            width: "100%",
            height: aspectRatio ? "100%" : "auto",
            maxHeight: !aspectRatio && maxHeight ? maxHeight : undefined,
            objectFit,
            objectPosition: "center",
            opacity: status === "loaded" ? 1 : 0,
            transition: "opacity 0.35s ease",
            ...imgSx,
          }}
        />
      </Box>

      {/* Optional caption */}
      {caption && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 0.75, textAlign: "center", width: "100%" }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspectRatio: PropTypes.string,
  objectFit: PropTypes.string,
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  showSkeleton: PropTypes.bool,
  caption: PropTypes.string,
  sx: PropTypes.object,
  imgSx: PropTypes.object,
  onClick: PropTypes.func,
};

export default React.memo(ResponsiveImage);
