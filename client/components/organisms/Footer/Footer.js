import React from "react";

export default function FooterComponent() {
  const year = new Date().getFullYear();

  return (
    <div className="footer-copyright">
      <div className="container center-align">
        {`Copyright Ⓒ ${year} CheatA-Key Projects. All Rights Reserved.`}
      </div>
    </div>
  );
}
