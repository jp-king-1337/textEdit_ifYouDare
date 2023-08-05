const installBtn = document.getElementById("buttonInstall");

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    deferredPrompt = event;

    installBtn.style.display = "block";
});

// TODO: Implement a click event handler on the `installBtn` element
installBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const result = await deferredPrompt.userChoice;

        if (result.outcome === "accepted") {
            console.log("User accepted PWA installation.");
        } else {
            console.log("User rejected PWA installation.");
        }

        deferredPrompt = null;

        installBtn.style.display = "none";
    }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
    console.log("Successfully installed PWA.");
});
