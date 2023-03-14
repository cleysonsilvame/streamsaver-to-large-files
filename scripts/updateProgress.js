export function updateProgress(loaded, size, startTime) {
  const sizeInMb = size / (1024 * 1024);
  const progressInMb = loaded / (1024 * 1024);
  const timeElapsed = (performance.now() - startTime) / 1000;
  let speed = 0;
  let timeRemaining = 0;
  
  // Espera um pouco no início para evitar velocidade infinita
  if (timeElapsed > 1) {
    speed = progressInMb / timeElapsed;
    timeRemaining = (size - loaded) / (speed * 1024 * 1024 * 60);
  }
  
  const infoString = timeRemaining >= 0
    ? `${speed.toFixed(
        1
      )} MB/s - ${progressInMb.toFixed(0)} MB de ${sizeInMb.toFixed(
        0
      )}MB, ${timeRemaining.toFixed(0)} min restantes`
    : `${progressInMb.toFixed(0)} MB de ${sizeInMb.toFixed(0)}MB`;
    
  $result.innerHTML = infoString;
}
