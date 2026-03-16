import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const navItems = [
	{ to: "/", label: "Top" },
	{ to: "/Entertainment", label: "Entertainment" },
	{ to: "/Technology", label: "Technology" },
	{ to: "/Sports", label: "Sports" },
	{ to: "/Business", label: "Business" },
	{ to: "/Health", label: "Health" },
	{ to: "/Science", label: "Science" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);

	const closeMenu = () => setOpen(false);

	return (
		<header className={styles.navbar}>
			<div className={styles.inner}>
				<NavLink to="/" className={styles.brand} onClick={closeMenu}>
					NewsApp
				</NavLink>

				<button
					className={styles.toggle}
					type="button"
					aria-label="Toggle navigation"
					aria-expanded={open}
					onClick={() => setOpen((prev) => !prev)}
				>
					<span className={styles.bar} />
					<span className={styles.bar} />
					<span className={styles.bar} />
				</button>

				<nav className={`${styles.nav} ${open ? styles.open : ""}`}>
					{navItems.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								isActive
									? `${styles.link} ${styles.active}`
									: styles.link
							}
							onClick={closeMenu}
						>
							{item.label}
						</NavLink>
					))}
				</nav>
			</div>
		</header>
	);
}
