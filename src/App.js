import React from 'react';
import './style.css';
import { useForm } from 'react-hook-form';

export default function App() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const startPattern =
    /^(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d|\d+:[0-5]\d:[0-5]\d)$/;
  const urlPattern =
    /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setIsProcessing(true);
    fetch(
      ' https://youtube-trimmer.onrender.com/trim?' + new URLSearchParams(data)
    )
      .then((response) => response.blob())
      .then((blob) => {
        console.log('comme');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'trimmed.mp4';
        document.body.appendChild(a);
        a.click();
        setIsProcessing(false);
      });
  };

  return (
    <div class="bg-gray-100">
      <div class="container mx-auto py-10">
        <h1 class="text-4xl text-center font-bold mb-10 custom-primary-color">
          Trim YouTube Video
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          id="trim-form"
          class="max-w-sm mx-auto"
        >
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="url">
              YouTube URL:
            </label>
            <input
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="https://www.youtube.com/watch?v=2WCp0MixCBp"
              id="url"
              name="url"
              {...register('url', {
                required: true,
                pattern: urlPattern,
              })}
            />
            {errors?.url?.type === 'required' && (
              <span class="text-red-500">This field is required</span>
            )}
            {errors?.url?.type === 'pattern' && (
              <span class="text-red-500">Incorrect url</span>
            )}
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="start-time">
              Start Time:
            </label>
            <input
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="00:02:30"
              id="start-time"
              name="start_time"
              {...register('start_time', {
                required: true,
                maxLength: 8,
                pattern: startPattern,
              })}
            />
            {errors?.start_time?.type === 'required' && (
              <span class="text-red-500">This field is required</span>
            )}
            {errors?.start_time?.type === 'pattern' && (
              <span class="text-red-500">
                Please add start time in correct format hh:mm:ss
              </span>
            )}
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="duration">
              Duration (in seconds):
            </label>
            <input
              class="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="12"
              id="duration"
              name="duration"
              {...register('duration', {
                required: true,
                maxLength: 2,
                min: 1,
                max: 60,
              })}
            />
            {errors?.duration?.type === 'required' && (
              <span class="text-red-500">This field is required</span>
            )}
            {errors?.duration?.type === 'min' && (
              <span class="text-red-500">Duration should be more than 0</span>
            )}
            {errors?.duration?.type === 'max' && (
              <span class="text-red-500">
                Duration should be less than 60 seconds
              </span>
            )}
          </div>

          <div class="flex justify-center">
            {!isProcessing && (
              <button
                class="bg-custom-primary-color hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Trim
              </button>
            )}
            {isProcessing && (
              <button
                class="bg-purple-500 cursor-not-allowed opacity-50 text-white-700 font-bold py-2 px-4 rounded inline-flex items-center"
                disabled
              >
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z"
                  ></path>
                </svg>
                <span class="text-white-700">Processing</span>
              </button>
            )}
          </div>
        </form>

        <div id="output" class="text-center mt-10"></div>
      </div>
    </div>
  );
}
