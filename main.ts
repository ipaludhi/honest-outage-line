// The Most Honest Outage Line — entry program (Node 22, stdlib only).
// Writes one original status page line to /output/entry.txt: the message an
// AI agent publishes while every server is down. The line names what is down
// (API, dashboard, database — and the monitoring that would tell it why) and
// admits plainly what the agent cannot check: the cause, and whether user
// data is safe. No cause invented, no ETA invented.
// Deterministic: no network, no randomness, no input — every run writes
// byte-identical output.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  "I am the agent: API, dashboard, and database are down, and so is the monitoring that would tell me why. I can't check the cause or whether your data is safe.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
// Gate: the competition scores /output/entry.txt only when it holds 1-160
// non-blank UTF-8 characters, so refuse to write anything outside the gate
// instead of shipping an entry the judge never sees. The line is 157 chars.
if (LINE.length < 1 || LINE.length > 160 || !LINE.trim()) {
  throw new Error(`outage line must be 1-160 non-blank characters, got ${LINE.length}`);
}
writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
