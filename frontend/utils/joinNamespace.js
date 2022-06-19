const joinNamespace = (endpoint) => {
  if (nsSocket) {
    nsSocket.close();
  }
  const socket = io("http://localhost:9000" + endpoint);
  setNsSocket(socket);
};
