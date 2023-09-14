import { Toaster } from "react-hot-toast";
import { AppContent, AppHeader, PageTitle } from "./components";
import styles from "./styles/modules/app.module.scss";
function App() {
  return (
    <>
      <div className="container">
        <PageTitle>Todo List</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.6rem",
          },
        }}
      />
    </>
  );
}

export default App;
