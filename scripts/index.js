import { fetchAndSave } from "./fetchAndSave.js";
import { updateProgress } from "./updateProgress.js";

let abortController;

$start.addEventListener("click", () => {
  abortController = new AbortController();

  const url = $urlInput.value;
  const filename = $filename.value;

  fetchAndSave(url, filename, {
    signal: abortController.signal,
    onProgress: updateProgress
  });
});

$cancel.addEventListener("click", () => {
  abortController.abort();
});
