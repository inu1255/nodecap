const IP = require("pcap/decode/ipv4");
const UDP = require("pcap/decode/udp");

exports.track = function(packet) {
    /** @type {IP} */
    let ip = packet.payload.payload;
    /** @type {UDP} */
    let udp = packet.payload.payload.payload;
    if (udp.dport == 53) {
        console.log(ip.saddr.toString(), ip.daddr.toString());
        console.log(udp.dport);
        console.log(udp.data.toString());
    }
};