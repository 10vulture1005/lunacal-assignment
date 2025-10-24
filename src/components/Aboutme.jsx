import { useState } from "react";

const AboutMe = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About Me" },
    { id: "experiences", label: "Experiences" },
    { id: "recommended", label: "Recommended" },
  ];

  const content = {
    about: `Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.

I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters- Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a...`,
    experiences: `With over 3 years at Salesforce, I've helped hundreds of companies transform their sales operations. My expertise includes CRM implementation, sales automation, and team training.

I previously worked at Oracle for 5 years where I led enterprise sales initiatives. I'm passionate about helping businesses grow through technology.`,
    recommended: `I highly recommend exploring our new AI features for sales forecasting. They've helped my clients increase accuracy by 40%.

Also check out our mobile app updates - the offline mode has been a game changer for field sales teams.`,
  };

  return (
<div className="w-full max-w-[750px] px-4 sm:px-0">
      {/* Main Widget */}
      <div className="bg-[#363C43] rounded-[18.89px] shadow-[5.67px_5.67px_3.78px_0px_#00000066] mb-4">
        {/* Help Icon */}
        <div className="flex items-start pt-[13px] pl-[17px] pb-[20px] sm:pt-[13px] sm:pl-[17px] sm:pb-[20px]">
          <div className="w-[32px] h-[32px] sm:w-[24px] sm:h-[24px] rounded-full bg-[#4A4E54] flex items-center justify-center shadow-inner cursor-pointer hover:bg-[#5A5E64] transition-colors">
            <span className="text-[#B8BFC4] text-[18px] sm:text-[16px] font-bold leading-none">
              ?
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-[10px] pb-[14px]">
          <div className="bg-[#171717] rounded-[16px] sm:rounded-[23px] p-[4px] sm:p-[6px] flex gap-[4px] sm:gap-[6px] shadow-[inset_0px_4.96px_12.4px_2.48px_#00000040]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`tab-button flex-1 px-[12px] sm:px-[20px] md:px-[24px] py-[10px] sm:py-[10px] rounded-[12px] sm:rounded-[16px] text-[14px] sm:text-[16px] md:text-[18px] font-medium relative focus:outline-none ${
                  activeTab === tab.id
                    ? "active text-[#FFFFFF]"
                    : "text-[#A3ADB2] hover:text-[#FFFFFF]"
                }`}
                style={{
                  transition: "color 200ms ease",
                }}
              >
                {/* Label sits above ::after bg so z-index ordering matters in CSS */}
                <span className="relative z-[2] whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="px-[20px] sm:px-[40px] md:px-[52px] pb-[23px] relative overflow-hidden">
          <div className="h-[200px] sm:h-[175px] overflow-y-auto pr-[12px] sm:pr-[20px] scrollbar-custom">
            <div key={activeTab} className="animate-slideIn">
              <p className="text-[#969696] text-[16px] sm:text-[18px] md:text-[20px] leading-[24px] sm:leading-[27px] md:leading-[30.5px] font-normal">
                {content[activeTab]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Tab button base */
        .tab-button {
          position: relative;
          z-index: 0;
          overflow: hidden;
          border: none;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        /* animated background element */
        .tab-button::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0%;
          z-index: 1; /* sits behind the label (label gets z-index 2 in markup) */
          border-radius: 16px;
          background: linear-gradient(
            180deg,
            rgba(40, 41, 47, 1) 0%,
            rgba(40, 41, 47, 0.95) 100%
          );
          transform: translateX(-6px);
          transition: width 300ms cubic-bezier(0.2, 0.9, 0.2, 1),
            transform 300ms cubic-bezier(0.2, 0.9, 0.2, 1);
          box-shadow: 13.49px 16.62px 30.21px 8.69px rgba(0, 0, 0, 0.4),
            inset 0px 4.96px 12.4px 2.48px rgba(255, 255, 255, 0.03);
        }

        /* Hover: expand a little and slide into place */
        .tab-button:hover::after {
          width: 100%;
          transform: translateX(0);
        }

        /* Active: keep fully expanded and make label white */
        .tab-button.active::after {
          width: 100%;
          transform: translateX(0);
          box-shadow: 13.49px 16.62px 30.21px 8.69px rgba(0, 0, 0, 0.4),
            inset 0px 4.96px 12.4px 2.48px rgba(255, 255, 255, 0.03);
        }

        /* Active stronger visual (slightly brighter) */
        .tab-button.active {
          color: #ffffff !important;
          box-shadow: 8px 10px 20px rgba(0, 0, 0, 0.28);
        }

        /* Focus visible for keyboard users */
        .tab-button:focus-visible::after {
          width: 100%;
          transform: translateX(0);
          outline: none;
          box-shadow: 0 0 0 3px rgba(90, 142, 255, 0.12);
        }

        /* Prevent janky transitions on reduced-motion systems */
        @media (prefers-reduced-motion: reduce) {
          .tab-button::after,
          .tab-button:hover::after,
          .tab-button.active::after {
            transition: none;
            transform: none;
          }
          .animate-slideIn {
            animation: none;
          }
        }

        /* Scrollbar styles */
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #4a4e54;
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #888989 0%, #4a4e54 100%);
          border-radius: 10px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9a9a9a 0%, #5a5e64 100%);
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AboutMe;
