
const themeButton = document.getElementById("themeButton");
var darkTheme = localStorage.getItem('theme');

// update theme before load to storage if saved
if(darkTheme!=null)
	jtd.setTheme(darkTheme);

// On load setup theme button
addEventListener("load", (event) => { 
	themeButton.textContent = `${darkTheme=="dark" ? "☀️" : "🌙"}`;
});
	
// On theme button switch theme
themeButton.addEventListener("click", (event) => {
	darkTheme = darkTheme=="dark" ? "light" : "dark";
	localStorage.setItem('theme', darkTheme);
	jtd.setTheme(darkTheme);
	themeButton.textContent = `${darkTheme=="dark" ? "☀️" : "🌙"}`;
});