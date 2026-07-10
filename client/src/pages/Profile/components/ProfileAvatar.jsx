import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Upload,
  Loader2,
} from "lucide-react";

import { CLOUDINARY_CONFIG } from "../../../config/cloudinary";

function ProfileAvatar({
  formData,
  setFormData,
}) {
  const inputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const uploadImage = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum file size is 5 MB.");
      return;
    }

    try {
      setUploading(true);
      setProgress(20);

      const data = new FormData();

      data.append("file", file);

      data.append(
        "upload_preset",
        CLOUDINARY_CONFIG.uploadPreset
      );

      const response = await fetch(
        CLOUDINARY_CONFIG.uploadUrl,
        {
          method: "POST",
          body: data,
        }
      );

      setProgress(70);

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error?.message
        );
      }

      setFormData((prev) => ({
        ...prev,
        photoURL: result.secure_url,
      }));

      setProgress(100);

      setTimeout(() => {
        setProgress(0);
      }, 500);
    } catch (error) {
      console.error(error);

      alert(
        "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleImage = (e) => {
    const file =
      e.target.files?.[0];

    uploadImage(file);
  };

  return (
    <div className="mb-12 flex flex-col items-center">

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImage}
      />

      <motion.div
        whileHover={{
          scale: 1.03,
        }}
        transition={{
          duration: 0.25,
        }}
        className="relative"

        onClick={() =>
          inputRef.current.click()
        }
      >

        <div
          className="
            absolute
            -inset-2
            rounded-full
            bg-gradient-to-r
            from-pink-500
            via-fuchsia-500
            to-purple-600
            blur-md
            opacity-40
          "
        />

        <div
          className="
            relative
            flex
            h-48
            w-48
            items-center
            justify-center
            overflow-hidden
            rounded-full
            border-[6px]
            border-white
            bg-gradient-to-br
            from-pink-50
            via-white
            to-purple-50
            shadow-[0_30px_80px_rgba(236,72,153,.25)]
            cursor-pointer
          "
        >          
        {formData.photoURL ? (
            <img
              src={formData.photoURL}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center">

              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-pink-100
                "
              >
                <Upload
                  size={42}
                  className="text-pink-500"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Upload Profile
              </h3>

              <p className="mt-2 px-8 text-center text-sm text-slate-500">
                Click to upload your profile picture
              </p>

            </div>
          )}

          <motion.button
            whileTap={{
              scale: 0.9,
            }}
            type="button"
            className="
              absolute
              bottom-3
              right-3
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-pink-500
              to-purple-600
              text-white
              shadow-xl
            "
          >
            {uploading ? (
              <Loader2
                size={22}
                className="animate-spin"
              />
            ) : (
              <Camera size={22} />
            )}
          </motion.button>

        </div>

      </motion.div>

      {uploading && (

        <div className="mt-8 w-72">

          <div className="h-2 overflow-hidden rounded-full bg-pink-100">

            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-pink-500
                to-purple-600
              "
            />

          </div>

          <p className="mt-3 text-center text-sm font-medium text-pink-600">
            Uploading Image...
          </p>

        </div>

      )}

      <h2
        className="
          mt-8
          text-4xl
          font-black
          text-slate-900
        "
      >
        {formData.fullName || "Your Name"}
      </h2>

      <p
        className="
          mt-3
          max-w-lg
          text-center
          text-slate-500
          leading-7
        "
      >
        Upload a beautiful profile photo to personalize
        your HerCycle AI experience.
      </p>
            <button
        type="button"
        onClick={() =>
          inputRef.current.click()
        }
        className="
          mt-6
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          to-purple-600
          px-8
          py-3.5
          font-semibold
          text-white
          shadow-[0_20px_40px_rgba(236,72,153,.25)]
          transition-all
          duration-300
          hover:scale-105
          hover:shadow-[0_25px_50px_rgba(236,72,153,.35)]
        "
      >
        Change Profile Photo
      </button>

    </div>
  );
}

export default ProfileAvatar;
      
        