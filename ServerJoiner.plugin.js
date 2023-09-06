//META{"name":"ServerJoiner","version":"1.9.3","description":"Join up to 200 Servers without Nitro.","author":"BMF","website":"https://github.com/mattswagyt","source":"https://github.com/mattswagyt/Server-Joiner"}*//

console.log("ServerJoiner plugin started.");

class ServerJoiner {
  constructor() {
    this.joinQueue = [];
    this.isJoining = false;
  }

  start() {
    BdApi.injectCSS("server-joiner-css", `
      /* Add custom CSS here to style the join button */
    `);

    // Listen for the context menu event on server icons
    document.addEventListener("contextmenu", this.handleContextMenu);
    
    BdApi.showToast("ServerJoiner plugin is active.", {
      type: "success",
      namespace: "server-joiner-plugin"
    });
  }

  stop() {
    BdApi.clearCSS("server-joiner-css");
    document.removeEventListener("contextmenu", this.handleContextMenu);
    
    BdApi.showToast("ServerJoiner plugin is now inactive.", {
      type: "error",
      namespace: "server-joiner-plugin"
    });
  }

  handleContextMenu = async (event) => {
    const target = event.target;

    // Check if the right-clicked element is a server icon
    if (target && target.classList.contains("guildIcon-3C0wbB")) {
      event.preventDefault();

      // Check if the user hasn't reached the join limit
      if (this.joinQueue.length < 200) {
        this.joinQueue.push(target);
        this.processJoinQueue();
      } else {
        // If attempting to join more than 200 servers, show an error message
        BdApi.showToast("You have reached the maximum join limit (200 servers).", {
          type: "error",
          namespace: "server-joiner-plugin"
        });
      }
    }
  };

  processJoinQueue() {
    if (this.isJoining || this.joinQueue.length === 0) {
      return;
    }

    const target = this.joinQueue.shift();
    if (!target) {
      return;
    }

    this.isJoining = true;

    // Simulate clicking the "Join Server" button
    const joinButton = target.querySelector(".join-23GAYs");
    if (joinButton) {
      joinButton.click();

      // Wait for a brief moment to check for Nitro prompt
      setTimeout(() => {
        const nitroPrompt = document.querySelector(".joinNitroPrompt-3LaGhr");
        if (nitroPrompt) {
          nitroPrompt.remove();
          BdApi.showToast("Nitro prompt removed.", {
            type: "success",
            namespace: "server-joiner-plugin"
          });
        }

        // Increment the join count
        this.isJoining = false;
        this.processJoinQueue();
      }, 1000); // Adjust the delay as needed
    }
  }
}

module.exports = ServerJoiner;