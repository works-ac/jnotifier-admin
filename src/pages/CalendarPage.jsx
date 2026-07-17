import {
  Container,
  Divider,
  Paper,
  useTheme,
  Box,
  Typography,
  IconButton,
  Button,
  Chip,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogContent,
  TextField,
} from "@mui/material";
import Heading from "../components/Heading";
import {
  CalendarMonth,
  ChevronLeft,
  ChevronRight,
  Today,
  Delete,
  Pause,
  PlayCircle,
  NotificationImportant,
  Add,
  Close,
} from "@mui/icons-material";
import dayjs from "dayjs";
import AppTooltip from "../components/core/AppTooltip";
import useAppCss from "../hooks/useAppCss";
import useCalendar from "../hooks/features/useCalendar";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarPage() {
  const theme = useTheme();
  const { GlobalPaperCss } = useAppCss();

  // Consume logic from useCalendar hook
  const {
    currentMonth,
    selectedDate,
    calendarCells,
    tasksByDate,
    selectedDateTasks,
    isDialogOpen,
    isAddFormOpen,
    taskTitle,
    setTaskTitle,
    handlePrevMonth,
    handleNextMonth,
    handleGoToToday,
    handleCellClick,
    handleCloseDialog,
    handleToggleAddForm,
    handleAddTaskSubmit,
    handleDeleteTask,
    handleToggleTaskStatus,
  } = useCalendar();

  return (
    <Container maxWidth={false} sx={{ my: 2, px: { xs: 2, sm: 3 }, width: "100%" }}>
      <Paper variant="elevation" elevation={2} sx={{ ...GlobalPaperCss, width: "100%", p: 3 }}>
        <Heading
          Icon={CalendarMonth}
          color={theme.palette.primary.main}
          iconColor={theme.palette.warning.main}
          text="Calendar"
        />

        <Divider sx={{ mb: 3, mt: 2 }} />

        {/* Full-width Calendar Container */}
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            borderColor: "secondary.A200",
            borderRadius: 3,
            bgcolor: "background.paper",
            width: "100%",
          }}
        >
          {/* Calendar Navigation Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={handlePrevMonth}
                size="medium"
                sx={{
                  border: `1px solid ${theme.palette.secondary.A200}`,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "secondary.A50" },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNextMonth}
                size="medium"
                sx={{
                  border: `1px solid ${theme.palette.secondary.A200}`,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "secondary.A50" },
                }}
              >
                <ChevronRight />
              </IconButton>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleGoToToday}
                startIcon={<Today fontSize="small" />}
                sx={{
                  borderRadius: 2,
                  height: 38,
                  px: 2,
                }}
              >
                Today
              </Button>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "primary.main",
                textAlign: "right",
              }}
            >
              {currentMonth.format("MMMM YYYY")}
            </Typography>
          </Box>

          {/* Calendar Grid Header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1.5,
              textAlign: "center",
              fontWeight: 700,
              color: "secondary.main",
              mb: 1.5,
              width: "100%",
            }}
          >
            {WEEKDAYS.map((day) => (
              <Typography
                key={day}
                variant="subtitle2"
                sx={{ textTransform: "uppercase", fontWeight: "bold" }}
              >
                {day}
              </Typography>
            ))}
          </Box>

          {/* Calendar Grid Cells */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 1.5,
              width: "100%",
            }}
          >
            {calendarCells.map(({ date, isCurrentMonth }, idx) => {
              const dateStr = date.format("YYYY-MM-DD");
              const cellTasks = tasksByDate[dateStr] || [];
              const isToday = date.isSame(dayjs(), "day");
              const isSelected = date.isSame(selectedDate, "day");

              // Determine colors based on active task presence
              const hasActive = cellTasks.some((n) => n.isActive && !n.isDeleted);

              return (
                <Box
                  key={idx}
                  onClick={() => handleCellClick(date)}
                  sx={{
                    minHeight: { xs: 80, md: 100 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    p: 1,
                    border: "1px solid",
                    borderColor: isSelected
                      ? "primary.A700"
                      : isToday
                      ? "primary.main"
                      : "secondary.A200",
                    borderRadius: 3,
                    bgcolor: isSelected
                      ? "rgba(37, 99, 235, 0.08)"
                      : isToday
                      ? "rgba(0, 0, 128, 0.04)"
                      : isCurrentMonth
                      ? "background.paper"
                      : "secondary.A50",
                    opacity: isCurrentMonth ? 1 : 0.45,
                    cursor: "pointer",
                    transition: "all 0.25s ease-in-out",
                    position: "relative",
                    overflow: "hidden",
                    outline: isSelected
                      ? `2px solid ${theme.palette.primary.A700}`
                      : "none",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
                      borderColor: isSelected
                        ? "primary.A700"
                        : "primary.main",
                      bgcolor: isSelected
                        ? "rgba(37, 99, 235, 0.12)"
                        : "secondary.A50",
                    },
                  }}
                >
                  {/* Date Label */}
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: isToday || isSelected ? 800 : 500,
                      color: isSelected
                        ? "primary.A700"
                        : isToday
                        ? "primary.main"
                        : "text.primary",
                      lineHeight: 1,
                    }}
                  >
                    {date.date()}
                  </Typography>

                  {/* Tasks indicators */}
                  {cellTasks.length > 0 && (
                    <Box sx={{ mt: 1, width: "100%" }}>
                      <Chip
                        size="small"
                        label={`${cellTasks.length} Task${
                          cellTasks.length > 1 ? "s" : ""
                        }`}
                        sx={{
                          height: 20,
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          bgcolor: hasActive
                            ? "rgba(34, 139, 34, 0.1)"
                            : "rgba(115, 115, 115, 0.1)",
                          color: hasActive
                            ? "success.main"
                            : "secondary.main",
                          border: `1px solid ${
                            hasActive
                              ? theme.palette.success.main
                              : theme.palette.secondary.main
                          }`,
                          width: "100%",
                          justifyContent: "center",
                          borderRadius: 1.5,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Paper>

      {/* Task Details Dialog Modal */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, overflow: "hidden" } }}
      >
        {/* Custom Header Bar */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "primary.main",
            color: "white",
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Tasks for {selectedDate.format("MMMM D, YYYY")}
          </Typography>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>

        {/* Dialog Content listing tasks in a flex column */}
        <DialogContent sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Add Task Control - top right corner above first tile */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
            <Button
              variant="contained"
              color={isAddFormOpen ? "error" : "success"}
              size="small"
              startIcon={isAddFormOpen ? <Close fontSize="small" /> : <Add fontSize="small" />}
              onClick={handleToggleAddForm}
            >
              {isAddFormOpen ? "Cancel" : "Add Task"}
            </Button>
          </Box>

          {/* Inline Form to add a new task */}
          {isAddFormOpen && (
            <Card
              variant="outlined"
              sx={{
                p: 2,
                borderColor: "success.main",
                borderRadius: 2.5,
                bgcolor: "success.A100", // Soft background for form
                mb: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, mb: 1.5, color: "success.main" }}
              >
                Create New Task
              </Typography>
              <Stack spacing={1.5}>
                <TextField
                  label="Task Title"
                  fullWidth
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 0.5 }}>
                  <Button
                    size="small"
                    variant="text"
                    color="error"
                    onClick={handleToggleAddForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={handleAddTaskSubmit}
                    disabled={!taskTitle.trim()}
                  >
                    Save Task
                  </Button>
                </Box>
              </Stack>
            </Card>
          )}

          {/* List of Tasks */}
          {selectedDateTasks.length > 0 ? (
            <Stack spacing={2} sx={{ width: "100%" }}>
              {selectedDateTasks.map((task) => (
                <Card
                  key={task.id}
                  variant="outlined"
                  sx={{
                    borderRadius: 2.5,
                    borderColor: "secondary.A200",
                    borderLeft: `5px solid ${
                      task.isActive ? theme.palette.success.main : theme.palette.secondary.main
                    }`,
                    width: "100%",
                  }}
                >
                  <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                        {task.title}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Chip
                          label={task.isActive ? "Active" : "Archived"}
                          size="small"
                          color={task.isActive ? "success" : "secondary"}
                          sx={{ fontSize: "0.65rem", height: 18, fontWeight: "bold" }}
                        />
                        <AppTooltip title={task.isActive ? "Archive" : "Activate"}>
                          <IconButton
                            size="small"
                            color={task.isActive ? "success" : "error"}
                            onClick={() => handleToggleTaskStatus(task.id)}
                          >
                            {task.isActive ? (
                              <Pause fontSize="small" />
                            ) : (
                              <PlayCircle fontSize="small" />
                            )}
                          </IconButton>
                        </AppTooltip>
                        <AppTooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </AppTooltip>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 6,
                px: 2,
                gap: 1.5,
                textAlign: "center",
                bgcolor: "secondary.A50",
                borderRadius: 3,
                border: "1px dashed",
                borderColor: "secondary.A100",
                width: "100%",
              }}
            >
              <NotificationImportant
                sx={{ fontSize: 40, color: "secondary.main", opacity: 0.5 }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                No tasks scheduled for this date
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Click the "Add Task" button above to schedule a new task.
              </Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default CalendarPage;
