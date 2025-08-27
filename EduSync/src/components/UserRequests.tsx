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

// English: Shape we expect to read from localStorage ("requests")
interface RequestRow {
  requestId?: number;
  studentId?: number;
  requestTopic?: string;
  requestText?: string;
  requestDate?: string | Date;
  reqStatus?: string;
  handlerId?: number;
}

// English: Safe JSON.parse wrapper
function safeParse<T = unknown>(raw: string | null): T | null {
  try {
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

const STORAGE_KEY = "requests";

const UserRequests: React.FC = () => {
  const [rows, setRows] = useState<RequestRow[]>([]);
  const [studentFilter, setStudentFilter] = useState<string>("");

  // English: Load once from localStorage
  useEffect(() => {
    const data = safeParse<RequestRow[]>(localStorage.getItem(STORAGE_KEY)) ?? [];
    setRows(data);
  }, []);

  // English: Optional filtering by studentId typed by the user
  const filtered = useMemo(() => {
    const id = Number(studentFilter);
    if (!studentFilter || Number.isNaN(id)) return rows;
    return rows.filter((r) => Number(r.studentId) === id);
  }, [rows, studentFilter]);

  return (
    <Container sx={{ py: 3, direction: "rtl" }}>
      <Typography variant="h4" gutterBottom>
        פניות משתמש – בקשות
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
        <Table size="small" aria-label="user requests table">
          <TableHead>
            <TableRow>
              <TableCell>מס׳ בקשה</TableCell>
              <TableCell>מס׳ סטודנט</TableCell>
              <TableCell>נושא</TableCell>
              <TableCell>תיאור</TableCell>
              <TableCell>תאריך</TableCell>
              <TableCell>סטטוס</TableCell>
              <TableCell>גורם מטפל</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((r, idx) => (
              <TableRow key={r.requestId ?? idx}>
                <TableCell>{r.requestId ?? "-"}</TableCell>
                <TableCell>{r.studentId ?? "-"}</TableCell>
                <TableCell>{r.requestTopic ?? "-"}</TableCell>
                <TableCell>{r.requestText ?? "-"}</TableCell>
                <TableCell>
                  {r.requestDate ? new Date(r.requestDate).toLocaleDateString() : "-"}
                </TableCell>
                <TableCell>{r.reqStatus ?? "-"}</TableCell>
                <TableCell>{r.handlerId ?? "-"}</TableCell>
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

export default UserRequests;
