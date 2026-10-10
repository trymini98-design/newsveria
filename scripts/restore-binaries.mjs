// Restore binary assets (images) that cannot be committed to git directly:
// decodes assets/*.b64 back into public/images/ at build time.
import { readdir, readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const assetsDir = path.join(process.cwd(), "assets");
const outDir = path.join(process.cwd(), "public", "images");

async function main() {
  let entries;
  try {
    entries = await readdir(assetsDir);
  } catch {
    console.log("restore-binaries: no assets directory, skipping");
    return;
  }
  await mkdir(outDir, { recursive: true });
  let restored = 0;
  for (const name of entries) {
    if (!name.endsWith(".b64")) continue;
    const targetName = name.slice(0, -4);
    const target = path.join(outDir, targetName);
    let needs = true;
    try {
      const s = await stat(target);
      if (s.size > 0) needs = false;
    } catch { /* missing */ }
    if (needs) {
      const b64 = (await readFile(path.join(assetsDir, name), "utf8")).replace(/\s+/g, "");
      await writeFile(target, Buffer.from(b64, "base64"));
      restored++;
      console.log(`restore-binaries: ${name} -> public/images/${targetName}`);
    }
  }
  console.log(`restore-binaries: done (${restored} restored)`);
}

main().catch((err) => {
  console.error("restore-binaries failed:", err);
  process.exit(1);
});
