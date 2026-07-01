import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Tooltip,
  Paper,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateRight,
  RestartAlt,
  Download,
  FitScreen,
} from "@mui/icons-material";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import * as pdfjsLib from "pdfjs-dist";
import PropTypes from "prop-types";

// Set worker to use the local assets folder with .js extension to prevent MIME errors
const workerPath = `/assets/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = workerPath;
pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

const pdfOptions = {
  // wasmUrl: `${process.env.PUBLIC_URL}/assets/`,
  wasmUrl: `/assets/`,
};

function PDFViewer({
  file,
  fileName = "document.pdf",
  disableDownloadable = false,
  showBorders = false,
  colorizeToolbar = false,
  hideZoomControls = false,
}) {
  const theme = useTheme();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Handle Overflow checking
  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollHeight, clientHeight } =
          scrollRef.current;
        setIsOverflowing(
          scrollWidth > Math.ceil(clientWidth) ||
            scrollHeight > Math.ceil(clientHeight),
        );
      }
    };

    const timer = setTimeout(checkOverflow, 150);
    window.addEventListener("resize", checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [scale, rotation, pageNumber, numPages, containerWidth]);

  // Handle container resize
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setScale(1.0);
    setRotation(0);
    setPageNumber(1);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartY(e.pageY - scrollRef.current.offsetTop);
    setScrollLeft(scrollRef.current.scrollLeft);
    setScrollTop(scrollRef.current.scrollTop);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const y = e.pageY - scrollRef.current.offsetTop;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX);
    scrollRef.current.scrollTop = scrollTop - (y - startY);
  };

  return (
    <Paper
      ref={containerRef}
      elevation={0}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        bgcolor: "background.default",
        border: showBorders
          ? `1px solid ${theme.palette.secondary["100"]}`
          : "none",
        borderRadius: showBorders ? "2px" : "0px",
      })}
    >
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 1,
          width: "100%",
          justifyContent: "center",
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: colorizeToolbar
            ? theme.palette.secondary.A50
            : "background.paper",
          flexWrap: "wrap",
        }}
      >
        <Tooltip title="Previous Page">
          <span>
            <IconButton
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              size="small"
            >
              <ChevronLeft />
            </IconButton>
          </span>
        </Tooltip>

        <Typography variant="body2" sx={{ mx: 1 }}>
          Page {pageNumber} of {numPages || "--"}
        </Typography>

        <Tooltip title="Next Page">
          <span>
            <IconButton
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber((prev) => prev + 1)}
              size="small"
            >
              <ChevronRight />
            </IconButton>
          </span>
        </Tooltip>

        {!hideZoomControls && (
          <>
            <Tooltip title="Zoom Out">
              <IconButton onClick={handleZoomOut} size="small">
                <ZoomOut />
              </IconButton>
            </Tooltip>

            <Typography
              variant="body2"
              sx={{ minWidth: 40, textAlign: "center" }}
            >
              {Math.round(scale * 100)}%
            </Typography>

            <Tooltip title="Zoom In">
              <IconButton onClick={handleZoomIn} size="small">
                <ZoomIn />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reset Zoom">
              <IconButton onClick={() => setScale(1.0)} size="small">
                <FitScreen />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip title="Rotate">
          <IconButton onClick={handleRotate} size="small">
            <RotateRight />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reset">
          <IconButton onClick={handleReset} size="small">
            <RestartAlt />
          </IconButton>
        </Tooltip>

        {!disableDownloadable && (
          <Tooltip title="Download">
            <IconButton onClick={handleDownload} size="small">
              <Download />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* PDF Content */}
      <Box
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        sx={{
          flex: 1,
          width: "100%",
          overflow: "auto",
          display: "flex",
          p: 2,
          cursor: isOverflowing ? (isDragging ? "grabbing" : "grab") : "auto",
          userSelect: isDragging ? "none" : "auto",
          bgcolor: "grey.100",
        }}
      >
        <Box sx={{ margin: "auto" }}>
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<CircularProgress />}
            error={<Typography color="error">Failed to load file.</Typography>}
            options={pdfOptions}
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              scale={scale}
              rotate={rotation}
              width={containerWidth ? Math.min(containerWidth - 40, 800) : 600} // Responsive width with padding
            />
          </Document>
        </Box>
      </Box>
    </Paper>
  );
}

PDFViewer.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  fileName: PropTypes.string,
  disableDownloadable: PropTypes.bool,
  showBorders: PropTypes.bool,
  colorizeToolbar: PropTypes.bool,
  hideZoomControls: PropTypes.bool,
};

export default React.memo(PDFViewer);
