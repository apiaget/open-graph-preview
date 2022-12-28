function handleMessage(request, sender, sendResponse) {
  if(request.og_image !== "") {
    document.getElementById("og_image").src = request.og_image;
  }
  if(request.og_title !== "") {
    document.getElementById("og_title").textContent = request.og_title;
  } else {
    document.getElementById("og_title").textContent = "Could not retrieve the og:title tag";
  }

  if(request.og_description !== "") {
    document.getElementById("og_description").textContent = request.og_description;
  } else {
    document.getElementById("og_description").textContent = "Could not retrieve the og:description tag";
  }

  document.getElementById("og_url").textContent = request.og_url;
  document.getElementById("og_type").textContent = request.og_type;
}

browser.runtime.onMessage.addListener(handleMessage);

function reportExecuteScriptError(error) {
  console.error(`Failed to retrieve the Open Graph information : ${error.message}`);
}

/**
* When the popup loads, inject a content script into the active tab,
* and add retrieve the OG tags.
* If we couldn't inject the script, handle the error.
*/
browser.tabs.executeScript({file: "/content_scripts/opengraph-preview.js"})
  .then(() => {
    browser.tabs.query({active: true, currentWindow: true})
      .then(getog)
      .catch(reportError);
  });


function getog(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: "getog"
  })
  .catch(reportExecuteScriptError);
}

function reportError(error) {
  console.error(`Could not retrieve og tags: ${error}`);
}