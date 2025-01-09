import React, { useState } from "react";
import { Tooltip } from "@material-tailwind/react";
import { FiChevronDown, FiChevronRight, FiInfo } from "react-icons/fi";

const twitterTagDescriptions = {
  "twitter:card":
    "Defines the type of Twitter card (e.g., summary, summary_large_image).",
  "twitter:site": "The Twitter handle of the site being shared.",
  "twitter:creator": "The Twitter handle of the content creator.",
  "twitter:title": "The title of the content, displayed in the Twitter card.",
  "twitter:description":
    "A concise description of the content for the Twitter card.",
  "twitter:image": "The URL of an image to display in the Twitter card.",
};

function TwitterTags({ twitterTags }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const validTwitterTags = [
    "twitter:card",
    "twitter:site",
    "twitter:creator",
    "twitter:title",
    "twitter:description",
    "twitter:image",
  ];

  // Map twitterTags into a dictionary for quick lookup
  const twitterTagMap = twitterTags.reduce((acc, tag) => {
    acc[tag.name || tag.property] = tag.content || null;
    return acc;
  }, {});

  // Create a complete list of tags, marking missing ones
  const allTags = validTwitterTags.map((tag) => ({
    name: tag,
    content: twitterTagMap[tag] || null,
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
          Twitter Tags
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
                      twitterTagDescriptions[tag.name] ||
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
              No valid Twitter tags found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TwitterTags;
