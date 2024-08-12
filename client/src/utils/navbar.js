import useId from "../hooks/useId";

// pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Settings from "../pages/Settings";
import Report from "../pages/Report/Report";
import Login from "../pages/Login/Login";
import Categories from "../pages/Categories/Categories";
import CategoryItem from "../pages/Categories/CategoryItem/CategoryItem";
import Meals from "../pages/Meals";
import User from "../pages/Settings/User";
import CategoryItemSettings from "../pages/Meals/CategoryItem";
import ItemAdditional from "../pages/Meals/ItemAdditional";

// icons
import DashboardIcon from "../assets/icons/DashboardIcon";
import Pan from "../assets/icons/Pan";
import Cheque from '../assets/icons/Cheque';
import SettingIcon from "../assets/icons/SettingIcon";
import CreateCategoryItem from "../pages/Meals/CategoryItem/index.jsx";
// import AllUsers from "../pages/Settings/AllUsers";
import Add from "../pages/Users/Add";
import AllUsers from "../pages/Users/AllUsers";
import AllUsersIcon from "../assets/icons/AllUsersIcon";
import FoodItems from "../pages/Categories/FoodItem/FoodItem";

const user = JSON.parse(localStorage.getItem('user'));
const state = user?.userRole === 'ADMIN';
console.log(state);
const navbar = [
	{
		id: useId,
		element: <Dashboard />,
		title: "Asosiy",
		path: "/asosiy/sotish-statistikasi",
		icon(isDark) {
			return <DashboardIcon isDark={isDark} />;
		},
		private: true,
		hidden: false,
	},
	{
		id: useId,
		element: <Categories />,
		title: "Taomnoma",
		icon(isDark) {
			return <Pan isDark={isDark} />;
		},
		path: "/taomnoma/kategoriyalar",
		private: true,
		hidden: false,
	},
	{
		id: useId,
		element: <FoodItems />,
		title: "CategoryItem",
		path: "/taomnoma/kategoriyalar/:id",
		private: true,
		hidden: true,
	},
	{
		id: useId,
		element: <Report />,
		title: "Xisobotlar",
		path: "/xisobotlar/buyurtmalar",
		icon(isDark) {
			return <Cheque isDark={isDark} />;
		},
		private: true,
		hidden: false,
		
	},
	{
		id: useId,
		element: <AllUsers />,
		icon(isDark) {
			return <AllUsersIcon isDark={isDark} />;
		},
		title: "Foydalanuvchilar",
		path: "/foydalanuvchilar",
		private: true,
		hidden: false,
		admin:true,
	},
	
	{
		id: useId,
		element: <CreateCategoryItem />,
		title: "Taomnoma ma'lumotlari",
		path: "/sozlamalar/shaxsiy-ma'lumotlar/:id",
		private: true,
		hidden: true,
		
	},
	{
		id: useId,
		element: <Login />,
		title: "Login",
		path: "/Login",
		private: true,
		hidden: true,
	},
	{
		id: useId,
		element: <Add />,
		title: "Foydalanuvchi qo'shish",
		path: "/foydalanuvchilar/:id",
		private: true,
		hidden: true,
		admin:true,

	},
	{
		id: useId,
		element: <Meals />,
		icon(isDark) {
			return <SettingIcon isDark={isDark} />;
		},
		title: "Taom sozlamalari",
		path: "/taom-kategoriyalari",
		private: true,
		admin:true,
		hidden: false,
	},
	{
		id: useId,
		element: <CategoryItemSettings />,
		title: "Kategoriya sozlamalari",
		path: "/taom-kategoriyalari/:id",
		private: true,
		hidden: true,
		admin:true,
	},
	{
		id: useId,
		element:  <ItemAdditional />,
		title: "Qoshimcha taomlar",
		path: "/taom-kategoriyalari/:id/qo'shimcha/:id",
		private: true,
		hidden: true,
		admin:true,
		
	},
	{
		id: useId,
		element: <Settings />,
		title: "Sozlamalar",
		path: "/sozlamalar",
		icon(isDark) {
			return <SettingIcon isDark={isDark} />;
		},
		private: true,
		hidden: false,
		innerRoutes: [
			// state && { path: `foydalanuvchilar/:id`, element: <Add /> },
			// state && { path: `foydalanuvchilar`, element: <AllUsers /> },
			{ path: "shaxsiy-ma'lumotlar", element: <User /> },
			// state && { path: 'taomlar', element: <Meals /> },
			// state && { path: 'taomlar/:id', element: <CategoryItemSettings /> },
			// state && { path: `taomlar/:id/qo'shimcha/:id`, element: <ItemAdditional /> },
		]
	},
];

export default navbar;
