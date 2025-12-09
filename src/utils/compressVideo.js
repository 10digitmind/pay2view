import { FFmpeg } from "@ffmpeg/ffmpeg";

const ffmpeg = new FFmpeg();

export const compressVideo = async (file) => {
  // Load ffmpeg core
  if (!ffmpeg.loaded) {
    await ffmpeg.load({
      coreURL: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
    });
  }

  const inputName = "input.mp4";
  const outputName = "output.mp4";

  // Write file into FFmpeg FS
  await ffmpeg.writeFile(inputName, await file.arrayBuffer());

  // Run compression command
  await ffmpeg.exec([
    "-i",
    inputName,
    "-vcodec",
    "libx264",
    "-crf",
    "28",
    outputName,
  ]);

  // Read compressed output
  const data = await ffmpeg.readFile(outputName);

  return new Blob([data.buffer], { type: "video/mp4" });
};
