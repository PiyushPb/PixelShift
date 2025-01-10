import React, { useState, useEffect } from "react";
import MetaTags from "./MetaTags";
import TwitterTags from "./TwitterTags";
import LinkTags from "./LinkTags";
import DownloadReport from "./DownloadReport"; // Import the new DownloadReport component

function SiteInfo() {
  const [siteTags, setSiteTags] = useState({
    metaTags: [],
    twitterTags: [],
    linkTags: [],
    openGraphTags: [],
    title: "",
    description: "",
    icon: "",
  });

  useEffect(() => {
    console.log("siteTags:", siteTags);
  }, [siteTags]);

  useEffect(() => {
    // Create an invisible iframe
    const iframe = document.createElement("iframe");
    iframe.src = window.location.href;
    iframe.style.display = "none"; // Make the iframe invisible
    iframe.onload = () => {
      // Access the iframe's document
      const iframeDocument =
        iframe.contentDocument || iframe.contentWindow.document;

      // Extracting all meta tags
      const metaTags = Array.from(
        iframeDocument.getElementsByTagName("meta")
      ).map((meta) => ({
        name: meta.getAttribute("name") || null,
        property: meta.getAttribute("property") || null,
        content: meta.getAttribute("content") || null,
        charset: meta.getAttribute("charset") || null, // Capture charset explicitly
      }));

      // Extracting Twitter-specific tags
      const twitterTags = metaTags.filter(
        (meta) =>
          meta.property?.startsWith("twitter:") ||
          meta.name?.startsWith("twitter:")
      );

      // Extracting Open Graph tags
      const openGraphTags = metaTags.filter((meta) =>
        meta.property?.startsWith("og:")
      );

      // Extracting link tags
      const linkTags = Array.from(
        iframeDocument.getElementsByTagName("link")
      ).map((link) => ({
        rel: link.getAttribute("rel") || null,
        href: link.getAttribute("href") || null,
        type: link.getAttribute("type") || null,
      }));

      // Get title and description
      const title = iframeDocument.title;
      const descriptionMetaTag = metaTags.find(
        (tag) => tag.name === "description"
      );
      const description = descriptionMetaTag ? descriptionMetaTag.content : "";

      // Get the icon from the link tags (first one with rel="icon")
      const iconLinkTag = linkTags.find((tag) => tag.rel === "icon");
      let icon = iconLinkTag ? iconLinkTag.href : "";

      // If the icon is a relative URL, prepend the domain
      if (icon && !icon.startsWith("http")) {
        // Check if the icon URL is relative, then prepend the domain (window.location.origin)
        icon = new URL(icon, window.location.origin).href;
      }

      // Update the state
      setSiteTags({
        metaTags,
        twitterTags,
        linkTags,
        openGraphTags,
        title,
        description,
        icon,
      });
    };

    // Append the iframe to the body
    document.body.appendChild(iframe);

    // Cleanup function to remove iframe
    return () => {
      document.body.removeChild(iframe);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="devConsole-heading">Site Information</h2>
        <DownloadReport siteTags={siteTags} />
      </div>
      <div className="flex flex-row mt-5 gap-5">
        <div className="w-[60px] h-[60px] flex-shrink-0">
          {/* Use the dynamically fetched icon */}
          {siteTags.icon ? (
            <img src={siteTags.icon} alt="Website Icon" />
          ) : (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              alt="Default Logo"
            />
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-5">
          <div>
            {/* Title */}
            <h3 className="text-[15px] font-bold text-primary-text dark:text-primary-dark flex justify-start items-center gap-2">
              {siteTags.title || "No title available"}
              <span className="text-[12px] text-white w-fit p-1 px-2 flex justify-center items-center bg-accent rounded-md font-normal">
                {siteTags.title ? siteTags.title.length : 0} / 60
              </span>
            </h3>
            {/* Description */}
            <span className="text-[14px] text-gray-500 mt-2">
              {siteTags.description || "No description available."}
              <span className="text-[12px] text-white w-fit p-1 px-2 flex justify-center items-center bg-accent rounded-md">
                {siteTags.description ? siteTags.description.length : 0} / 160
              </span>
            </span>
          </div>

          <div className="flex flex-col gap-10">
            <MetaTags metaTags={siteTags.metaTags} />
            <TwitterTags twitterTags={siteTags.twitterTags} />
            <LinkTags linkTags={siteTags.linkTags} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SiteInfo;
