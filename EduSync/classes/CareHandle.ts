import React from "react";
import { useEffect, useMemo, useState } from "react";


export type Role = "מרצה" | "מזכירות";

export default class CareHandler {
  /** מזהה גורם (חובה וייחודי, בפורמט H-XXXX) */
  handlerId: string;
  /** שם (חובה) */
  name: string;
  /** תפקיד (חובה: "מרצה" | "מזכירות") */
  role: Role;
  /** דוא"ל (חובה ותקין) */
  email: string;
  /** תחום אחריות (חובה) */
  responsibility: string;

  constructor(
    handlerId: string,
    name: string,
    role: Role,
    email: string,
    responsibility: string
  ) {
    this.handlerId = handlerId.trim();
    this.name = name.trim();
    this.role = role;
    this.email = email.trim();
    this.responsibility = responsibility.trim();
  }

  /** בנאי־מפעל מאובייקט plain (לקריאה מ־localStorage) */
  static from(obj: unknown): CareHandler {
    const o = obj as Record<string, unknown>;
    return new CareHandler(
      String(o.handlerId ?? ""),
      String(o.name ?? ""),
      (o.role as Role) ?? "מרצה",
      String(o.email ?? ""),
      String(o.responsibility ?? "")
    );
  }

  /** יצירת גורם אקראי (שומר על ייחודיות מול מזהים קיימים אם הועברו) */
  static random(existingIds: Set<string> = new Set()): CareHandler {
    // מזהה גורם H-XXXX
    let handlerId: string;
    do {
      handlerId = `H-${Math.floor(1000 + Math.random() * 9000)}`; // H-1000..H-9999
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

  /** ולידציה עסקית לפי הדרישות */
  validate(): string[] {
    const errors: string[] = [];

    if (!this.handlerId) errors.push("מזהה גורם הוא שדה חובה");
    if (this.handlerId && !/^H-\d{4}$/.test(this.handlerId)) {
      errors.push("מזהה גורם חייב להיות בפורמט H-XXXX (ספרות)");
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
