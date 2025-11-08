// utils/uploadToCloudinary.ts
export const uploadToCloudinary = async (file: File) => {
  const cloudName = "devkpaapb"; // from Cloudinary dashboard
  const uploadPreset = "farmnet"; // from Cloudinary settings

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "Failed to upload image");
  }

  return data.secure_url; // this is the image link to save in your DB
};
