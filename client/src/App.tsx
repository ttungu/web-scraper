import IndexPage from "./routes/indexPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient: QueryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<IndexPage />}></Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
