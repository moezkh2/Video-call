import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://call--me.herokuapp.com/');

const ContextProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');
    const [camState, setCamState] = useState(true)
    const [micState, setMicState] = useState(true)



    const myVideo = useRef(null);
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {

        const getUserMedia = async () => {
            try {

                const Stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(Stream);


                myVideo.current.srcObject = Stream
            } catch (error) {

                console.log(error)
            }
        }
        getUserMedia();

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);



    const stopVideo = () => {

        stream.getVideoTracks()[0].enabled = !camState;
        setStream(stream);
        setCamState(!camState);


    }
    const mutMic = () => {

        stream.getAudioTracks()[0].enabled = !micState;
        setStream(stream);
        setMicState(!micState);

    }


    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('answerCall', { signal: data, to: call.from });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload()
    };

    return (
        <SocketContext.Provider value={{
            camState,
            micState,
            stopVideo,
            mutMic,
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };