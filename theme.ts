export function getTheme() {
const saved = localStorage.getItem("theme");
return saved === "dark";
}

export function setTheme(isDark: boolean) {
localStorage.setItem("theme", isDark ? "dark" : "light");

if (isDark) {
document.documentElement.classList.add("dark");
} else {
document.documentElement.classList.remove("dark");
}
}

export function initTheme() {
const saved = localStorage.getItem("theme");

if (saved === "dark") {
document.documentElement.classList.add("dark");
}
}
