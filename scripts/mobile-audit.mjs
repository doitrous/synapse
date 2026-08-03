const websocketUrl = process.argv[2];

if (!websocketUrl) {
  throw new Error("Pass the Chrome DevTools websocket URL as the first argument.");
}

const routes = [
  "/app",
  "/app/library",
  "/app/qbank",
  "/app/practical",
  "/app/resources",
  "/app/calendar",
  "/app/performance",
  "/app/whiteboard",
  "/app/notebook",
  "/app/study-together",
  "/app/billing",
  "/app/account",
  "/admin",
  "/admin/academic",
  "/admin/library",
  "/admin/questions",
  "/admin/practical",
  "/admin/resources",
  "/admin/reports",
  "/admin/notifications",
  "/admin/vouchers",
  "/admin/import/question",
  "/admin/import/article",
  "/admin/import/practical",
  "/admin/import/resource",
  "/admin/email",
  "/admin/payments",
  "/admin/privacy",
  "/admin/settings",
  "/admin/audit",
];

const devices = [
  { name: "iPhone", width: 390, height: 844, scale: 3 },
  { name: "Samsung", width: 412, height: 915, scale: 2.625 },
];

const socket = new WebSocket(websocketUrl);
let nextId = 0;
const pending = new Map();

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const resolve = pending.get(message.id);
  if (resolve) {
    pending.delete(message.id);
    resolve(message);
  }
});

function call(method, params = {}) {
  return new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params }));
  });
}

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

socket.addEventListener("open", async () => {
  for (const device of devices) {
    await call("Emulation.setDeviceMetricsOverride", {
      width: device.width,
      height: device.height,
      deviceScaleFactor: device.scale,
      mobile: true,
    });

    for (const route of routes) {
      await call("Page.navigate", { url: `http://127.0.0.1:5175${route}` });
      await wait(300);

      const response = await call("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const viewportWidth = document.documentElement.clientWidth;
          const scrollWidth = Math.max(
            document.documentElement.scrollWidth,
            document.body.scrollWidth,
          );
          const offenders = [...document.querySelectorAll("body *")]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              return {
                tag: element.tagName.toLowerCase(),
                className:
                  typeof element.className === "string"
                    ? element.className.slice(0, 100)
                    : "",
                text: (element.innerText || "")
                  .trim()
                  .replace(/\\s+/g, " ")
                  .slice(0, 60),
                left: Math.round(rect.left),
                right: Math.round(rect.right),
              };
            })
            .filter(
              (item) =>
                item.right > viewportWidth + 2 || item.left < -2,
            )
            .sort(
              (a, b) =>
                Math.max(b.right - viewportWidth, -b.left) -
                Math.max(a.right - viewportWidth, -a.left),
            )
            .slice(0, 4);

          return {
            viewportWidth,
            scrollWidth,
            overflow: scrollWidth > viewportWidth + 2,
            offenders,
          };
        })()`,
      });

      const result = response.result.result.value;
      if (result.overflow || result.offenders.length > 0) {
        const offenders = result.offenders
          .map(
            (item) =>
              `${item.tag}.${item.className
                .split(" ")
                .slice(0, 3)
                .join(".")}[${item.left},${item.right}] ${item.text}`,
          )
          .join(" || ");
        console.log(
          `${device.name}\t${route}\tvw=${result.viewportWidth}\tsw=${result.scrollWidth}\t${offenders}`,
        );
      }
    }
  }

  socket.close();
});
