/* =========================================================
   SERVER STATUS
========================================================= */

async function updateServerStatus() {

  const ip =
    document
      .getElementById(
        "serverIp"
      )
      .textContent
      .trim();


  const statusEl =
    document.getElementById(
      "statusText"
    );


  try {

    const res =
      await fetch(

        `https://api.mcsrvstat.us/3/${ip}`,

        {
          cache:
            "no-store"
        }

      );


    if (!res.ok) {

      throw new Error(
        "HTTP " +
        res.status
      );

    }


    const data =
      await res.json();


    /* =====================================================
       ONLINE
    ====================================================== */

    if (data.online) {

      const online =
        data.players?.online ??
        0;


      const max =
        data.players?.max ??
        "?";


      statusEl.textContent =
        `${ip} · ${online} / ${max} 玩家`;


      statusEl.classList.add(
        "online"
      );


      statusEl.classList.remove(
        "offline"
      );


      return;

    }


    /* =====================================================
       OFFLINE
    ====================================================== */

    statusEl.textContent =
      `${ip} · 伺服器離線`;


    statusEl.classList.remove(
      "online"
    );


    statusEl.classList.add(
      "offline"
    );


  } catch (error) {

    console.error(
      "Server status error:",
      error
    );


    statusEl.textContent =
      `${ip} · 無法取得狀態`;


    statusEl.classList.remove(
      "online",
      "offline"
    );

  }

}


/* =========================================================
   INITIAL CHECK
========================================================= */

updateServerStatus();


/* =========================================================
   UPDATE EVERY 60 SECONDS
========================================================= */

setInterval(
  updateServerStatus,
  60000
);