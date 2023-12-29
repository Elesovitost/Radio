      function changePage(url) {
        document.getElementById("myIframe").src = url;
      }
      
      window.onload = function() {
        document.getElementById("myIframe").src = "FDGPET.html";
        appendTextFromFDGPET();
      };