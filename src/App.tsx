import "./App.css";
import ruRU from "antd/lib/locale/ru_RU";
import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Layout } from "./components/Layout/Layout";
import { EditableTable } from "./components/Tables/EditableTable/EditableTable";
const Placeholder = ({ title }: { title: string }) => (
  <div style={{ padding: 24 }}>{title}</div>
);
function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="editable" element={<EditableTable />} />
          <Route
            path="quality"
            element={<Placeholder title="Качество запасов" />}
          />
          <Route
            path="projects"
            element={<Placeholder title="Данные по проектам" />}
          />
          <Route path="scenarios" element={<Placeholder title="Сценарии" />} />
          <Route
            path="compare"
            element={<Placeholder title="Сравнение сценариев" />}
          />
          <Route
            path="admin"
            element={<Placeholder title="Администрирование" />}
          />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
