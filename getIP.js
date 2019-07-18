function findIP(callback) { 
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({iceServers: []}), 
        noop = function() {},
        localIPs = {}, 
        ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
        key;
   
    function ipIterate(ip) {
        if (!localIPs[ip]) callback(ip);
        localIPs[ip] = true;
    }
    pc.createDataChannel(""); 
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
            if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(ipIterate);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }); 
    pc.onicecandidate = function(ice) { 
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
        ice.candidate.candidate.match(ipRegex).forEach(ipIterate);
    };
}
   
findIP(function(ip){
    console.log('IP: ', ip);
});

// API: http://pv.sohu.com/cityjson?ie=utf-8
// 使用搜狐接口获取ip