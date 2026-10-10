// Restore binary assets (images) that cannot be committed to git directly.
// Binary files travel as base64 text, split into parts to stay within
// commit-size limits: assets/<name>.b64.part-01, .part-02, ...
// At build time they are joined and decoded back into public/images/.
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
  // Group parts by target name: "<img>.b64" or "<img>.b64.part-01" -> "<img>"
  const groups = new Map();
  for (const name of entries) {
    const m = name.match(/^(.+)\.b64(?:\.part-(\d+))?$/);
    if (!m) continue;
    const key = m[1];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ name, part: m[2] ? parseInt(m[2], 10) : 0 });
  }
  await mkdir(outDir, { recursive: true });
  for (const [targetName, parts] of groups) {
    const target = path.join(outDir, targetName);
    let needs = false;
    try {
      const s = await stat(target);
      if (s.size === 0) needs = true;
    } catch {
      needs = true;
    }
    if (!needs) continue;
    parts.sort((a, b) => a.part - b.part);
    let b64 = "";
    for (const p of parts) {
      b64 += await readFile(path.join(assetsDir, p.name), "utf8");
    }
    b64 = b64.replace(/\s+/g, "");
    await writeFile(target, Buffer.from(b64, "base64"));
    console.log(`restore-binaries: ${parts.length} part(s) -> public/images/${targetName}`);
  }
  console.log("restore-binaries: done");
}

main().catch((err) => {
  console.error("restore-binaries failed:", err);
  process.exit(1);
});
