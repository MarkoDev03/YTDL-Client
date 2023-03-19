export const formatVideoDuration = (length: number): string => {

  const isHour = length > 3600;

  const minutes = (length / 60).toFixed(0);
  const seconds = (length % 60).toFixed(0).padStart(2, "0");

  if (isHour) {
    const minutesFormated = Number(((length / 60) % 60).toFixed(0));
    const hours = (((length - (minutesFormated * 60)) / 60) / 60).toFixed(0).padStart(2, "0");

    return `${hours}:${minutesFormated.toString().padStart(2, "0")}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}