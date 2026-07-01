const desktop=document.getElementById("desktopUI");
const button=document.getElementById("themeButton");

button.onclick=()=>{

desktop.classList.toggle("light");
desktop.classList.toggle("dark");

if(desktop.classList.contains("light")){

button.innerHTML="☀️ Light";

}else{

button.innerHTML="🌙 Dark";

}

};
