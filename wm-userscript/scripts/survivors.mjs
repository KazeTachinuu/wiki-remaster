// The mutants the unit tests let through, per file, from the last `bun run mutate` (or a single
// file's run): line, what was changed, into what. `bun scripts/survivors.mjs [file filter]`
const report = await Bun.file(new URL("../reports/mutation/mutation.json", import.meta.url)).json();
const only = process.argv[2] ?? "";
for (const [file, { source, mutants }] of Object.entries(report.files)) {
  if (!file.includes(only)) continue;
  const lines = source.split("\n");
  const left = mutants.filter((m) => m.status === "Survived" || m.status === "NoCoverage");
  if (!left.length) continue;
  console.log(`\n== ${file}: ${left.length} survived`);
  for (const m of left) {
    const l = m.location.start.line;
    console.log(`${l}: [${m.mutatorName}] ${lines[l - 1].trim().slice(0, 110)}\n      -> ${String(m.replacement ?? "").replace(/\s+/g, " ").slice(0, 110)}`);
  }
}
