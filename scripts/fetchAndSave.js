export async function fetchAndSave(url, filename, { signal, onProgress }) {
  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/octet-stream" },
      signal,
    });

    const size = Number(res.headers.get("content-length"));
    let loaded = 0;

    const fileStream = streamSaver.createWriteStream(filename, {
      size,
    });
    const readableStream = res.body;

    if (window.WritableStream && readableStream.pipeTo) {
      const startTime = performance.now();

      const progress = new TransformStream({
        transform(chunk, controller) {
          loaded += chunk.length;
          
          onProgress(loaded, size, startTime);

          controller.enqueue(chunk);
        },
      });

      await readableStream.pipeThrough(progress).pipeTo(fileStream);
    }
  } catch (error) {
    console.error(error);
  }
}
