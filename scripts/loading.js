export default function load() {
    document.onreadystatechange = function() {
        if (document.readyState !== "complete") {
            document.querySelector(".loading").style.visibility = "visible";
        } else {
            document.querySelector(".loading").style.display = "none";
            document.querySelector(".whitescreen").classList.add("hidden");
        }
      };
}
