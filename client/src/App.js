import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import navbar from "./utils/navbar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Fragment, useContext, useEffect } from "react";
import AppContext from "./context/AppContext";
import useUniqueId from "./hooks/useId";

function App() {
	const token = localStorage.getItem("token");
	const user = localStorage.getItem("user");


	const ctx = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
		ctx.setAppData({
			user: JSON.parse(user),
			token,
			isAuth: token?.trim().length > 0,
		});
	}, [token]);
	return (
		<>
			<ToastContainer />
			<Routes>
				{navbar.map(({ id=()=>{}, path, element, innerRoutes = null,admin }) => {
					if(admin){
						if(ctx?.user?.userRole === 'ADMIN'){
							return <Route key={id()} path={path} element={element} />
						}else{
							return <Fragment key={id()}></Fragment>
						}
					}else{

						if (innerRoutes) {
							return (
								<Route key={id()} path={path} element={element}>
									<Route path={path} element={<Navigate to="shaxsiy-ma'lumotlar" />} />
									{
										innerRoutes.map(route => {
											return (
												<Route
													key={route.path}
													path={route.path}
													element={route.element}
												/>
											)
											
										}
										)
									}
								</Route>
							)
						} else {
							return <Route key={id} path={path} element={element} />
						}
					}
				}
				)}
				
				<Route path='*' element={<Navigate to={'/asosiy/sotish-statistikasi'} />} />
			</Routes>
		</>
	);
}

export default App;