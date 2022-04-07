import { render } from "react-dom";
import { Header } from './header';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Vacancies from "./routes/vacancies";
import Invoices from "./routes/invoices";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
  <Header></Header>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Vacancies" element={<Vacancies />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);