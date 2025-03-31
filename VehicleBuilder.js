document.addEventListener("DOMContentLoaded", () => {

    //This is for the Engine Pop Up
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const confirmPopup = document.getElementById("confirm-popup");
    const engineAddButton = document.getElementById("engine-add");
    // Engine Display 
    const engineNameDisplay = document.getElementById("engine-name-display");
    const enginePriceDisplay = document.getElementById("engine-price-display");
    const engineStoreDisplay = document.getElementById("engine-store-display");

    engineAddButton.addEventListener("click", () => {
        popup.classList.remove("hidden");
    });
    closePopup.addEventListener("click", () => {
        popup.classList.add("hidden");
    });

    confirmPopup.addEventListener("click", () => {
        const engineName = document.getElementById("engine-name").value;
        const enginePrice = document.getElementById("engine-price").value;
        const storeName = document.getElementById("store-name").value;
    // Update display values
        engineNameDisplay.textContent = engineName || "N/A";
        enginePriceDisplay.textContent = enginePrice ? `$${enginePrice}` : "N/A";
        engineStoreDisplay.textContent = storeName || "N/A";

        // Hide popup
        popup.classList.add("hidden");
    });

    //This is for the Transmission Pop Up (below)

     const transmissionPopup = document.getElementById("transmission-popup");
     const closeTransmissionPopup = document.getElementById("close-transmission-popup");
     const confirmTransmissionPopup = document.getElementById("confirm-transmission-popup");
     const transmissionAddButton = document.getElementById("transmission-add");
 
     // Transmission Display
     const transmissionNameDisplay = document.getElementById("transmission-name-display");
     const transmissionPriceDisplay = document.getElementById("transmission-price-display");
     const transmissionStoreDisplay = document.getElementById("transmission-store-display");
 
     transmissionAddButton.addEventListener("click", () => {
         transmissionPopup.classList.remove("hidden");
     });
     closeTransmissionPopup.addEventListener("click", () => {
         transmissionPopup.classList.add("hidden");
     });
 
     confirmTransmissionPopup.addEventListener("click", () => {
         const transmissionName = document.getElementById("transmission-name").value;
         const transmissionPrice = document.getElementById("transmission-price").value;
         const transmissionStore = document.getElementById("transmission-store").value;
 
         // Update display values
         transmissionNameDisplay.textContent = transmissionName || "N/A";
         transmissionPriceDisplay.textContent = transmissionPrice ? `$${transmissionPrice}` : "N/A";
         transmissionStoreDisplay.textContent = transmissionStore || "N/A";
 
         // Hide popup
         transmissionPopup.classList.add("hidden");
     });

    
    //This is for the Clutch Pop Up (below)

    const clutchPopup = document.getElementById("clutch-popup");
    const closeClutchPopup = document.getElementById("close-clutch-popup");
    const confirmClutchPopup = document.getElementById("confirm-clutch-popup");
    const clutchAddButton = document.getElementById("clutch-add");

    // Clutch Display
    const clutchNameDisplay = document.getElementById("clutch-name-display");
    const clutchPriceDisplay = document.getElementById("clutch-price-display");
    const clutchStoreDisplay = document.getElementById("clutch-store-display");

    clutchAddButton.addEventListener("click", () => {
        clutchPopup.classList.remove("hidden");
    });
    closeClutchPopup.addEventListener("click", () => {
        clutchPopup.classList.add("hidden");
    });

    confirmClutchPopup.addEventListener("click", () => {
        const clutchName = document.getElementById("clutch-name").value;
        const clutchPrice = document.getElementById("clutch-price").value;
        const clutchStore = document.getElementById("clutch-store").value;

        // Update display values
        clutchNameDisplay.textContent = clutchName || "N/A";
        clutchPriceDisplay.textContent = clutchPrice ? `$${clutchPrice}` : "N/A";
        clutchStoreDisplay.textContent = clutchStore || "N/A";

        // Hide popup
        clutchPopup.classList.add("hidden");
    });

    //This is for the Tires/Wheels Pop Up (below)

    const tiresPopup = document.getElementById("tires-popup");
    const closeTiresPopup = document.getElementById("close-tires-popup");
    const confirmTiresPopup = document.getElementById("confirm-tires-popup");
    const tiresAddButton = document.getElementById("tires-add");

    // Tires/Wheels Display
    const tiresNameDisplay = document.getElementById("tires-name-display");
    const tiresPriceDisplay = document.getElementById("tires-price-display");
    const tiresStoreDisplay = document.getElementById("tires-store-display");

    tiresAddButton.addEventListener("click", () => {
        tiresPopup.classList.remove("hidden");
    });
    closeTiresPopup.addEventListener("click", () => {
        tiresPopup.classList.add("hidden");
    });

    confirmTiresPopup.addEventListener("click", () => {
        const tiresName = document.getElementById("tires-name").value;
        const tiresPrice = document.getElementById("tires-price").value;
        const tiresStore = document.getElementById("tires-store").value;

        // Update display values
        tiresNameDisplay.textContent = tiresName || "N/A";
        tiresPriceDisplay.textContent = tiresPrice ? `$${tiresPrice}` : "N/A";
        tiresStoreDisplay.textContent = tiresStore || "N/A";

        // Hide popup
        tiresPopup.classList.add("hidden");
    });


    //This is for the Brakes Pop Up (below)

    const brakesPopup = document.getElementById("brakes-popup");
    const closeBrakesPopup = document.getElementById("close-brakes-popup");
    const confirmBrakesPopup = document.getElementById("confirm-brakes-popup");
    const brakesAddButton = document.getElementById("brakes-add");

    // Brakes Display
    const brakesNameDisplay = document.getElementById("brakes-name-display");
    const brakesPriceDisplay = document.getElementById("brakes-price-display");
    const brakesStoreDisplay = document.getElementById("brakes-store-display");

    brakesAddButton.addEventListener("click", () => {
        brakesPopup.classList.remove("hidden");
    });
    closeBrakesPopup.addEventListener("click", () => {
        brakesPopup.classList.add("hidden");
    });

    confirmBrakesPopup.addEventListener("click", () => {
        const brakesName = document.getElementById("brakes-name").value;
        const brakesPrice = document.getElementById("brakes-price").value;
        const brakesStore = document.getElementById("brakes-store").value;

        // Update display values
        brakesNameDisplay.textContent = brakesName || "N/A";
        brakesPriceDisplay.textContent = brakesPrice ? `$${brakesPrice}` : "N/A";
        brakesStoreDisplay.textContent = brakesStore || "N/A";

        // Hide popup
        brakesPopup.classList.add("hidden");
    });

     //This is for the Muffler Pop Up (below)

    const mufflerPopup = document.getElementById("muffler-popup");
    const closeMufflerPopup = document.getElementById("close-muffler-popup");
    const confirmMufflerPopup = document.getElementById("confirm-muffler-popup");
    const mufflerAddButton = document.getElementById("muffler-add");

    // Muffler Display
    const mufflerNameDisplay = document.getElementById("muffler-name-display");
    const mufflerPriceDisplay = document.getElementById("muffler-price-display");
    const mufflerStoreDisplay = document.getElementById("muffler-store-display");

    mufflerAddButton.addEventListener("click", () => {
        mufflerPopup.classList.remove("hidden");
    });

    closeMufflerPopup.addEventListener("click", () => {
        mufflerPopup.classList.add("hidden");
    });

    confirmMufflerPopup.addEventListener("click", () => {
        const mufflerName = document.getElementById("muffler-name").value;
        const mufflerPrice = document.getElementById("muffler-price").value;
        const mufflerStore = document.getElementById("muffler-store").value;

        // Update display values
        mufflerNameDisplay.textContent = mufflerName || "N/A";
        mufflerPriceDisplay.textContent = mufflerPrice ? `$${mufflerPrice}` : "N/A";
        mufflerStoreDisplay.textContent = mufflerStore || "N/A";

        // Hide popup
        mufflerPopup.classList.add("hidden");
    });
 });

