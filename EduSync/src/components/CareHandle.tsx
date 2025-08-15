import React, { useEffect, useMemo, useState } from "react";
import CareHandler,  {type Role}  from "../classCareHandler /CareHandle";
import "../cssRules/Body.css";

const LS_HANDLERS = "care_handlers_v1";

const CareHandlerTable: React.FC = () => {
  const [handlers, setHandlers] = useState<CareHandler[]>([]);

  // load once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_HANDLERS);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setHandlers(arr.map(CareHandler.from));
      }
    } catch (e) {
      console.error("failed to load handlers", e);
    }
  }, []);

  const existingIds = useMemo(() => new Set(handlers.map(h => h.handlerId)), [handlers]);

  const addRandom = () => {
    const h = CareHandler.random(existingIds);
    const errs = h.validate();
    if (errs.length) return alert("שגיאות:\n" + errs.join("\n"));
    setHandlers(prev => [...prev, h]);
  };

  const save = () => {
    try {
      localStorage.setItem(LS_HANDLERS, JSON.stringify(handlers));
      alert("נשמר ל-localStorage");
    } catch {
      alert("שגיאה בשמירה");
    }
  };

  return (
    <>
      <div className="actions">
        <button onClick={addRandom}>הוסף גורם מטפל אקראי</button>
        <button onClick={save}>שמור ל-localStorage</button>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th>handlerId</th>
            <th>name</th>
            <th>role</th>
            <th>email</th>
            <th>responsibility</th>
          </tr>
        </thead>
        <tbody>
          {handlers.map(h => (
            <tr key={h.handlerId}>
              <td>{h.handlerId}</td>
              <td>{h.name}</td>
              <td>{h.role}</td>
              <td>{h.email}</td>
              <td>{h.responsibility}</td>
            </tr>
          ))}
          {handlers.length === 0 && (
            <tr><td colSpan={5}>אין נתונים</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CareHandlerTable;
