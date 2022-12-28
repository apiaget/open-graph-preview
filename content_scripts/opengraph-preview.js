(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;
  
    browser.runtime.onMessage.addListener((message) => {
      if(message.command === "getog") {
        var document_og_title_el = document.querySelector("meta[property='og:title']");
        var document_og_title = "";
        if(document_og_title_el) {
          document_og_title = document_og_title_el.getAttribute('content');
        }

        var document_og_image_el = document.querySelector("meta[property='og:image']");
        var document_og_image = "";
        if(document_og_image_el) {
          document_og_image = document_og_image_el.getAttribute('content');
        }

        var document_og_description_el = document.querySelector("meta[property='og:description']");
        var document_og_description = "";
        if(document_og_description_el) {
          document_og_description = document_og_description_el.getAttribute('content');
        }

        var document_og_url_el = document.querySelector("meta[property='og:url']");
        var document_og_url = "";
        if(document_og_url_el) {
          document_og_url = document_og_url_el.getAttribute('content');
        }

        var document_og_type_el = document.querySelector("meta[property='og:type']");
        var document_og_type = "";
        if(document_og_type_el) {
          document_og_type = document_og_type_el.getAttribute('content');
        }

        var sending = browser.runtime.sendMessage({
          og_title: document_og_title,
          og_image: document_og_image,
          og_description: document_og_description,
          og_url: document_og_url,
          og_type: document_og_type,
        });
      }
    });
})();