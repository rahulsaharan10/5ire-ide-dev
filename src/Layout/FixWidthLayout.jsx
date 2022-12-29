import React from "react";
import { Outlet } from "react-router-dom";

function FixWidthLayout() {
  return (
      <div style={{height: '100vh', backgroundColor: '#EEF3F9'}}>
        <Outlet/>
      </div>
  );
}

export default FixWidthLayout;
