import React, { useState } from 'react';
import axios from 'axios';

const EmailCannon = () => {
  const [emailOption, setEmailOption] = useState('csv');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [website, setWebsite] = useState('');
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (selectedOption) => {
    setEmailOption(selectedOption);
    if (selectedOption === 'single') {
      setFile(null);
    }
    setError('');
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError('');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'twitterId':
        setTwitterId(value);
        break;
      case 'website':
        setWebsite(value);
        break;
      case 'prompt':
        setPrompt(value);
        break;
      default:
        // unknown field (should not happen)
        break;
    }
  };

  const resetForm = () => {
    setFile(null);
    setName('');
    setEmail('');
    setTwitterId('');
    setWebsite('');
    setPrompt('');
    setError('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (emailOption === 'single' && (!name || !email)) {
      setError('Name and Email are required for single email option.');
      return;
    }

    if (emailOption === 'csv' && !file) {
      setError('Please provide a CSV file for bulk email option.');
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    if (file) {
      formData.append('csv', file);
    }
    formData.append('name', name);
    formData.append('email', email);
    formData.append('twitter_id', twitterId);
    formData.append('personal_website', website);
    formData.append('custom_prompt', prompt);

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const endpoint = emailOption === 'csv' ? 'trigger-email-agent-csv' : 'trigger-email-agent-prompt';

    // After 3 seconds, reset the form and allow the user to submit again
    setTimeout(() => {
      resetForm();
    }, 3000);

    // Simulate sending the form data, no actual API call
    
  try {
    const response = await axios.post(
      `https://emailcannon-y45b5p5jsq-uc.a.run.app/${endpoint}`,
      formData,
      config
    );

    if (response.status === 200) {
      // Reset all fields after successful submission
      setFile(null);
      setName('');
      setEmail('');
      setTwitterId('');
      setWebsite('');
      setPrompt('');
      alert('Submitted, please check your inbox in a few minutes.');
    }
  } catch (errorResponse) {
    console.log(errorResponse);
  }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-10 p-6 shadow-lg rounded-xl overflow-hidden bg-white">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Automated Email Sender</h2>
          <p className="text-gray-600">Choose an option to send your email</p>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleOptionChange('csv')}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${emailOption === 'csv' ? 'bg-blue-500' : 'bg-gray-300'}`}
            disabled={isSubmitting}
          >
            Multiple Emails (CSV)
          </button>
          <button
            type="button"
            onClick={() => handleOptionChange('single')}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md ${emailOption === 'single' ? 'bg-blue-500' : 'bg-gray-300'}`}
            disabled={isSubmitting}
          >
            Single Email
          </button>
        </div>
        {emailOption === 'csv' && (
          <div>
            <label htmlFor="csvFile" className="block mb-2 text-sm font-medium text-gray-700">
              CSV File
            </label>
            <input
              type="file"
              id="csvFile"
              name="csv"
              accept=".csv"
              onChange={handleFileChange}
              disabled={isSubmitting}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0 file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )}
        {emailOption === 'single' && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <input
              type="text"
              name="twitterId"
              placeholder="Twitter ID"
              value={twitterId}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
            <input
              type="url"
              name="website"
              placeholder="Personal Website"
              value={website}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
            />
          </>
        )}
        <textarea
          name="prompt"
          placeholder="Custom Prompt"
          value={prompt}
          onChange={handleInputChange}
          disabled={isSubmitting}
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md focus:border-blue-500 focus:outline-none focus:ring"
        />
        {!isSubmitting ? (
          <button type="submit" className="w-full px-3 py-4 text-white bg-blue-500 rounded-md focus:bg-blue-600 focus:outline-none">
            Submit
          </button>
        ) : (
          <div className="text-center text-lg text-blue-500">
            Submitted, please check your inbox in a few minutes
          </div>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default EmailCannon;
