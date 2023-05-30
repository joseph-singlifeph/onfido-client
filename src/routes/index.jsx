import Home from "../pages";
import DocumentReview from "../pages/document";
import LiveLinessCheck from "../pages/livelinessCheck";

export const paths = [
  {
    name: "Home Onboarding",
    element: <Home />,
    path: "/",
    index: true,
  },
  {
    name: "Select Documents",
    element: <DocumentReview />,
    path: "/documentview",
    index: false,
  },
  {
    name: "Liveliness Check",
    element: <LiveLinessCheck />,
    path: "/onfido",
    index: false,
  },
];
