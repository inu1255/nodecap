/**
 * @typedef {Object} Type1
 */
/**
 * @typedef {Object} Type2
 */
/**
 * @typedef {Object} Type3
 */
/**
 * @typedef {Object} Type4
 */
/**
 * @typedef {Object} Type5
 */
/**
 * @typedef {Object} Type6
 */
/**
 * @typedef {Object} Type7
 * @property {Function} data send
 * @property {Function} data recv
 */
/**
 * @typedef {Object} TCPSession
 * @property {String} src
 * @property {String} src_name
 * @property {String} dst
 * @property {String} dst_name
 * @property {String} state
 * @property {Number} current_cap_time
 * @property {Number} syn_time
 * @property {Boolean} missed_syn
 * @property {Number} connect_time
 * @property {Number} send_isn
 * @property {Number} send_window_scale
 * @property {Type1} send_packets
 * @property {Type2} send_acks
 * @property {Type3} send_retrans
 * @property {Number} send_next_seq
 * @property {} send_acked_seq
 * @property {Number} send_bytes_ip
 * @property {Number} send_bytes_tcp
 * @property {Number} send_bytes_payload
 * @property {} recv_isn
 * @property {} recv_window_scale
 * @property {Type4} recv_packets
 * @property {Type5} recv_acks
 * @property {Type6} recv_retrans
 * @property {} recv_next_seq
 * @property {} recv_acked_seq
 * @property {Number} recv_bytes_ip
 * @property {Number} recv_bytes_tcp
 * @property {Number} recv_bytes_payload
 * @property {} domain
 * @property {Type7} _events
 * @property {Number} _eventsCount
 * @property {} _maxListeners
 * @property {Function} track
 * @property {Function} SYN_SENT
 * @property {Function} SYN_RCVD
 * @property {Function} ESTAB
 * @property {Function} FIN_WAIT
 * @property {Function} CLOSE_WAIT
 * @property {Function} LAST_ACK
 * @property {Function} CLOSING
 * @property {Function} CLOSED
 * @property {Function} session_stats
 * @property {Function} setMaxListeners
 * @property {Function} getMaxListeners
 * @property {Function} emit
 * @property {Function} addListener
 * @property {Function} on
 * @property {Function} prependListener
 * @property {Function} once
 * @property {Function} prependOnceListener
 * @property {Function} removeListener
 * @property {Function} removeAllListeners
 * @property {Function} listeners
 * @property {Function} listenerCount
 * @property {Function} eventNames
 */

exports.track = function(tcp_tracker) {
    tcp_tracker.on('session', function( /** @type {TCPSession} */ tcp_session) {
        if (tcp_session.src.endsWith(":443") || tcp_session.dst.endsWith(":443")) {
            tcp_session.on("data send", function(tcp_session, chunk) {});
        }
    });
};