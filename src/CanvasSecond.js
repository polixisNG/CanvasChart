import React, {useEffect, useRef} from 'react';
import Logo from "./images/node_avatar.png";

const CanvasSecond = (props) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context, canvas);
    }, [draw]);

    const results = props.results;
    results.length = props.resultval;
    const currentLength = results.length;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(ctx, cnv) {

        let total = results.reduce((sum, {count}) => sum + count, 0);
        let currentAngle = -0.5 * Math.PI;
        let centerX = cnv.width / 2;
        let centerY = cnv.height / 2;

        for (let result of results) {

            let currentText = result.keyName;
// ------- pie border ---------
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = "3";
            ctx.stroke();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = "2";
// ------ create pie -------
            ctx.beginPath();
            ctx.save();
            let sliceAngle = (result.count / total) * 2 * Math.PI;
            ctx.arc(centerX, centerY, 120, currentAngle, currentAngle + sliceAngle);
            currentAngle += sliceAngle;
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = result.color;
            ctx.fill();
// ------- text position//
            let middleAngle = currentAngle + (-0.5 * sliceAngle);
            let textX = Math.cos(middleAngle) * 93 + centerX;
            let textY = Math.sin(middleAngle) * 93 + centerY;
// ------- pie border ---------
            ctx.stroke();
// ------ text style + size--------
            ctx.font = `900 ${17 - (currentLength)}pt Calibri`;
            ctx.fillStyle = "white";
            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            ctx.translate(textX, textY);
// ------ text rotate --------
            if (currentLength === 1) {
                ctx.rotate(currentAngle + Math.PI / 2)
            } else if (currentLength === 2) {
                ctx.rotate(currentAngle);
            } else {
                ctx.rotate(currentAngle + (currentLength * 18 / 100));
            }
// ------ text info print
            ctx.fillText(currentText, 0, 0);
            ctx.restore();
        }
// ------- center image ---------
        let thumbImg = new Image();
        thumbImg.src = Logo;
        let pattern = ctx.createPattern(thumbImg, 'no-repeat');
        thumbImg.onload = function () {
            ctx.beginPath()
            ctx.fillStyle = pattern;
            ctx.arc(cnv.width / 2, cnv.height / 2, 75, 0, Math.PI * 2);  // text size
            ctx.fill();
            ctx.save();
            ctx.clip();
// ------- center image inside size + position---------
            ctx.drawImage(thumbImg, 35, 35, 180, 180);
            ctx.closePath();
            ctx.restore();
// ------- create canvas ---------
            if (currentLength > 0) {
                let image = new Image();
                cnv.crossOrigin = "Anonymous";
                image.src = cnv.toDataURL("image/png");
                document.body.appendChild(image);
                console.log(image);
            }
        }
    }

    return (
        <canvas ref={canvasRef} width={'250px'} height={'250px'}/>
    )
}

export default CanvasSecond