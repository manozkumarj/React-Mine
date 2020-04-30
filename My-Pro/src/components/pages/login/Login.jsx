import React, { useEffect } from "react";
import "./login.css";

export default function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>This is login page</div>;
}
