function createModal({ title = "", message = "", buttons = [], type = "info" }) {
    return new Promise((resolve) => {
        const modal = document.createElement("div");
        modal.classList.add("modal-container");

        modal.innerHTML = `
            <div class="modal-content ${type}">
                <span class="modal-close">&times;</span>
                <h2 class="modal-title">${title}</h2>
                <p class="modal-message">${message}</p>
                <div class="modal-buttons">
                    ${buttons
                        .map((btn, index) => `<button class="modal-button" data-index="${index}">${btn}</button>`)
                        .join("")}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => modal.classList.add("modal-show"), 10);

        const buttonElements = modal.querySelectorAll(".modal-button");
        buttonElements.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                resolve(Number(index)); 
                closeModal(modal);
            });
        });

        const closeButton = modal.querySelector(".modal-close");
        closeButton.addEventListener("click", () => {
            resolve(null);
            closeModal(modal);
        });

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                resolve(null); 
                closeModal(modal);
            }
        });
    });

    function closeModal(modalElement) {
        modalElement.classList.add("modal-fade-out"); 
        setTimeout(() => {
            modalElement.innerHTML = "";
            modalElement.remove();
        }, 300);
    }
}
function info(title,text=""){
    return createModal({
        title: title,
        message: text,
        buttons: ["OK"],
        type: "info",
    });
}

function Merror(title,text=""){
    return createModal({
        title: title,
        message: text,
        buttons: ["OK"],
        type: "error",
    });
}
function warnig(title,text=""){
    return createModal({
        title: title,
        message: text,
        buttons: ["OK"],
        type: "warning",
    });
}