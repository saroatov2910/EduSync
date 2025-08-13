import React from "react";
import { useEffect, useMemo, useState } from "react";

export type Role = "מרצה" | "מזכירות";

export default class CareHandler {
  /** Handler identifier (required & unique; numeric) */
  handlerId: number;
  /** Name (required) */
  name: string;
  /** Role (required: "מרצה" | "מזכירות") */
  role: Role;
  /** Email (required & valid) */
  email: string;
  /** Responsibility area (required) */
  responsibility: string;

  constructor(
    handlerId: number,
    name: string,
    role: Role,
    email: string,
    responsibility: string
  ) {
    this.handlerId = handlerId; // number (no trim)
    this.name = name.trim();
    this.role = role;
    this.email = email.trim();
    this.responsibility = responsibility.trim();
  }

  /** Factory constructor from a plain object (used when reading from localStorage) */
  static from(obj: unknown): CareHandler {
    const o = obj as Record<string, unknown>;
    // Accept either "handlerId" or generic "id" from storage and coerce to number
    const idNum = Number(
      (o.handlerId as number | string | undefined) ??
      (o.id as number | string | undefined) ??
      0
    );

    return new CareHandler(
      idNum,
      String(o.name ?? ""),
      (o.role as Role) ?? "מרצה",
      String(o.email ?? ""),
      String(o.responsibility ?? "")
    );
  }

  /** Create a random handler (ensures uniqueness against existing numeric IDs if provided) */
  static random(existingIds: Set<number> = new Set()): CareHandler {
    // Numeric handlerId, 4 digits (1000–9999)
    let handlerId: number;
    do {
      handlerId = Math.floor(1000 + Math.random() * 9000);
    } while (existingIds.has(handlerId));

    const names = [
      'ד"ר יעל בר', "אורן כהן", "טליה ממן", "רונית אזולאי", "יונתן פרידמן", "שירה לוין"
    ];
    const roles: Role[] = ["מרצה", "מזכירות"];
    const responsibilities = [
      "בדיקת עבודות", "רישום תלמידים", "תיאום מערכת שעות", "פניות סטודנטים", "ניהול קורסים"
    ];

    const name = pick(names);
    const role = pick(roles);
    const email = `${transliterate(name.replace(/\s+/g, "."))}@uni.ac.il`.toLowerCase();
    const responsibility = pick(responsibilities);

    return new CareHandler(handlerId, name, role, email, responsibility);
  }

  /** Business validation according to requirements */
  validate(): string[] {
    const errors: string[] = [];

    // handlerId must be a finite number, 4 digits (1000–9999)
    if (!Number.isFinite(this.handlerId)) errors.push("מזהה גורם הוא שדה חובה");
    if (Number.isFinite(this.handlerId)) {
      const idStr = String(this.handlerId);
      if (!/^\d{4}$/.test(idStr)) {
        errors.push("מזהה גורם חייב להיות מספר בן 4 ספרות");
      }
    }

    if (!this.name) errors.push("שם הוא שדה חובה");
    if (!this.role || (this.role !== "מרצה" && this.role !== "מזכירות")) {
      errors.push("תפקיד חייב להיות 'מרצה' או 'מזכירות'");
    }

    if (!this.email) errors.push('דוא"ל הוא שדה חובה');
    if (this.email && !isValidEmail(this.email)) {
      errors.push('פורמט דוא"ל אינו תקין');
    }

    if (!this.responsibility) errors.push("תחום אחריות הוא שדה חובה");

    return errors;
  }
}

/* ===== helpers ===== */

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function transliterate(str: string): string {
  const map: Record<string, string> = {
    א:"a", ב:"b", ג:"g", ד:"d", ה:"h", ו:"v", ז:"z", ח:"h", ט:"t",
    י:"y", כ:"k", ך:"k", ל:"l", מ:"m", ם:"m", נ:"n", ן:"n", ס:"s",
    ע:"a", פ:"p", ף:"p", צ:"ts", ץ:"ts", ק:"k", ר:"r", ש:"sh", ת:"t",
    " ":".", "'":"", "\"":"", ".":"", "-":"-",
  };
  return str
    .split("")
    .map(c => map[c] ?? c)
    .join("")
    .replace(/[^a-zA-Z0-9_.-]/g, "");
}
