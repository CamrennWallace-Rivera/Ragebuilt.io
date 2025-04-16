document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById("popup");
    const closePopup = document.getElementById("close-popup");
    const confirmPopup = document.getElementById("confirm-popup");
    const engineAddButton = document.getElementById("engine-add");
  
    const engineNameDisplay = document.getElementById("engine-name-display");
    const enginePriceDisplay = document.getElementById("engine-price-display");
    const engineStoreDisplay = document.getElementById("engine-store-display");
  
    const priceInput = document.getElementById("engine-price");
    const priceError = document.getElementById("price-error");
  
    engineAddButton.addEventListener("click", () => {
      popup.classList.remove("hidden");
    });
    closePopup.addEventListener("click", () => {
      popup.classList.add("hidden");
      priceError.classList.add("hidden"); 
    });
  
    confirmPopup.addEventListener("click", () => {
        const enginePriceRaw = priceInput.value.trim();
      
        if (enginePriceRaw === "" || isNaN(enginePriceRaw) || Number(enginePriceRaw) < 0) {
          priceError.classList.remove("hidden");
          return;
        }
      
        priceError.classList.add("hidden");
      
        engineNameDisplay.textContent = document.getElementById("engine-name").value || "N/A";
        enginePriceDisplay.textContent = `$${parseFloat(enginePriceRaw).toFixed(2)}`;
        engineStoreDisplay.textContent = document.getElementById("store-name").value || "N/A";
      
        popup.classList.add("hidden");
      });
      
      priceInput.addEventListener("input", () => {
        priceError.classList.add("hidden");
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

    const transmissionPriceInput = document.getElementById("transmission-price");
    const transmissionPriceError = document.getElementById("transmission-price-error");

    transmissionAddButton.addEventListener("click", () => {
        transmissionPopup.classList.remove("hidden");
    });

    closeTransmissionPopup.addEventListener("click", () => {
        transmissionPopup.classList.add("hidden");
        transmissionPriceError.classList.add("hidden"); 
    });

    confirmTransmissionPopup.addEventListener("click", () => {
        const transmissionPriceRaw = transmissionPriceInput.value.trim();

        // Validation for price
        if (transmissionPriceRaw === "" || isNaN(transmissionPriceRaw) || Number(transmissionPriceRaw) < 0) {
            transmissionPriceError.classList.remove("hidden");
            return;
        }

        transmissionPriceError.classList.add("hidden");

        const transmissionName = document.getElementById("transmission-name").value || "N/A";
        const transmissionStore = document.getElementById("transmission-store").value || "N/A";

        // Update display values
        transmissionNameDisplay.textContent = transmissionName;
        transmissionPriceDisplay.textContent = `$${parseFloat(transmissionPriceRaw).toFixed(2)}`;
        transmissionStoreDisplay.textContent = transmissionStore;

        // Hide popup
        transmissionPopup.classList.add("hidden");
    });

    transmissionPriceInput.addEventListener("input", () => {
        transmissionPriceError.classList.add("hidden");
    });
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

    const clutchPriceInput = document.getElementById("clutch-price");
    const clutchPriceError = document.getElementById("clutch-price-error");

    clutchAddButton.addEventListener("click", () => {
        clutchPopup.classList.remove("hidden");
    });

    closeClutchPopup.addEventListener("click", () => {
        clutchPopup.classList.add("hidden");
        clutchPriceError.classList.add("hidden"); 
    });

    confirmClutchPopup.addEventListener("click", () => {
        const clutchPriceRaw = clutchPriceInput.value.trim();

        // Validation for price
        if (clutchPriceRaw === "" || isNaN(clutchPriceRaw) || Number(clutchPriceRaw) < 0) {
            clutchPriceError.classList.remove("hidden");
            return;
        }

        clutchPriceError.classList.add("hidden");

        const clutchName = document.getElementById("clutch-name").value || "N/A";
        const clutchStore = document.getElementById("clutch-store").value || "N/A";

        // Update display values
        clutchNameDisplay.textContent = clutchName;
        clutchPriceDisplay.textContent = `$${parseFloat(clutchPriceRaw).toFixed(2)}`;
        clutchStoreDisplay.textContent = clutchStore;

        // Hide popup
        clutchPopup.classList.add("hidden");
    });

    clutchPriceInput.addEventListener("input", () => {
        clutchPriceError.classList.add("hidden");
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

    const tiresPriceInput = document.getElementById("tires-price");
    const tiresPriceError = document.getElementById("tires-price-error");

    tiresAddButton.addEventListener("click", () => {
        tiresPopup.classList.remove("hidden");
    });

    closeTiresPopup.addEventListener("click", () => {
        tiresPopup.classList.add("hidden");
        tiresPriceError.classList.add("hidden"); 
    });

    confirmTiresPopup.addEventListener("click", () => {
        const tiresPriceRaw = tiresPriceInput.value.trim();

        // Validation for price
        if (tiresPriceRaw === "" || isNaN(tiresPriceRaw) || Number(tiresPriceRaw) < 0) {
            tiresPriceError.classList.remove("hidden");
            return;
        }

        tiresPriceError.classList.add("hidden");

        const tiresName = document.getElementById("tires-name").value || "N/A";
        const tiresStore = document.getElementById("tires-store").value || "N/A";

        // Update display values
        tiresNameDisplay.textContent = tiresName;
        tiresPriceDisplay.textContent = `$${parseFloat(tiresPriceRaw).toFixed(2)}`;
        tiresStoreDisplay.textContent = tiresStore;

        // Hide popup
        tiresPopup.classList.add("hidden");
    });

    tiresPriceInput.addEventListener("input", () => {
        tiresPriceError.classList.add("hidden");
    });



    // This is for the Brakes Pop Up (below)

    const brakesPopup = document.getElementById("brakes-popup");
    const closeBrakesPopup = document.getElementById("close-brakes-popup");
    const confirmBrakesPopup = document.getElementById("confirm-brakes-popup");
    const brakesAddButton = document.getElementById("brakes-add");

    // Brakes Display
    const brakesNameDisplay = document.getElementById("brakes-name-display");
    const brakesPriceDisplay = document.getElementById("brakes-price-display");
    const brakesStoreDisplay = document.getElementById("brakes-store-display");

    const brakesPriceInput = document.getElementById("brakes-price");
    const brakesPriceError = document.getElementById("brakes-price-error");

    brakesAddButton.addEventListener("click", () => {
        brakesPopup.classList.remove("hidden");
    });

    closeBrakesPopup.addEventListener("click", () => {
        brakesPopup.classList.add("hidden");
        brakesPriceError.classList.add("hidden"); 
    });

    confirmBrakesPopup.addEventListener("click", () => {
        const brakesPriceRaw = brakesPriceInput.value.trim();

        // Validation for price
        if (brakesPriceRaw === "" || isNaN(brakesPriceRaw) || Number(brakesPriceRaw) < 0) {
            brakesPriceError.classList.remove("hidden");
            return;
        }

        brakesPriceError.classList.add("hidden");

        const brakesName = document.getElementById("brakes-name").value || "N/A";
        const brakesStore = document.getElementById("brakes-store").value || "N/A";

        // Update display values
        brakesNameDisplay.textContent = brakesName;
        brakesPriceDisplay.textContent = `$${parseFloat(brakesPriceRaw).toFixed(2)}`;
        brakesStoreDisplay.textContent = brakesStore;

        // Hide popup
        brakesPopup.classList.add("hidden");
    });

    brakesPriceInput.addEventListener("input", () => {
        brakesPriceError.classList.add("hidden");
    });


     // This is for the Muffler Pop Up (updated with Tires logic)

    const mufflerPopup = document.getElementById("muffler-popup");
    const closeMufflerPopup = document.getElementById("close-muffler-popup");
    const confirmMufflerPopup = document.getElementById("confirm-muffler-popup");
    const mufflerAddButton = document.getElementById("muffler-add");

    // Muffler Display Elements
    const mufflerNameDisplay = document.getElementById("muffler-name-display");
    const mufflerPriceDisplay = document.getElementById("muffler-price-display");
    const mufflerStoreDisplay = document.getElementById("muffler-store-display");

    const mufflerPriceInput = document.getElementById("muffler-price");
    const mufflerPriceError = document.getElementById("muffler-price-error");

    mufflerAddButton.addEventListener("click", () => {
        mufflerPopup.classList.remove("hidden");
    });

    closeMufflerPopup.addEventListener("click", () => {
        mufflerPopup.classList.add("hidden");
        mufflerPriceError.classList.add("hidden"); // Reset error
    });

    confirmMufflerPopup.addEventListener("click", () => {
        const mufflerPriceRaw = mufflerPriceInput.value.trim();

        // Validation for price
        if (mufflerPriceRaw === "" || isNaN(mufflerPriceRaw) || Number(mufflerPriceRaw) < 0) {
            mufflerPriceError.classList.remove("hidden");
            return;
        }

        mufflerPriceError.classList.add("hidden");

        const mufflerName = document.getElementById("muffler-name").value || "N/A";
        const mufflerStore = document.getElementById("muffler-store").value || "N/A";

        // Update display values
        mufflerNameDisplay.textContent = mufflerName;
        mufflerPriceDisplay.textContent = `$${parseFloat(mufflerPriceRaw).toFixed(2)}`;
        mufflerStoreDisplay.textContent = mufflerStore;

        // Hide popup
        mufflerPopup.classList.add("hidden");
    });

    mufflerPriceInput.addEventListener("input", () => {
        mufflerPriceError.classList.add("hidden");
    
});
