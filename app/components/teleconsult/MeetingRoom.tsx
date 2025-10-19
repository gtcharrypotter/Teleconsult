import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  FlatList,
} from 'react-native';
import {
  mediaDevices,
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  RTCView,
} from 'react-native-webrtc';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { useLocalSearchParams, useRouter } from 'expo-router';

const SIGNALING_SERVER = 'ws://192.168.0.126:3000';
const TURN_SERVER = {
  urls: 'turn:192.168.0.126:3478',
  username: 'gtc',
  credential: 'gtc@ihp888',
};
const pcConfig = { iceServers: [TURN_SERVER] };

const MeetingRoom = () => {
  const { user } = useAuth({ middleware: 'auth' });
  const { roomId } = useLocalSearchParams();
  const router = useRouter();

  const ws = useRef(null);
  const peerConnections = useRef({});
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [callTime, setCallTime] = useState(0);

  useEffect(() => {
    const setup = async () => {
      await getPermissions();
      await startLocalStream();
      connectWebSocket();
      const timer = setInterval(() => setCallTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    };
    setup();

    return () => {
      ws.current?.close();
      Object.values(peerConnections.current).forEach((pc) => pc.close());
    };
  }, []);

  useEffect(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => (track.enabled = isCameraOn));
      localStream.getAudioTracks().forEach((track) => (track.enabled = !isMuted));
    }
  }, [isMuted, isCameraOn]);
  useEffect(() => {
    console.log('🧩 Remote streams updated:', remoteStreams.map(s => s.id));
  }, [remoteStreams]);

  const getPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
        granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
      ) {
        alert('Camera and mic permissions are required.');
        return;
      }
    }
  };

  const startLocalStream = async () => {
    const stream = await mediaDevices.getUserMedia({ video: true, audio: true });
    console.log('🎥 Local stream acquired', stream.toURL());
    setLocalStream(stream);
  };

  const connectWebSocket = () => {
    ws.current = new WebSocket(SIGNALING_SERVER);

    ws.current.onopen = () => {
      console.log('🔌 WebSocket connected');
      ws.current.send(JSON.stringify({ type: 'join-room', roomId, from: user.id }));
    };

    ws.current.onmessage = async ({ data }) => {
      const message = JSON.parse(data);
      console.log('📨 Received message:', message.type, message);

      switch (message.type) {
        case 'all-users':
          for (const peerId of message.users) {
            if (peerId !== user.id) {
              console.log('👥 Creating PC for peer:', peerId);
              await createPeerConnection(peerId, true);
            }
          }
          break;

        case 'offer':
          await createPeerConnection(message.from, false);
          await peerConnections.current[message.from].setRemoteDescription(
            new RTCSessionDescription(message.sdp)
          );
          const answer = await peerConnections.current[message.from].createAnswer();
          await peerConnections.current[message.from].setLocalDescription(answer);
          ws.current.send(
            JSON.stringify({
              type: 'answer',
              roomId,
              to: message.from,
              from: user.id,
              sdp: answer,
            })
          );
          break;

        case 'answer':
          await peerConnections.current[message.from]?.setRemoteDescription(
            new RTCSessionDescription(message.sdp)
          );
          break;

        case 'candidate':
          await peerConnections.current[message.from]?.addIceCandidate(
            new RTCIceCandidate(message.candidate)
          );
          break;
      }
    };
  };

  const createPeerConnection = async (peerId, isInitiator) => {
  if (peerConnections.current[peerId]) return;

  const pc = new RTCPeerConnection(pcConfig);
  peerConnections.current[peerId] = pc;

  // 👇 Always add local tracks
  if (localStream) {
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });
  }

  // 👂 Handle remote tracks
 pc.ontrack = (event) => {
  console.log('📡 ontrack triggered with track:', event.track.kind);

  let remoteStream = peerConnections.current[peerId].remoteStream;

  if (!remoteStream) {
    remoteStream = new MediaStream();
    peerConnections.current[peerId].remoteStream = remoteStream;
  }

  remoteStream.addTrack(event.track);

  setRemoteStreams((prev) => {
    const exists = prev.find((s) => s.id === remoteStream.id);
    if (!exists) {
      console.log('✅ New remote stream added:', remoteStream.id);
      return [...prev, remoteStream];
    }
    return prev;
  });
};

  pc.onicecandidate = (event) => {
    if (event.candidate) {
      ws.current.send(
        JSON.stringify({
          type: 'candidate',
          roomId,
          to: peerId,
          from: user.id,
          candidate: event.candidate,
        })
      );
    }
  };

  if (isInitiator) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    ws.current.send(
      JSON.stringify({
        type: 'offer',
        roomId,
        to: peerId,
        from: user.id,
        sdp: offer,
      })
    );
  }
};


  const leaveRoom = () => {
    ws.current?.close();
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    setRemoteStreams([]);
    router.back();
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };
  useEffect(() => {
  if (localStream) {
    console.log('🔍 Video tracks:', localStream.getVideoTracks());
    console.log('🔍 Audio tracks:', localStream.getAudioTracks());
  }
}, [localStream]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Text className="text-white text-xl text-center py-3 font-bold">Meeting Room: {roomId}</Text>
      <View className="items-center mb-2">
        <View className="bg-red-600 px-4 py-2 rounded-full">
          <Text className="text-white font-bold">{formatTime(callTime)}</Text>
        </View>
      </View>

      <FlatList
        data={[
          { id: 'local', stream: localStream, label: 'You' },
          ...remoteStreams.map((s, i) => ({
            id: `remote-${i}`,
            stream: s,
            label: `Guest ${i + 1}`,
          })),
        ]}
        // keyExtractor={(item) => item.id}
       keyExtractor={(item) => item.id + '-' + item.stream?.id || ''}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 10 }}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => {
          const hasVideo = item.stream?.getVideoTracks()[0]?.enabled;
          
          return (
            <View className="w-[48%] aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden items-center justify-center relative">
              {hasVideo ? (
                <RTCView
                  key={item.stream?.id}
                  streamURL={item.stream?.toURL()}
                  objectFit="cover"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    zIndex: 1,
                  }}
                  mirror={item.label === 'You'}
                />
              ) : (
                <View className="items-center justify-center">
                  <Ionicons name="person-circle" size={64} color="white" />
                  <Text className="text-white mt-2 text-lg font-semibold">{item.label}</Text>
                  <Text className="text-gray-400">Camera Off</Text>
                </View>
              )}
              <View className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 rounded">
                <Text className="text-white text-xs">{item.label}</Text>
              </View>
            </View>
          );
        }}
      />

      <View className="flex-row justify-around items-center py-4 border-t border-gray-700 bg-gray-900">
        <TouchableOpacity onPress={() => setIsMuted(!isMuted)} className="p-4 bg-gray-700 rounded-full">
          <Ionicons name={isMuted ? 'mic-off' : 'mic'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsCameraOn(!isCameraOn)} className="p-4 bg-gray-700 rounded-full">
          <Ionicons name={isCameraOn ? 'videocam' : 'videocam-off'} size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={leaveRoom} className="p-4 bg-red-600 rounded-full">
          <Ionicons name="call" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MeetingRoom;