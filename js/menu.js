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

/* Random splash */

const splashTexts = [
  "我去，炸木機又忘記關了",
  "/give @a minecraft:command_block",
  "/give @a deltaforce:heart_of_africa",
  "/give @a deltaforce:tear_of_ocean",
  "服主退游三角洲後決定回MC種田",
  "誰說自由的，看看服規謝謝",
  "677676767677676767",
  "six seven!",
  "中繼器接紅石粉...放一個tnt在這...Boom!",
  "六七",
  "陸柒",
  "他能工作就不要動他，這句話在紅石上是一樣的"
];

function randomSplash() {
  const splash = document.getElementById("splash");

  if (!splash) return;

  const randomIndex = Math.floor(Math.random() * splashTexts.length);
  splash.textContent = splashTexts[randomIndex];
}

randomSplash();


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