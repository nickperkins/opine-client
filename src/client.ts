import React from "react";
import { createRoot } from 'react-dom/client';
import Comments from "./components/layout/Comments";

// if you load the react element in a async script
window.addEventListener("load", function () {
  const container = document.getElementById("react-foo");
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  let commentsElement = React.createElement(Comments);
  root.render(commentsElement);
});
