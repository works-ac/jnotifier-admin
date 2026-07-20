import { TextFields, Title } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

const AddNoticeDialogDataLayout = [
  {
    name: "noticeTitle",
    id: "noticeTitle",
    label: "Notice Title",
    type: "text",
    required: true,
    layout: "1 0 100%",
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <Title fontSize="small" color="primary" />
          </InputAdornment>
        ),
        sx: {
          fontWeight: 700,
          color: "primary.main",
        },
      },
    },
    placeholder: "For ex - RRB Recruitment Short Notice",
  },
  {
    name: "noticeDesc",
    id: "noticeDesc",
    label: "Notice Description",
    type: "text",
    required: true,
    layout: "1 0 100%",
    multiline: true,
    rows: 4,
    placeholder: "For ex - RRB Recruitment Short Notice",
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <TextFields fontSize="small" />
          </InputAdornment>
        ),
      },
    },
  },
];

export default AddNoticeDialogDataLayout;
