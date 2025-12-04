import clsx from "clsx";
import CreateWorksheetPage from "./pages/CreateWorksheetPage";

function App() {
  const isActive = true;
  const buttonClasses = clsx("button", {
    active: isActive,
    disabled: !isActive,
  });

  return (
    <>
      <div className={buttonClasses}>Dynamic Button</div>
      <CreateWorksheetPage />
    </>
  );
}

export default App;
