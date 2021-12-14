import React, { useRef, useState, useEffect } from 'react'
import './videoContainer.css'
const VideoContainer = ({ children }) => {
    const containerRef = useRef();
    const [dimention, setDimention] = useState({})

    useEffect(() => {
        Dish();
    }, [children]);

    useEffect(() => {
        window.addEventListener("load", function (event) {
            Dish();
            window.onresize = Dish;
        }, false);
    }, [])

    function Area(Increment, Count, Width, Height, Margin = 10) {
        let i = 0, w = 0;
        let h = Increment * 0.75 + (Margin * 2);
        while (i < (Count)) {
            if ((w + Increment) > Width) {
                w = 0;
                h = h + (Increment * 0.75) + (Margin * 2);
            }
            w = w + Increment + (Margin * 2);
            i++;
        }
        if (h > Height || Increment > Width) return false;
        else return Increment;
    }

    // Set Width and Margin 
    function Dish() {
        // variables:
        let Margin = 2;
        let Width = containerRef.current?.offsetWidth - (Margin * 2);
        let Height = containerRef.current?.offsetHeight - (Margin * 2);
        let max = 0;
        // loop (i recommend you optimize this)
        let i = 1;
        while (i < 5000) {
            let w = Area(i, children.length, Width, Height, Margin);
            if (w === false) {
                max = i - 1;
                break;
            }
            i++;
        }
        // set styles
        max = max - (Margin * 2);
        setDimention({ chWidth: max + "px", chMargin: Margin + "px", chHeight: (max * 0.75) + "px" })
    }

    return (
        <div ref={containerRef} id='video-container'>
            {React.Children.map(children, child => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, { dimention });
                }
            })}
        </div>
    )
}

export default VideoContainer
