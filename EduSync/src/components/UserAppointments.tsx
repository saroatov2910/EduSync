import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  TextField,
  Box,
} from "@mui/material";

// English: Shape we expect to read from localStorage ("appointments")
interface AppointmentRow {
  appointmentId?: number;
  requestId?: number;
  appointmentDate?: string | Date;
  appointmentTime?: string;
  appointmentType?: string;
  location?: string;
  status?: string;
  studentId?: number;
}

function safeParse<T = unknown>(raw: string | null): T | null {
  try {
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

const STORAGE_KEY = "appointments";

const UserAppointments: React.FC = () => {
  const [rows, setRows] = useState<AppointmentRow[]>([]);
  const [studentFilter, setStudentFilter] = useState<string>("");

  useEffect(() => {
    const data = safeParse<AppointmentRow[]>(localStorage.getItem(STORAGE_KEY)) ?? [];
    setRows(data);
  }, []);

  const filtered = useMemo(() => {
    const id = Number(studentFilter);
    if (!studentFilter || Number.isNaN(id)) return rows;
    return rows.filter((r) => Number(r.studentId) === id);
  }, [rows, studentFilter]);

  return (
    <Container sx={{ py: 3, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        פניות משתמש – פגישות
      </Typography>

      {/* English: Filter by studentId (optional) */}
      <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
        <TextField
          label="סינון לפי מספר סטודנט (לא חובה)"
          value={studentFilter}
          onChange={(e) => setStudentFilter(e.target.value)}
          sx={{ maxWidth: 320 }}
          inputProps={{ inputMode: "numeric" }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="user appointments table">
          <TableHead>
            <TableRow>
              <TableCell>מס׳ פגישה</TableCell>
              <TableCell>מס׳ בקשה</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>שעה</TableCell>
              <TableCell>סוג פגישה</TableCell>
              <TableCell>מיקום</TableCell>
              <TableCell>סטטוס</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((a, idx) => (
              <TableRow key={a.appointmentId ?? idx}>
                <TableCell>{a.appointmentId ?? "-"}</TableCell>
                <TableCell>{a.requestId ?? "-"}</TableCell>
                <TableCell>
                  {a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{a.appointmentTime ?? "-"}</TableCell>
                <TableCell>{a.appointmentType ?? "-"}</TableCell>
                <TableCell>{a.location ?? "-"}</TableCell>
                <TableCell>{a.status ?? "-"}</TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  אין נתונים להצגה
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserAppointments;
