
import { Input } from "@components/components/ui/input"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessPlan = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState(null);
  const [fileDownloaded, setFileDownloaded] = useState(false);

  const incrementProgress = () => {
    setProgress((prevProgress) => {
      if (prevProgress < 100) {
        const newProgress = prevProgress + (100 / 60); // Increment such that it fills in 60 seconds
        return newProgress > 100 ? 100 : newProgress;
      }
      return prevProgress;
    });
  };

  useEffect(() => {
    // If the form is submitting and there is no timer, start one
    if (isSubmitting && !timer) {
      const newTimer = setInterval(incrementProgress, 1000);
      setTimer(newTimer);
    }

    // Cleanup the timer when form is not submitting or unmounted
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isSubmitting, timer]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFileDownloaded(false);

    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);

    try {
      const response = await axios.post('https://businessplan-kts37hcg2q-uc.a.run.app/generate-plan', {
        prompt: formProps
      }, {
        responseType: 'blob',
        onDownloadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
          if (percentCompleted === 100) {
            if (timer) {
              clearInterval(timer); // Stop the timer if the download is complete
            }
            setFileDownloaded(true); // Set the downloaded flag
          }
        }
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'YourBusinessPlan.pdf');
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
    } catch (error) {
      console.error('Error during form submission', error);
    } finally {
      setIsSubmitting(false);
      setProgress(0);
      setTimer(null);
    }
  };

  // Render the progress bar or the file downloaded message
  const renderProgress = () => {
    if (fileDownloaded) {
      return <p className="text-white">File Downloaded, Please check your downloads folder</p>;
    } else if (isSubmitting) {
      return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>{progress}%</div>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <section
      className="w-full p-12 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 shadow-md rounded-md dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 transition-all duration-500 ease-in-out">
      <h2
        className="text-3xl font-bold text-white mb-4 tracking-wide transform hover:scale-110 transition-transform duration-300">
        <span aria-label="rocket" className="animate-bounce" role="img">
          🚀
        </span>{" "}
        Your Futuristic Business Plan Generator{" "}
        <span aria-label="light bulb" className="animate-ping" role="img">
          💡
        </span>
      </h2>
      <div className="w-full h-4 bg-white rounded-lg overflow-hidden mb-6">
        <div className="h-full bg-blue-600 animate-pulse" />
      </div>
      <div className="flex justify-center items-center mb-4">
        <svg
          className=" text-white text-3xl transform hover:rotate-90 transition-transform duration-500 animate-wiggle"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path
            d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" method="POST">
      <Input
          className="w-full py-2 px-3 border border-white rounded-md text-white bg-opacity-20 bg-white transition-all duration-300 hover:bg-opacity-30 focus:border-blue-600 ring-2 ring-transparent focus:ring-blue-600 transition-ring ease-linear duration-500"
          name="startUpName"
          placeholder="Start-Up Name 🏢"
          type="text" />
        <Input
          className="w-full py-2 px-3 border border-white rounded-md text-white bg-opacity-20 bg-white transition-all duration-300 hover:bg-opacity-30 focus:border-blue-600 ring-2 ring-transparent focus:ring-blue-600 transition-ring ease-linear duration-500"
          name="visionStatement"
          placeholder="Vision Statement 🌟"
          type="text" />
        <Input
          className="w-full py-2 px-3 border border-white rounded-md text-white bg-opacity-20 bg-white transition-all duration-300 hover:bg-opacity-30 focus:border-blue-600 ring-2 ring-transparent focus:ring-blue-600 transition-ring ease-linear duration-500"
          name="targetDemographic"
          placeholder="Target Demographic 👥"
          type="text" />
        <Input
          className="w-full py-2 px-3 border border-white rounded-md text-white bg-opacity-20 bg-white transition-all duration-300 hover:bg-opacity-30 focus:border-blue-600 ring-2 ring-transparent focus:ring-blue-600 transition-ring ease-linear duration-500"
          name="milestones"
          placeholder="Milestones 🏁"
          type="text" />
        <div className="flex items-center gap-4">
          {renderProgress()}
          {!isSubmitting && (
            <button
              className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
              type="submit"
            >
              Export Plan
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default BusinessPlan;
