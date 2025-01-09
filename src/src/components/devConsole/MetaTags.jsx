import React, { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { FiChevronDown, FiChevronRight, FiInfo } from "react-icons/fi";

const metaTagDescriptions = {
  viewport:
    "This tag tells the browser how to display the website on different devices, especially mobile phones and tablets. It helps adjust the layout so it looks good on smaller screens.",
  charset:
    "This tag defines the character set used by the webpage, ensuring that special characters (like é, ü, or non-English characters) are displayed correctly in the browser.",
  description:
    "This provides a short, clear summary of what the webpage is about. It often appears in search engine results to give users an idea of what they can expect from the page.",
  keywords:
    "This is a list of important words related to the page's content. Search engines use this to understand the page and show it in relevant search results.",
  robots:
    "This tag gives instructions to search engines on how to crawl (read) and index (store) the page. It can control whether search engines should follow the links on the page or show the page in search results.",
  author:
    "This tag tells who created the webpage. It's typically used to display the author's name or organization responsible for the content.",
  "application-name":
    "This defines the name of the web application. It's mainly used for apps or websites that function like apps when added to a device's home screen.",
  "theme-color":
    "This tag allows you to set a color for the browser's address bar, especially on mobile devices. It helps create a consistent and branded look for the site.",
  "og:title":
    "This tag defines the title of the page when shared on social media (like Facebook). It's like the webpage title but customized for social sharing.",
  "og:description":
    "This provides a brief description of the webpage when shared on social media. It's similar to the regular description but optimized for social platforms.",
  "og:image":
    "This tag defines the image that represents your webpage when shared on social media. It's usually an image that helps attract more clicks or engagement.",
  "og:url":
    "This is the main, official URL of the webpage. It's used in social sharing to point to the correct location of the content.",
};

function MetaTags({ metaTags }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const validMetaTags = [
    "viewport",
    "charset",
    "description",
    "keywords",
    "robots",
    "author",
    "application-name",
    "theme-color",
    "og:title",
    "og:description",
    "og:image",
    "og:url",
  ];

  // Map metaTags into a dictionary for quick lookup
  const metaTagMap = metaTags.reduce((acc, tag) => {
    if (tag.name) {
      acc[tag.name] = tag.content || null;
    } else if (tag.property) {
      acc[tag.property] = tag.content || null;
    }
    if (tag.charset) {
      acc["charset"] = tag.charset; // Capture charset explicitly
    }
    return acc;
  }, {});

  // Create a complete list of tags, marking missing ones
  const allTags = validMetaTags.map((tag) => ({
    name: tag,
    content: metaTagMap[tag] || null,
  }));

  return (
    <div className="space-y-6">
      {/* Accordion Header */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <FiChevronDown className="w-5 h-5 text-primary-text dark:text-primary-dark mr-2" />
        ) : (
          <FiChevronRight className="w-5 h-5 text-primary-text dark:text-primary-dark mr-2" />
        )}
        <h3 className="text-[16px] font-bold text-primary-text dark:text-primary-dark">
          Meta Tags
        </h3>
      </div>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="space-y-4 pl-6">
          {allTags.map((tag, index) => {
            const isMissing = !tag.content;

            return (
              <div key={index} className="flex flex-col items-start gap-2">
                {/* Tag Name */}
                <div className="flex items-center gap-1">
                  <h4 className="text-[14px] font-semibold text-primary-text dark:text-primary-dark">
                    {tag.name}
                  </h4>
                  {/* Information Icon with Tooltip */}
                  <Tooltip
                    content={
                      metaTagDescriptions[tag.name] ||
                      "No description available"
                    }
                    className="max-w-[300px]"
                    placement="right"
                  >
                    <span className="cursor-pointer text-gray-600 dark:text-gray-400">
                      <FiInfo />
                    </span>
                  </Tooltip>
                </div>

                {/* Tag Content */}
                <span
                  className={`text-[14px] ${
                    isMissing
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {isMissing ? "Missing Value" : tag.content}
                </span>
              </div>
            );
          })}

          {allTags.length === 0 && (
            <div className="text-[14px] text-gray-500 dark:text-gray-400">
              No valid meta tags found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MetaTags;
