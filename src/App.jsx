import { BrowserRouter } from "react-router";
import Navbar from "./components/nav-bar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
