'use strict';
const pcap = require('pcap');
const tcp_tracker = new pcap.TCPTracker();
const doc = require("./doc");
const http = require("./trackHTTP");
const https = require("./trackHTTPS");
const dns = require("./trackDNS");

let pcap_session = pcap.createSession("en0", "ip");
// http.track(tcp_tracker);
// https.track(tcp_tracker);

pcap_session.on('packet', function(raw_packet) {
    var packet;
    try {
        packet = pcap.decode(raw_packet);
    } catch (error) {
        console.log(error);
        return;
    }
    var layer3 = packet.payload.payload.payload;
    switch (layer3.constructor.name) {
        case "TCP":
            tcp_tracker.track_packet(packet);
            break;
        case "UDP":
            dns.track(packet);
            break;
        case "IGMP":
            break;
        case "ICMP":
            break;
        default:
            doc.doc(layer3);
            process.exit();
            break;
    }
});