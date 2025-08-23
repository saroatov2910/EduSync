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

// English: Shape we expect to read from localStorage ("feedbacks")
interface FeedbackRow {
  feedbackId?: number;
  studentId?: number;
  grade?: number | string;
  comment?: string;
  createdBy?: string;
  feedbackDate?: string | Date;
}

function safeParse<T = unknown>(raw: string | null): T | null {
  try {
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

const STORAGE_KEY = "feedbacks";

const UserFeedback: React.FC = () => {
  const [rows, setRows] = useState<FeedbackRow[]>([]);
  const [studentFilter, setStudentFilter] = useState<string>("");

  useEffect(() => {
    const data = safeParse<FeedbackRow[]>(localStorage.getItem(STORAGE_KEY)) ?? [];
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
        פניות משתמש – משובים
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
        <Table size="small" aria-label="user feedback table">
          <TableHead>
            <TableRow>
              <TableCell>מס׳ משוב</TableCell>
              <TableCell>מס׳ סטודנט</TableCell>
              <TableCell>ציון</TableCell>
              <TableCell>הערות</TableCell>
              <TableCell>נוצר על ידי</TableCell>
              <TableCell>תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((f, idx) => (
              <TableRow key={f.feedbackId ?? idx}>
                <TableCell>{f.feedbackId ?? "-"}</TableCell>
                <TableCell>{f.studentId ?? "-"}</TableCell>
                <TableCell>{f.grade ?? "-"}</TableCell>
                <TableCell>{f.comment ?? "-"}</TableCell>
                <TableCell>{f.createdBy ?? "-"}</TableCell>
                <TableCell>
                  {f.feedbackDate ? new Date(f.feedbackDate).toLocaleDateString() : "-"}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
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

export default UserFeedback;
