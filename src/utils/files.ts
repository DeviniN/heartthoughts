export async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(String(event.target?.result ?? ""));
    reader.onerror = () => reject(new Error("Failed to read file as data URL"));
    reader.readAsDataURL(file);
  });
}
