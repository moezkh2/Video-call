import { useContext } from 'react'
import Swal from 'sweetalert2/src/sweetalert2.js';
import { SocketContext } from '../SocketContext';
export const Notifications = () => {
    const { callAccepted, call, answerCall } = useContext(SocketContext);

    if (call.isReceivingCall && !callAccepted) {
        Swal.fire({
            title: `${call.name} is calling`,
            showDenyButton: true,
            confirmButtonText: 'answer',
            denyButtonText: `close`,

        }).then((result) => {

            if (result.isConfirmed) {
                answerCall()
            }/*  else if (result.isDenied) {

            } */
        })
    }

}
