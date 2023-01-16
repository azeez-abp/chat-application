
async function removePeerFrom(channel) {
    if (!(channel in socket.channels)) {
    //  console.log("[" + socket.id + "] [Warning] not in ", channel);
      return;
    }

    delete socket.channels[channel];
    delete channels[channel][socket.id];
    delete peers[channel][socket.id];

    // if not channel aka room in peers remove it
    if (Object.keys(peers[channel]).length === 0) {
      delete peers[channel];
    }

    for (var id in channels[channel]) {
      await channels[channel][id].emit("removePeer", { peer_id: socket.id });
      await socket.emit("removePeer", { peer_id: id });
     //console.log("[" + socket.id + "] emit remove Peer [" + id + "]");
    }
  }




module.exports  = {removePeerFrom}