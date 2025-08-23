import React from "react";
import { useNavigate } from "react-router-dom";

function Body() {
  const navigate = useNavigate();

  return (
    <div className="body">
      <div className="rule">
        <div className="msButtonMenuFont">
          <div className="ButtonMenuLinkCircle" onClick={() => navigate("/student")}>
            <div className="ButtonMenuFont">סטודנטים</div>
          </div>
        </div>
        <div className="msButtonMenuFont">
          <div className="ButtonMenuLinkCircle" onClick={() => navigate("/request")}>
            <div className="ButtonMenuFont">בקשות</div>
          </div>
        </div>
        <div className="msButtonMenuFont">
          <div className="ButtonMenuLinkCircle" onClick={() => navigate("/appointment")}>
            <div className="ButtonMenuFont">פגישות</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
