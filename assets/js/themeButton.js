
const themeButton = document.getElementById("themeButton");
var darkTheme = localStorage.getItem('theme');

// On load setup theme button
addEventListener("load", (event) => { 

	// update theme on load to storage if saved
	if(darkTheme!=null)
		jtd.setTheme(darkTheme);
	
	themeButton.textContent = `${darkTheme=="dark_plus" ? "☀️" : "🌙"}`;
});
	
// On theme button switch theme
themeButton.addEventListener("click", (event) => {
	darkTheme = darkTheme=="dark_plus" ? "light_plus" : "dark_plus";
	localStorage.setItem('theme', darkTheme);
	jtd.setTheme(darkTheme);
	themeButton.textContent = `${darkTheme=="dark_plus" ? "☀️" : "🌙"}`;
});