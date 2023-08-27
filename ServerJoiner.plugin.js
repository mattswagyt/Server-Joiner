//META{"name":"ServerJoiner","version":"1.9.3","description":"Join up to 200 servers.","author":"BMF","website":"https://github.com/yourusername","source":"https://github.com/yourusername/ServerJoiner.plugin.js"}*//

console.log("ServerJoiner plugin started.");

class ServerJoiner {
  constructor() {
    this.joinCount = 0;
  }

  start() {
    BdApi.injectCSS("server-joiner-css", `
      /* Add custom CSS here to style the join button */
    `);

    // Listen for the context menu event on server icons
    document.addEventListener("contextmenu", this.handleContextMenu);
  }

  stop() {
    BdApi.clearCSS("server-joiner-css");
    document.removeEventListener("contextmenu", this.handleContextMenu);
  }

  handleContextMenu = (event) => {
    const target = event.target;

    // Check if the right-clicked element is a server icon
    if (target && target.classList.contains("guildIcon-3C0wbB")) {
      event.preventDefault();

      // Check if the user hasn't reached the join limit
      if (this.joinCount < 200) {
        this.joinServer(target);
      } else {
        // If attempting to join more than 100 servers, prevent the Nitro prompt
        const joinButton = target.querySelector(".join-23GAYs");
        if (joinButton) {
          joinButton.click();
        }

        BdApi.showToast("You have reached the maximum join limit.", {
          type: "error",
          namespace: "server-joiner-plugin"
        });
      }
    }
  };

  joinServer(target) {
    // Simulate clicking the "Join Server" button
    const joinButton = target.querySelector(".join-23GAYs");
    if (joinButton) {
      joinButton.click();

      // Increment the join count
      this.joinCount++;

      BdApi.showToast(`Joined server ${this.joinCount} of 200.`, {
        type: "success",
        namespace: "server-joiner-plugin"
      });
    }
  }
}

module.exports = ServerJoiner;
