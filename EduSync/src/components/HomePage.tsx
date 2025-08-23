import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid, // If you're not on MUI v6, replace with: import Grid from "@mui/material/Grid";
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// ---- Types ----
// English comment: a minimal row type for the home table (adapt to your real entity).
interface Row {
  id: number | string;
  title: string;
  date?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);

  // English comment: Load initial data from localStorage or fall back to demo rows.
  useEffect(() => {
    // Try "feedbacks" first; if not found, try "students"; otherwise use demo rows.
    const fromFeedbacks = safeParse(localStorage.getItem("feedbacks")) as
      | Array<{ feedbackId?: number; comment?: string; feedbackDate?: string }>
      | null;

    if (fromFeedbacks?.length) {
      setRows(
        fromFeedbacks.slice(0, 10).map((f, i) => ({
          id: f.feedbackId ?? i + 1,
          title: f.comment ?? "Feedback",
          date: f.feedbackDate ?? "",
        })),
      );
      return;
    }

    const fromStudents = safeParse(localStorage.getItem("students")) as
      | Array<{ id?: number | string; fullName?: string }>
      | null;

    if (fromStudents?.length) {
      setRows(
        fromStudents.slice(0, 10).map((s, i) => ({
          id: s.id ?? i + 1,
          title: s.fullName ?? "Student",
        })),
      );
      return;
    }

    // English comment: Demo fallback if localStorage has no data yet.
    setRows([
      { id: 1, title: "Welcome to EduSync", date: new Date().toISOString().slice(0, 10) },
      { id: 2, title: "Use the buttons to navigate" },
      { id: 3, title: "Load data appears here" },
    ]);
  }, []);

  // English comment: Safer JSON.parse wrapper.
  function safeParse(value: string | null) {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  return (
    <Box component="main" sx={{ p: 2 }}>
      {/* English comment: Page title */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        דף הבית
      </Typography>

      {/* English comment: Quick navigation cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Forms</Typography>
              <Typography variant="body2" color="text.secondary">
                מעבר למסכי הטפסים שהגדרתם בתכנון.
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate("/forms")} variant="contained">
                Go to Forms
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Management</Typography>
              <Typography variant="body2" color="text.secondary">
                ניווט למסכי הניהול (טבלאות/CRUD).
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate("/management")} variant="contained">
                Go to Management
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">Help</Typography>
              <Typography variant="body2" color="text.secondary">
                קישורים ומידע מסייע למשתמשים.
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => navigate("/help")} color="secondary" variant="outlined">
                Open Help
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* English comment: A small table on the home page (demo or localStorage data). */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        עדכונים אחרונים
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="home table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.title}</TableCell>
                <TableCell>{r.date ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
