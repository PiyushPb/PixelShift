import React, { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { FiChevronDown, FiChevronRight, FiInfo } from "react-icons/fi";

const linkTagDescriptions = {
  favicon:
    "The icon that appears in the browser tab or bookmark for the website.",
  "apple-touch-icon":
    "The icon displayed when users add the website to their home screen on Apple devices.",
  canonical:
    "Specifies the preferred URL for a webpage, preventing duplicate content issues.",
  preconnect:
    "Allows the browser to establish early connections to external resources.",
  prefetch:
    "Tells the browser to fetch resources in advance, improving performance.",
  preload:
    "Specifies resources that should be loaded earlier to improve page speed.",
  "alternate-language":
    "Indicates the URL for an alternate language version of the page.",
  "rss-feed":
    "The URL for the RSS feed of the website, which provides content updates.",
  "shortcut-icon":
    "An icon that appears when the user saves the page as a shortcut on their device.",
};

function LinkTags({ linkTags }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Create a helper function to check if the value is empty
  const isValueMissing = (value) => !value || value === "null";

  const validLinkTags = [
    { name: "favicon", key: "icon" },
    { name: "apple-touch-icon", key: "apple-touch-icon" },
    { name: "canonical", key: "canonical" },
    { name: "preconnect", key: "preconnect" },
    { name: "prefetch", key: "prefetch" },
    { name: "preload", key: "preload" },
    { name: "alternate-language", key: "alternate-language" },
    { name: "rss-feed", key: "rss-feed" },
    { name: "shortcut-icon", key: "shortcut-icon" },
  ];

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
          Link Tags
        </h3>
      </div>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="space-y-4 pl-6">
          {validLinkTags.map((tag) => {
            const tagContent = linkTags.find(
              (linkTag) => linkTag.rel === tag.key
            );
            const isMissing = isValueMissing(tagContent?.href);

            return (
              <div key={tag.name} className="flex flex-col items-start gap-2">
                {/* Tag Name */}
                <div className="flex items-center gap-1">
                  <h4
                    className={`text-[14px] font-semibold ${
                      isMissing
                        ? "text-red-600 dark:text-red-400"
                        : "text-primary-text dark:text-primary-dark"
                    }`}
                  >
                    {tag.name}
                  </h4>
                  {/* Information Icon with Tooltip */}
                  <Tooltip
                    content={
                      linkTagDescriptions[tag.name] ||
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
                  {isMissing ? "Not Provided" : tagContent?.href || "No URL"}
                </span>
              </div>
            );
          })}

          {validLinkTags.length === 0 && (
            <div className="text-[14px] text-gray-500 dark:text-gray-400">
              No valid link tags found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LinkTags;
