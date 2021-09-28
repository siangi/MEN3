

import { serve } from "https://deno.land/std/http/server.ts";
import { Status } from "https://deno.land/std/http/http_status.ts";
import { Chapter } from "./chapter.js";

const s = serve({ port: 8080 });

console.log("http://localhost:8080/chapters") // to read
;

for await (const req of s) {
  let myheaders = new Headers();
  myheaders.set("Access-Control-Allow-Origin", "*");
  myheaders.set("Acces-Control-Allow-Methods", "GET");

  if (req.method === "GET" && req.url.split("?", 1)[0] === "/chapters") {
    const chapters = Deno.readTextFileSync("./chapters.json")

    req.respond({ headers: myheaders, status: Status.OK, body: chapters });
  } else {
    req.respond({
      status: Status.NotFound,
      body: JSON.stringify({ message: "Request Not Found" }),
    });
  }
}
