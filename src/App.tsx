import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CategoryPage, Homepage, NotFound } from "./pages";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route element={<Homepage />} path="/" />
				<Route element={<CategoryPage />} path="/:id" />
				<Route element={<NotFound />} path="*" />
			</Routes>
		</Router>
	);
};

export default App;
