/* =========================================================
   OPEN PANEL
========================================================= */

function openPanel(id) {

  const panel =
    document.getElementById(
      id
    );


  if (!panel) {

    console.error(
      `找不到 Panel: ${id}`
    );

    return;

  }


  panel.classList.add(
    "open"
  );

}


/* =========================================================
   CLOSE PANEL
========================================================= */

function closePanel(id) {

  const panel =
    document.getElementById(
      id
    );


  if (!panel) {

    console.error(
      `找不到 Panel: ${id}`
    );

    return;

  }


  panel.classList.remove(
    "open"
  );

}


/* =========================================================
   CLICK BACKGROUND TO CLOSE
========================================================= */

document
  .querySelectorAll(
    ".overlay"
  )
  .forEach(
    overlay => {

      overlay.addEventListener(
        "click",
        event => {

          if (
            event.target ===
            overlay
          ) {

            overlay.classList.remove(
              "open"
            );

          }

        }
      );

    }
  );


/* =========================================================
   ESC TO CLOSE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key ===
      "Escape"
    ) {

      document
        .querySelectorAll(
          ".overlay.open"
        )
        .forEach(
          panel => {

            panel.classList.remove(
              "open"
            );

          }
        );

    }

  }
);


/* =========================================================
   COPY IP
========================================================= */

async function copyIp(
  button
) {

  const ip =
    document
      .getElementById(
        "serverIp"
      )
      .textContent
      .trim();


  try {

    await navigator
      .clipboard
      .writeText(
        ip
      );


    const original =
      button.textContent;


    button.textContent =
      "已複製！";


    setTimeout(
      () => {

        button.textContent =
          original;

      },
      1500
    );


  } catch (error) {

    console.error(
      "複製失敗:",
      error
    );

  }

}