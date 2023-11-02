
import { Input } from "@components/components/ui/input"
import { Button } from "@components/components/ui/button"
import React, { useState } from 'react';
import axios from 'axios';

const EmailPrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Collect form data
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    
    setIsSubmitting(true);
    setProgress(25); // Initial progress after submission

    try {
      // Send request to your API
      const response = await axios.post('http://127.0.0.1:5000/generate-plan', {
        prompt: formProps
      }, {
        responseType: 'blob', // Important for receiving the PDF file
        onDownloadProgress: progressEvent => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        }
      });

      // Create a Blob from the PDF Stream
      const file = new Blob(
        [response.data], 
        { type: 'application/pdf' }
      );

      // Create a link element, use it to download the file and remove it
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
    }
  };

  return (
    (<section
      className="w-full p-12 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 shadow-md rounded-md dark:from-gray-800 dark:via-gray-700 dark:to-gray-600 transition-all duration-500 ease-in-out hover:scale-105">
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
          {/* <a download href="#"> */}
            {!isSubmitting ? (
              <Button
                className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900"
                type="submit"
                variant="secondary">
                Export Plan
              </Button>
            ) : (
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progress}%` }}>{progress}%</div>
              </div>
            )}  
          {/* </a> */}
        </div>
      </form>
    </section>)
  );
}

export default EmailPrompt;