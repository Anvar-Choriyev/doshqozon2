import React from 'react'
import LIGHT from '../images/sidebar-icons/allUserIconLight.svg';
import DARK from '../images/sidebar-icons/allUserIconBlack.svg';
const AllUsersIcon = ({ isDark }) => <img src={isDark ?DARK:LIGHT} alt="" />

export default AllUsersIcon