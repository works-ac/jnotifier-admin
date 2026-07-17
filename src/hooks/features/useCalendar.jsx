import { useState, useCallback, useMemo } from "react";
import dayjs from "dayjs";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  // Task Input Form State (Title only)
  const [taskTitle, setTaskTitle] = useState("");

  // Default Mock Tasks matching the DTO: { title, isActive, isDeleted, date }
  const [tasks, setTasks] = useState(() => {
    const today = dayjs();
    return [
      {
        id: "1",
        title: "RRB NTPC Recruitment Short Notice",
        isActive: true,
        isDeleted: false,
        date: today.format("YYYY-MM-DD"),
      },
      {
        id: "2",
        title: "SSC CGL Notification 2026",
        isActive: true,
        isDeleted: false,
        date: today.subtract(3, "day").format("YYYY-MM-DD"),
      },
      {
        id: "3",
        title: "UPSC Civil Services Prelims",
        isActive: false,
        isDeleted: false,
        date: today.subtract(8, "day").format("YYYY-MM-DD"),
      },
      {
        id: "4",
        title: "SBI PO Application Link Active",
        isActive: true,
        isDeleted: false,
        date: today.add(2, "day").format("YYYY-MM-DD"),
      },
      {
        id: "5",
        title: "IBPS Clerk Phase I Admit Card",
        isActive: true,
        isDeleted: false,
        date: today.add(15, "day").format("YYYY-MM-DD"),
      },
    ];
  });

  // Group tasks/notices by date (YYYY-MM-DD)
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach((task) => {
      if (task.date && !task.isDeleted) {
        const dateStr = task.date;
        if (!map[dateStr]) {
          map[dateStr] = [];
        }
        map[dateStr].push(task);
      }
    });
    return map;
  }, [tasks]);

  // Build the calendar days grid
  const calendarCells = useMemo(() => {
    const startOfMonth = currentMonth.startOf("month");
    const startDayOfWeek = startOfMonth.day(); // 0 is Sunday, etc.
    const daysInMonth = currentMonth.daysInMonth();

    const prevMonth = currentMonth.subtract(1, "month");
    const daysInPrevMonth = prevMonth.daysInMonth();

    const cells = [];

    // Pad previous month days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      cells.push({
        date: prevMonth.date(daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      cells.push({
        date: currentMonth.date(i),
        isCurrentMonth: true,
      });
    }

    // Pad next month days to fit 6 rows (42 cells)
    const nextMonth = currentMonth.add(1, "month");
    const remainingCells = 42 - cells.length;
    for (let i = 1; i <= remainingCells; i++) {
      cells.push({
        date: nextMonth.date(i),
        isCurrentMonth: false,
      });
    }

    return cells;
  }, [currentMonth]);

  // Navigation handlers
  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  }, []);

  const handleGoToToday = useCallback(() => {
    const today = dayjs();
    setCurrentMonth(today);
    setSelectedDate(today);
  }, []);

  // Cell click handler
  const handleCellClick = useCallback((date) => {
    setSelectedDate(date);
    setIsDialogOpen(true);
    setIsAddFormOpen(false); // Reset add form state when opening details for a day
  }, []);

  // Dialog management
  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setIsAddFormOpen(false);
  }, []);

  const handleToggleAddForm = useCallback(() => {
    setIsAddFormOpen((prev) => !prev);
  }, []);

  // Add Task Submit handler
  const handleAddTaskSubmit = useCallback(() => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskTitle.trim(),
      isActive: true,
      isDeleted: false,
      date: selectedDate.format("YYYY-MM-DD"),
    };

    setTasks((prev) => [...prev, newTask]);

    // Reset fields and close form
    setTaskTitle("");
    setIsAddFormOpen(false);
  }, [taskTitle, selectedDate]);

  // Actions for mock items inside the UI
  const handleDeleteTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDeleted: true } : t))
    );
  }, []);

  const handleToggleTaskStatus = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  }, []);

  // Selected date tasks
  const selectedDateStr = selectedDate.format("YYYY-MM-DD");
  const selectedDateTasks = useMemo(() => {
    return tasksByDate[selectedDateStr] || [];
  }, [tasksByDate, selectedDateStr]);

  return {
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
  };
}

export default useCalendar;
