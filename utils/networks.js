const os = require("os");

function getIPv4Address() {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    for (const net of interfaces[interfaceName]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address; // Returns the first external IPv4 address
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost if no external IP is found
}

module.exports={getIPv4Address}
