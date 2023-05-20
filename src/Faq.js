import React from 'react';

import FaqButton from './FaqButton';
const Faq = (props) => {
  const data = [
    {
      question: 'How do I trim a YouTube video?',
      answer:
        'You can trim a YouTube video by entering the YouTube URL, start time, and duration in seconds. Click on the "Trim" button to initiate the trimming process. Once the video is trimmed, you can download it from the provided link.',
    },
    {
      question: 'Can I trim videos from sources other than YouTube?',
      answer:
        'No, the web app is specifically designed to trim YouTube videos. It may not work with videos from other sources.',
    },
    {
      question: 'Is there a duration limit for trimming videos?',
      answer:
        'Currently, the web app supports a maximum duration of 60 seconds for trimming videos. However, in the future, it is planned to support longer durations as well. Stay tuned for updates!',
    },
  ];

  return (
    <section class="relative py-20 overflow-hidden bg-gray-50">
      <div class="relative container px-4 mx-auto">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-24">
            <span class="inline-block py-1 px-3 mb-4 text-xs font-semibold text-orange-900 bg-orange-50 rounded-full">
              FREQUENTLY ASK QUESTION
            </span>
            <h1 class="font-heading text-5xl xs:text-6xl md:text-7xl font-bold text-gray-900">
              <span>You ask? We</span>
              <span class="font-serif italic">answer</span>
            </h1>
          </div>
          <div class="pt-18 sm:pt-24 px-8 sm:px-20 pb-18 bg-white rounded-4xl shadow-lg">
            {data.map((item) => {
              return (
                <FaqButton question={item.question} answer={item.answer} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
